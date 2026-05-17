# Booked Auth Plan

Booked should feel like a premium marketplace while keeping trust and safety real. Authentication starts with email/password and is structured so Google, WhatsApp, phone verification, and host/admin workflows can be added without rewriting the app.

## Auth Methods

### MVP: email/password

- Use Supabase Auth email/password.
- After signup, create a `profiles` row with:
  - `id = auth.users.id`
  - `full_name`
  - `email`
  - default `role = 'creador'`
  - optional `roles = ['creador']` for dual-role support
  - `verification_status = 'pending'`
  - `whatsapp_connected = false`
- Keep profile creation idempotent. A retry should upsert the same profile instead of failing.

### Future: Google auth

- Add Google as a secondary OAuth provider.
- On first OAuth login, create the same `profiles` row.
- Ask for missing production-critical fields during onboarding: city, barrio, WhatsApp, creator/host intent.

### Future: WhatsApp / phone verification

- Store `whatsapp_number` on `profiles`.
- Store `whatsapp_connected` as a product state, not as proof of legal identity.
- Use WhatsApp for coordination and verification signals later, but do not expose personal contact details publicly.

## Roles

The first integration writes `profiles.role` as the primary role. For dual-role support, keep `profiles.roles` as a `user_role[]` array and read both fields in the app.

- `creador`: can browse, favorite, request bookings, message booking participants, and review completed collaborations.
- `anfitrion`: can create host profile, publish locaciones, manage availability, accept/decline bookings, message booking participants, and receive payouts.
- `admin`: can review host verification, listing approvals, disputes, reported users, and reported listings.

A user can be both `creador` and `anfitrion`. This is important for Colombian creators who rent their own spaces and also book other locaciones.

## Onboarding Logic

### New creator

1. Signup or login.
2. Create profile if missing.
3. Route to `/profile` or the booking flow they started.
4. Let them browse and favorite immediately.
5. Require core profile completion before submitting a real booking request.

### New host

1. Signup or login.
2. Create profile if missing.
3. Set `profiles.role = 'anfitrion'` and add `anfitrion` to `profiles.roles` when dual-role support is enabled.
4. Create `host_profiles` row with `verification_status = 'pending'`.
5. Route to `/host/new`.
6. Listing remains `draft` or `pending_review` until admin approval.

### Existing user adding host mode

1. User chooses `Publicar espacio`.
2. If authenticated, set host role state if missing.
3. Create `host_profiles` row if missing.
4. Continue to host onboarding.

## Protected Routes

Public:

- `/`
- `/browse`
- `/listing/:id`
- `/auth`

Authenticated creator:

- `/profile`
- `/dashboard`
- `/messages`
- `/checkout/:id`

Authenticated host:

- `/host/new`
- `/host/dashboard`

Admin:

- `/admin`

Route behavior:

- If unauthenticated and entering a protected route, redirect to `/auth` with the intended route as a return target.
- If authenticated but missing the required role, show a premium empty state with the correct CTA. Example: creator visiting `/host/dashboard` sees `Crear perfil de anfitrión`.
- Keep mock auth as the fallback while Supabase is not configured.

## Profile Creation After Signup

Recommended flow:

1. Supabase Auth returns `user`.
2. Call `upsertProfile`.
3. Use `profilesRepository.getProfileById(user.id)` to confirm profile exists.
4. If signup role is host, call host onboarding initializer.
5. Navigate based on intent:
   - creator booking intent: `/checkout/:id`
   - creator default: `/profile`
   - host intent: `/host/new`
   - admin: `/admin`

## Trust States

Profile and host verification must support:

- `pending`
- `approved`
- `rejected`
- `retry`

Rejected and retry states should show practical next steps. Do not use theatrical trust badges before real checks exist.

## Contact Safety

- Do not show private phone, WhatsApp, exact address, or document fields publicly.
- Booking participants coordinate inside Booked messages.
- Exact address becomes visible only after booking confirmation.
- Admins can review contact-sharing reports later through `admin_reports`.
