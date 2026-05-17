# Booked Supabase Schema Plan

Booked is a Colombia-first marketplace for renting locaciones by the hour or day for film, TV, photography, music videos, podcasts, campaigns, content, workshops, and events. COP is the source of truth for pricing and payment records.

This document is SQL-ready planning, not an applied migration yet. Use `auth.users.id` for user identity and keep private fields protected by RLS.

## Enums

```sql
create type user_role as enum ('creador', 'anfitrion', 'admin');
create type verification_status as enum ('pending', 'approved', 'rejected', 'retry');
create type location_approval_status as enum ('draft', 'pending_review', 'approved', 'rejected');
create type availability_status as enum ('available', 'blocked', 'booked');
create type booking_status as enum (
  'Solicitud enviada',
  'Pendiente de aprobación',
  'Confirmada',
  'Rechazada',
  'Cancelada',
  'Completada'
);
create type payment_status as enum ('No iniciado', 'Pendiente', 'Autorizado', 'Pagado', 'Reembolsado', 'Fallido');
create type payout_status as enum ('not_configured', 'pending', 'ready', 'paid', 'failed');
create type report_status as enum ('open', 'in_review', 'resolved', 'dismissed');
create type report_target_type as enum ('location', 'user', 'booking', 'message');
create type booking_type as enum ('hourly', 'half_day', 'full_day');
```

## profiles

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  city text,
  barrio text,
  whatsapp_number text,
  whatsapp_connected boolean not null default false,
  document_type text,
  document_last4 text,
  username text,
  avatar_url text,
  role user_role not null default 'creador',
  roles user_role[] not null default array['creador']::user_role[],
  verification_status verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_city_idx on public.profiles(city);
create index profiles_role_idx on public.profiles(role);
create index profiles_roles_idx on public.profiles using gin(roles);
```

Private fields: `email`, `whatsapp_number`, `document_type`, `document_last4`. The current frontend writes `role` for the first integration phase and reads either `role` or `roles`; keep `roles` available for dual-role support.

## host_profiles

```sql
create table public.host_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  display_name text not null,
  bio text,
  response_time_minutes integer not null default 0,
  verification_status verification_status not null default 'pending',
  payout_status payout_status not null default 'not_configured',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create index host_profiles_user_id_idx on public.host_profiles(user_id);
create index host_profiles_verification_status_idx on public.host_profiles(verification_status);
```

## locations

```sql
create table public.locations (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.host_profiles(id) on delete cascade,
  title text not null,
  slug text not null unique,
  location_type text not null,
  city text not null,
  barrio text not null,
  address_private text not null,
  map_hint text,
  description text not null,
  hourly_price_cop integer not null check (hourly_price_cop >= 0),
  half_day_price_cop integer not null check (half_day_price_cop >= 0),
  full_day_price_cop integer not null check (full_day_price_cop >= 0),
  cleaning_fee_cop integer not null default 0 check (cleaning_fee_cop >= 0),
  security_deposit_cop integer not null default 0 check (security_deposit_cop >= 0),
  minimum_hours integer not null default 2 check (minimum_hours > 0),
  max_crew_size integer not null check (max_crew_size > 0),
  event_capacity integer not null default 0,
  production_types_allowed text[] not null default '{}',
  house_rules text[] not null default '{}',
  parking_loading_info text,
  noise_restrictions text,
  elevator_access text,
  natural_light_notes text,
  best_light_hours text,
  power_internet_info text,
  bathroom_access text,
  bathroom_count integer default 1,
  makeup_changing_area boolean not null default false,
  furniture_movement_allowed boolean not null default false,
  night_shoots_allowed boolean not null default false,
  events_allowed boolean not null default false,
  alcohol_policy text,
  smoking_policy text,
  pets_policy text,
  approval_status location_approval_status not null default 'draft',
  is_published boolean not null default false,
  rating_average numeric(3,2) not null default 0,
  review_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index locations_host_id_idx on public.locations(host_id);
create index locations_city_barrio_idx on public.locations(city, barrio);
create index locations_approval_idx on public.locations(approval_status, is_published);
create index locations_price_idx on public.locations(hourly_price_cop);
create index locations_production_types_idx on public.locations using gin(production_types_allowed);
```

`address_private` is never public. Show only `city`, `barrio`, and safe access notes until a booking is confirmed.

## location_photos

```sql
create table public.location_photos (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer not null default 0,
  is_cover boolean not null default false,
  created_at timestamptz not null default now()
);

create index location_photos_location_id_idx on public.location_photos(location_id, sort_order);
```

## amenities and location_amenities

```sql
create table public.amenities (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  icon_name text,
  created_at timestamptz not null default now()
);

create table public.location_amenities (
  location_id uuid not null references public.locations(id) on delete cascade,
  amenity_id uuid not null references public.amenities(id) on delete restrict,
  primary key (location_id, amenity_id)
);

create index location_amenities_amenity_id_idx on public.location_amenities(amenity_id);
```

## availability_slots

```sql
create table public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete cascade,
  date date not null,
  start_time time not null,
  end_time time not null,
  status availability_status not null default 'available',
  label text,
  created_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index availability_location_date_idx on public.availability_slots(location_id, date);
create index availability_status_idx on public.availability_slots(status);
```

## bookings

```sql
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references public.locations(id) on delete restrict,
  guest_id uuid not null references public.profiles(id) on delete restrict,
  host_id uuid not null references public.host_profiles(id) on delete restrict,
  date date not null,
  start_time time not null,
  end_time time not null,
  booking_type booking_type not null,
  crew_size integer not null check (crew_size > 0),
  production_type text not null,
  purpose text not null,
  message_to_host text,
  subtotal_cop integer not null check (subtotal_cop >= 0),
  fees_cop integer not null default 0 check (fees_cop >= 0),
  cleaning_fee_cop integer not null default 0 check (cleaning_fee_cop >= 0),
  total_cop integer not null check (total_cop >= 0),
  status booking_status not null default 'Solicitud enviada',
  payment_status payment_status not null default 'Pendiente',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (end_time > start_time)
);

create index bookings_guest_id_idx on public.bookings(guest_id, date);
create index bookings_host_id_idx on public.bookings(host_id, date);
create index bookings_location_date_idx on public.bookings(location_id, date);
create index bookings_status_idx on public.bookings(status);
```

Payments remain pending until host approval. COP values are authoritative even if future crypto rails are used.

## booking_messages

```sql
create table public.booking_messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete restrict,
  body text not null,
  created_at timestamptz not null default now()
);

create index booking_messages_booking_id_idx on public.booking_messages(booking_id, created_at);
create index booking_messages_sender_id_idx on public.booking_messages(sender_id);
```

Repository note: the frontend may derive conversation list rows from `bookings` plus latest `booking_messages`, or use a view named `booking_conversations`.

## reviews

```sql
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  location_id uuid not null references public.locations(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id) on delete restrict,
  reviewee_id uuid not null references public.profiles(id) on delete restrict,
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now(),
  unique(booking_id, reviewer_id)
);

create index reviews_location_id_idx on public.reviews(location_id);
create index reviews_reviewee_id_idx on public.reviews(reviewee_id);
```

Only completed bookings can be reviewed.

## favorites

```sql
create table public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  location_id uuid not null references public.locations(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, location_id)
);

create index favorites_user_id_idx on public.favorites(user_id, created_at desc);
```

## admin_reports

```sql
create table public.admin_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references public.profiles(id) on delete set null,
  target_type report_target_type not null,
  target_id uuid not null,
  reason text not null,
  details text,
  status report_status not null default 'open',
  assigned_admin_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index admin_reports_status_idx on public.admin_reports(status, created_at);
create index admin_reports_target_idx on public.admin_reports(target_type, target_id);
```

## payouts placeholder

```sql
create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  host_id uuid not null references public.host_profiles(id) on delete restrict,
  booking_id uuid references public.bookings(id) on delete restrict,
  amount_cop integer not null check (amount_cop >= 0),
  method text not null default 'manual_placeholder',
  status payout_status not null default 'pending',
  provider_reference text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index payouts_host_id_idx on public.payouts(host_id, created_at desc);
create index payouts_status_idx on public.payouts(status);
```

## payment_records placeholder

```sql
create table public.payment_records (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete restrict,
  amount_cop integer not null check (amount_cop >= 0),
  method text not null,
  status payment_status not null default 'Pendiente',
  provider_reference text,
  crypto_asset text,
  crypto_network text,
  no_private_data_on_chain boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payment_records_booking_id_idx on public.payment_records(booking_id);
create index payment_records_status_idx on public.payment_records(status);
```

Allowed future methods: `Tarjeta`, `PSE`, `Nequi`, `Bancolombia`, `Daviplata`, `Bitcoin`, `XRP`, `USDC`.

## RLS Policy Plan

Enable RLS on every public table:

```sql
alter table public.profiles enable row level security;
alter table public.host_profiles enable row level security;
alter table public.locations enable row level security;
alter table public.location_photos enable row level security;
alter table public.amenities enable row level security;
alter table public.location_amenities enable row level security;
alter table public.availability_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_messages enable row level security;
alter table public.reviews enable row level security;
alter table public.favorites enable row level security;
alter table public.admin_reports enable row level security;
alter table public.payouts enable row level security;
alter table public.payment_records enable row level security;
```

Policy intent:
- Users can read their own full profile and update their own profile.
- Public users can read published, approved locations plus safe host display fields, photos, amenities, and non-private availability.
- Public users cannot read private profile data, exact addresses, document placeholders, payment records, payouts, or private reports.
- Hosts can create and update only their own listings through their `host_profiles.id`.
- Hosts can upload and manage photos, amenities, and availability for their own locations.
- Guests can create bookings for published locations as themselves.
- Guests can read their own bookings.
- Hosts can read and update bookings for locations they own, including accepting or declining.
- Booking participants can read and write booking messages for bookings where they are either the guest or the host.
- Reviews can be created only by participants after a booking is `Completada`.
- Users can manage their own favorites.
- Admins can review reported users, reported listings, booking disputes, host verification, and listing approvals.

Useful helper:

```sql
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and 'admin' = any(roles)
  );
$$;
```

Example policies:

```sql
create policy "public can read published locations"
on public.locations for select
using (approval_status = 'approved' and is_published = true);

create policy "users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

create policy "hosts can manage own locations"
on public.locations for all
using (
  exists (
    select 1 from public.host_profiles
    where host_profiles.id = locations.host_id
      and host_profiles.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.host_profiles
    where host_profiles.id = locations.host_id
      and host_profiles.user_id = auth.uid()
  )
);

create policy "booking participants can read messages"
on public.booking_messages for select
using (
  exists (
    select 1
    from public.bookings
    join public.host_profiles on host_profiles.id = bookings.host_id
    where bookings.id = booking_messages.booking_id
      and (bookings.guest_id = auth.uid() or host_profiles.user_id = auth.uid())
  )
);

create policy "admins can manage reports"
on public.admin_reports for all
using (public.is_admin())
with check (public.is_admin());
```
