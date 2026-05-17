import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { JUAN_MOCK_USER } from "@/lib/mockAuth";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
import { cn } from "@/lib/utils";
import { useBookedAuth } from "@/hooks/useBookedAuth";
import {
  BadgeCheck,
  Calendar,
  ChevronRight,
  Heart,
  MapPin,
  MessageCircle,
  Settings,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";

const creatorStats = [
  { label: "Reservas", value: "12" },
  { label: "Sets guardados", value: "18" },
  { label: "Calificación", value: "4.96" },
];

const Profile = () => {
  const navigate = useNavigate();
  const { profile, user: authUser, profileLoading, profileSynced, signOut: signOutUser, activateMockUser, isMockMode, refreshProfile } = useBookedAuth();
  const missingProfile = Boolean(authUser && !profileSynced);
  const displayUser = {
    name: profile?.fullName || authUser?.user_metadata?.full_name || authUser?.email?.split("@")[0] || JUAN_MOCK_USER.name,
    role: profile?.roles?.includes("anfitrion") ? "Anfitrión + Creador" : "Creador",
    city: profile?.city || (authUser ? "Colombia" : JUAN_MOCK_USER.city),
    email: profile?.email || authUser?.email || JUAN_MOCK_USER.email,
    whatsapp: profile?.phone || (authUser ? "" : JUAN_MOCK_USER.whatsapp),
    verified: profile ? profile.verificationStatus === "approved" : !authUser && JUAN_MOCK_USER.verified,
    whatsappConnected: profile ? profile.whatsappConnected : !authUser && JUAN_MOCK_USER.verified,
    roles: profile?.roles || (authUser ? ["creador" as const] : JUAN_MOCK_USER.roles),
  };
  const roles = displayUser.roles;
  const initials = displayUser.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "B";

  const signOut = async () => {
    try {
      await signOutUser();
      toast.success("Sesión cerrada.");
    } catch {
      toast.error("No pudimos cerrar sesión. Inténtalo de nuevo.");
    }
    navigate("/auth");
  };

  const signInMock = () => {
    activateMockUser("host");
    navigate("/profile");
  };

  const completeProfile = async () => {
    try {
      await refreshProfile();
      toast.success("Intentamos completar tu perfil.", {
        description: "Si Supabase permite el guardado, tus datos quedarán sincronizados.",
      });
    } catch {
      toast.error("No pudimos completar el perfil todavía.");
    }
  };

  if (profileLoading) {
    return (
      <PageShell>
        <div className="container-tight">
          <div className="rounded-[2rem] glass-strong p-8 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-sunset shadow-glow-coral animate-pulse" />
            <h1 className="font-display text-4xl font-semibold">Cargando perfil...</h1>
            <p className="text-muted-foreground mt-2">Estamos trayendo tus datos de Booked.</p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="container-tight">
        <section className="relative overflow-hidden rounded-[2rem] glass-strong p-5 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-[2rem] bg-gradient-sunset shadow-glow-coral grid place-items-center border border-white/20 glossy shrink-0">
              <span className="font-display text-4xl font-semibold text-white">{initials}</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="editorial-eyebrow text-coral">Perfil</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cobalt/20 px-2.5 py-1 text-xs font-semibold text-white border border-cobalt/30">
                  <BadgeCheck size={13} /> {displayUser.verified ? "Verificado" : "Pendiente"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-white border border-emerald-400/30">
                  <MessageCircle size={13} /> {displayUser.whatsappConnected ? "WhatsApp conectado" : "WhatsApp pendiente"}
                </span>
              </div>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{displayUser.name}</h1>
              <p className="mt-1 text-muted-foreground inline-flex items-center gap-1.5">
                <Sparkles size={15} className="text-gold" /> {displayUser.role} · <MapPin size={15} /> {displayUser.city}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/host/dashboard"><Button variant="hero">Panel anfitrión</Button></Link>
              <Button variant="glass" onClick={signOut}>Cerrar sesión</Button>
            </div>
          </div>
        </section>

        {missingProfile && (
          <section className="mb-8 rounded-3xl border border-coral/30 bg-coral/10 p-5 sm:p-6 backdrop-blur-xl shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="font-display text-2xl font-semibold">Completar perfil</p>
                <p className="text-sm text-muted-foreground mt-1">Tu sesión está activa con {displayUser.email}, pero falta sincronizar el perfil en Supabase.</p>
              </div>
              <Button variant="hero" onClick={completeProfile}>Completar perfil</Button>
            </div>
          </section>
        )}

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
          <div className="space-y-6 min-w-0">
            <section className="grid grid-cols-3 gap-3">
              {creatorStats.map((s) => (
                <div key={s.label} className="widget p-4 text-center min-w-0">
                  <div className="font-display text-2xl sm:text-3xl font-semibold">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1 truncate">{s.label}</div>
                </div>
              ))}
            </section>

            <Panel title="Accesos rápidos">
              <Shortcut icon={Calendar} label="Reservas próximas" to="/dashboard" />
              <Shortcut icon={Heart} label="Locaciones guardadas" to="/dashboard?tab=saved" />
              <Shortcut icon={Sparkles} label="Mis espacios" to="/host/dashboard" />
              <Shortcut icon={Settings} label="Configuración" to="/auth" />
            </Panel>

            <Panel title="Modos de cuenta">
              <div className="grid gap-3">
                <ModeCard title="Como creador" body="Reservas, guardados, mensajes y pagos pendientes de aprobación." active={roles.includes("creador")} />
                <ModeCard title="Como anfitrión" body="Listings, solicitudes entrantes, disponibilidad y payouts mock." active={roles.includes("anfitrion")} />
              </div>
            </Panel>

            <Panel title="Preferencias">
              <div>
                <p className="text-sm font-semibold">Tema</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">Sigue el sistema o elige una experiencia visual para Booked.</p>
                <ThemeSelector />
              </div>
            </Panel>

            <Panel title="Estado de confianza">
              <div className="space-y-3">
                {["Identidad aprobada", "WhatsApp conectado", "Pagos en prueba", "Reviews post-producción"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 p-3 border border-white/10">
                    <span className="text-sm">{item}</span>
                    <BadgeCheck size={16} className="text-cobalt shrink-0" />
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-6 min-w-0">
            <Panel title="Proximas reservas">
              {LISTINGS.slice(0, 2).map((listing, index) => (
                <Link to="/dashboard" key={listing.id} className="flex gap-3 rounded-2xl bg-white/5 p-3 border border-white/10 hover:bg-white/10 transition-colors min-w-0">
                  <img src={listing.image} alt="" className="h-20 w-24 rounded-2xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-coral">{index === 0 ? "Confirmada" : "Solicitud recibida"}</div>
                    <p className="font-semibold truncate">{listing.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{index === 0 ? "22 mayo · 9:00 a.m." : "4 junio · día completo"}</p>
                  </div>
                  <ChevronRight size={16} className="self-center text-muted-foreground shrink-0" />
                </Link>
              ))}
            </Panel>

            <Panel title="Mis espacios">
              <div className="grid sm:grid-cols-3 gap-3">
                {LISTINGS.slice(3, 6).map((listing) => (
                  <Link to="/host/dashboard" key={listing.id} className="group min-w-0">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                      <img src={listing.image} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="mt-2 text-sm font-semibold truncate">{listing.title}</p>
                    <p className="text-xs text-muted-foreground">{formatCOP(listing.hourlyCop)} / h</p>
                  </Link>
                ))}
              </div>
            </Panel>

            <Panel title="Guardados">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {LISTINGS.slice(0, 4).map((listing) => (
                  <Link to={`/listing/${listing.id}`} key={listing.id} className="min-w-0">
                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                      <img src={listing.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-xs font-semibold mt-2 truncate">{listing.title}</p>
                  </Link>
                ))}
              </div>
            </Panel>

            <div className="rounded-3xl bg-gradient-cobalt p-5 text-white shadow-glow-cobalt border border-white/15 glossy">
              <div className="flex items-start gap-3">
                <Wallet className="mt-1 shrink-0" size={20} />
                <div>
                  <h3 className="font-display text-2xl font-semibold">Centro de pagos</h3>
                  <p className="text-sm text-white/80 mt-1">Payouts mock de anfitrión, reservas pendientes y protección de pagos antes de activar backend.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMockMode && (
          <div className="mt-6 rounded-3xl widget p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold inline-flex items-center gap-2"><Star size={16} className="fill-gold stroke-gold" /> Vista mock activa</p>
              <p className="text-sm text-muted-foreground">Inicia sesión mock para mantener el estado entre pantallas.</p>
            </div>
            <Button variant="hero" onClick={signInMock}>Activar usuario mock</Button>
          </div>
        )}
      </div>
    </PageShell>
  );
};

const Panel = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="widget p-5 sm:p-6 min-w-0">
    <h2 className="font-display text-2xl font-semibold mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const Shortcut = ({ icon: Icon, label, to }: { icon: LucideIcon; label: string; to: string }) => (
  <Link to={to} className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 p-3 border border-white/10 hover:bg-white/10 transition-colors">
    <span className="inline-flex items-center gap-3 text-sm font-medium min-w-0">
      <span className="h-9 w-9 rounded-2xl bg-white/5 grid place-items-center text-coral shrink-0"><Icon size={16} /></span>
      <span className="truncate">{label}</span>
    </span>
    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
  </Link>
);

const ModeCard = ({ title, body, active }: { title: string; body: string; active: boolean }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
    <div className="flex items-center justify-between gap-3">
      <p className="font-semibold">{title}</p>
      <span className={cn("text-[10px] uppercase tracking-wider rounded-full px-2 py-1 border", active ? "bg-cobalt/20 border-cobalt/30 text-foreground" : "text-muted-foreground border-white/10")}>
        {active ? "Activo" : "Inactivo"}
      </span>
    </div>
    <p className="text-sm text-muted-foreground mt-1">{body}</p>
  </div>
);

export default Profile;
