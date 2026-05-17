import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { findListing, mockBookingRequests, mockFavorites } from "@/lib/marketplaceMockData";
import { ProductionIntelligence } from "@/components/ProductionIntelligence";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Calendar, CheckCircle2, Clock, Heart, MapPin, MessageCircle, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const reservations = mockBookingRequests.filter((booking) => booking.guestId === "user-juan").map((booking) => ({
  ...booking,
  listing: findListing(booking.listingId),
}));

const completed = [
  { listing: LISTINGS[3], date: "3 mayo 2026", status: "Completada", production: "Food content" },
  { listing: LISTINGS[2], date: "18 abril 2026", status: "Completada", production: "Producto tech" },
];

const statusTone: Record<string, string> = {
  "Solicitud recibida": "bg-gold/20 text-white border-gold/30",
  Confirmada: "bg-cobalt/20 text-white border-cobalt/30",
  Completada: "bg-emerald-500/20 text-white border-emerald-400/30",
  Cancelada: "bg-destructive/20 text-white border-destructive/30",
};

const Dashboard = () => {
  const [savedIds, setSavedIds] = useState(() => mockFavorites.map((favorite) => favorite.listingId));
  const savedListings = savedIds.map(findListing);
  const removeSaved = (listingId: string) => setSavedIds((current) => current.filter((id) => id !== listingId));

  return (
    <PageShell>
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="editorial-eyebrow text-coral">Reservas</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Tus próximos shoots.</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">Coordina reservas, mensajes, locaciones guardadas e inteligencia de producción desde un solo lugar.</p>
          </div>
          <Link to="/browse"><Button variant="hero"><Sparkles size={16} /> Explorar locaciones</Button></Link>
        </div>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <Stat icon={Calendar} label="Proximas" value="2" />
          <Stat icon={Clock} label="Pendientes" value="1" />
          <Stat icon={Heart} label="Guardadas" value={`${savedIds.length}`} />
          <Stat icon={BadgeCheck} label="Completadas" value="10" />
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold mb-4 inline-flex items-center gap-2">
            <Calendar size={20} className="text-coral" /> Reservas proximas
          </h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {reservations.map((item) => (
              <article key={item.id} className="rounded-3xl widget overflow-hidden hover-lift min-w-0">
                <div className="aspect-[16/9] relative">
                  <img src={item.listing.image} alt={item.listing.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-cinema" />
                  <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${statusTone[item.status]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="p-5 min-w-0">
                  <h3 className="font-display text-xl font-semibold truncate">{item.listing.title}</h3>
                  <p className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {item.listing.neighborhood}, {item.listing.city}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <Info label="Fecha" value={item.date} />
                    <Info label="Horario" value={`${item.startTime} - ${item.endTime}`} />
                    <Info label="Producción" value={item.productionType} />
                    <Info label="Crew" value={`${item.crewSize} personas`} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to="/messages"><Button variant="hero" size="sm"><MessageCircle size={14} /> Mensajear</Button></Link>
                    <Link to={`/listing/${item.listing.id}`}><Button variant="glass" size="sm">Ver locación</Button></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-[2rem] glass-strong p-5 sm:p-7 overflow-hidden">
          <ProductionIntelligence
            compact
            title="Inteligencia para El Poblado Glass Penthouse"
            subtitle="Preview mock para tu reserva confirmada del 22 de mayo."
            data={{
              location: "El Poblado, Medellín",
              weather: { label: "Nublado suave", tempC: 24 },
              goldenHour: "5:42 - 6:24 p.m.",
              rainRiskPct: 18,
              lightQuality: "Excellent",
              crewReadyPct: 92,
            }}
          />
        </section>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="widget p-5 sm:p-6 min-w-0">
            <h2 className="font-display text-2xl font-semibold mb-4 inline-flex items-center gap-2">
              <CheckCircle2 size={20} className="text-emerald-400" /> Shoots completados
            </h2>
            <div className="space-y-3">
              {completed.map((item) => (
                <div key={item.listing.id} className="flex gap-3 rounded-2xl bg-white/5 p-3 border border-white/10 min-w-0">
                  <img src={item.listing.image} alt="" className="h-16 w-20 rounded-2xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{item.listing.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date} · {item.production}</p>
                    <span className="mt-2 inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-emerald-500/20 text-white border border-emerald-400/30">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="widget p-5 sm:p-6 min-w-0">
            <h2 className="font-display text-2xl font-semibold mb-4 inline-flex items-center gap-2">
              <Heart size={20} className="text-coral" /> Guardados
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {savedListings.map((listing) => (
                <div key={listing.id} className="group min-w-0 relative">
                  <Link to={`/listing/${listing.id}`}>
                    <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                      <img src={listing.image} alt={listing.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="text-sm font-medium mt-2 truncate">{listing.title}</p>
                    <p className="text-xs text-muted-foreground">{listing.city} · {formatCOP(listing.hourlyCop)} / h</p>
                  </Link>
                  <button onClick={() => removeSaved(listing.id)} className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/60 backdrop-blur border border-white/15 grid place-items-center">
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="widget p-4 sm:p-5 min-w-0">
    <Icon size={17} className="text-coral" />
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3 font-semibold truncate">{label}</div>
    <div className="font-display text-2xl sm:text-3xl font-semibold">{value}</div>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white/5 p-3 border border-white/10 min-w-0">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold truncate">{label}</div>
    <div className="font-medium text-sm mt-1 break-words">{value}</div>
  </div>
);

export default Dashboard;
