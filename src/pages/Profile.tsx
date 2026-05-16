import { Link, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { clearMockUser, getMockUser, JUAN_MOCK_USER, setMockUser } from "@/lib/mockAuth";
import { ThemeSelector } from "@/components/theme/ThemeSelector";
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

const creatorStats = [
  { label: "Reservas", value: "12" },
  { label: "Sets guardados", value: "18" },
  { label: "Calificación", value: "4.96" },
];

const Profile = () => {
  const navigate = useNavigate();
  const user = getMockUser() || JUAN_MOCK_USER;

  const signOut = () => {
    clearMockUser();
    navigate("/auth");
  };

  const signInMock = () => {
    setMockUser("host");
    navigate("/profile");
  };

  return (
    <PageShell>
      <div className="container-tight">
        <section className="relative overflow-hidden rounded-[2rem] glass-strong p-5 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-end gap-6">
            <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-[2rem] bg-gradient-sunset shadow-glow-coral grid place-items-center border border-white/20 glossy shrink-0">
              <span className="font-display text-4xl font-semibold text-white">JS</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="editorial-eyebrow text-coral">Perfil</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cobalt/20 px-2.5 py-1 text-xs font-semibold text-white border border-cobalt/30">
                  <BadgeCheck size={13} /> Verificado
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold text-white border border-emerald-400/30">
                  <MessageCircle size={13} /> WhatsApp conectado
                </span>
              </div>
              <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">{user.name}</h1>
              <p className="mt-1 text-muted-foreground inline-flex items-center gap-1.5">
                <Sparkles size={15} className="text-gold" /> {user.role} · <MapPin size={15} /> {user.city}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/host/dashboard"><Button variant="hero">Panel anfitrión</Button></Link>
              <Button variant="glass" onClick={signOut}>Cerrar sesión</Button>
            </div>
          </div>
        </section>

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

        {!getMockUser() && (
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

export default Profile;
