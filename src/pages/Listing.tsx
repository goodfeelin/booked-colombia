import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { ListingCard } from "@/components/ListingCard";
import { ProductionIntelligence } from "@/components/ProductionIntelligence";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Sun, Volume2, Wifi, Zap, Car, Camera, Heart, Share2, Shield, ChevronRight, Clock, BadgeCheck, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const Listing = () => {
  const { id } = useParams();
  const listing = LISTINGS.find((l) => l.id === id);
  const [hours, setHours] = useState(4);
  const [date, setDate] = useState("");

  if (!listing) {
    return (
      <PageShell>
        <div className="container-tight py-20 text-center">
          <h1 className="font-display text-4xl">Locación no encontrada.</h1>
          <Link to="/browse"><Button variant="hero" className="mt-6">Explorar locaciones</Button></Link>
        </div>
      </PageShell>
    );
  }

  const subtotal = listing.hourlyCop * hours;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee + listing.cleaningFeeCop;
  const similar = LISTINGS.filter((l) => l.id !== listing.id).slice(0, 3);

  return (
    <PageShell>
      <div className="container-tight">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="editorial-eyebrow text-coral">{listing.type}</span>
            <h1 className="mt-1 font-display text-4xl sm:text-6xl font-semibold text-balance">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star size={14} className="fill-gold stroke-gold" /> {listing.rating} · {listing.reviewCount} reviews</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {listing.neighborhood}, {listing.city}</span>
              <span className="inline-flex items-center gap-1"><Users size={14} /> Hasta {listing.maxCrew} personas</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: Sun, label: `${translateDetail(listing.details.naturalLight)} luz natural` },
                { icon: Clock, label: listing.details.bestLightHours },
                { icon: Truck, label: listing.details.parking },
              ].map((badge) => (
                <span key={badge.label} className="inline-flex items-center gap-1.5 rounded-full surface-quiet px-3 py-1.5 text-xs font-semibold text-foreground">
                  <badge.icon size={13} className="text-coral" /> {badge.label}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="glass" size="sm"><Heart size={14} /> Guardar</Button>
            <Button variant="glass" size="sm"><Share2 size={14} /> Compartir</Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 sm:gap-3 h-[52vh] min-h-[360px] sm:h-[60vh] rounded-[2rem] overflow-hidden border border-white/10 shadow-float">
          <div className="col-span-4 md:col-span-2 row-span-2 relative group overflow-hidden">
            <img src={listing.gallery[0]} alt={listing.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 cinema-overlay opacity-60" />
          </div>
          {listing.gallery.slice(1, 3).map((g, i) => (
            <div key={i} className="hidden md:block col-span-2 md:col-span-1 row-span-2 relative group overflow-hidden">
              <img src={g} alt={`${listing.title} ${i + 2}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 cinema-overlay opacity-45" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_410px] gap-8 lg:gap-10 mt-10">
          <div>
            {/* Host */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-3xl widget mb-8">
              <img src={listing.host.avatar} alt={listing.host.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-white/15" />
              <div className="flex-1">
                <p className="font-semibold">
                  Anfitrión: {listing.host.name}
                  {listing.host.superhost && (
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-gradient-sunset text-white font-bold uppercase tracking-wider glossy">Top host</span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">Anfitrión verificado · Responde en menos de 1 hora · WhatsApp conectado</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full surface-quiet px-3 py-2 text-xs font-semibold"><BadgeCheck size={14} className="text-cobalt" /> Producción friendly</span>
            </div>

            {/* Description */}
            <section className="py-8 border-b border-white/10">
              <p className="text-lg leading-relaxed text-foreground/90 max-w-3xl">{listing.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {listing.styleTags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full glass border-white/10 font-semibold">{t}</span>
                ))}
              </div>
            </section>

            {/* Production Intelligence preview */}
            <section className="py-8 border-b border-white/10">
              <ProductionIntelligence
                compact
                title="Condiciones del set"
                subtitle={date ? `Preview para ${date}` : "Elige una fecha en la reserva para ver condiciones mock."}
                data={{
                  location: `${listing.neighborhood}, ${listing.city}`,
                  weather: { label: "Parcialmente nublado", tempC: 24 },
                  goldenHour: listing.details.bestLightHours,
                  rainRiskPct: 22,
                  lightQuality: listing.details.naturalLight === "Excellent" ? "Excellent" : "Good",
                  crewReadyPct: 88,
                }}
              />
            </section>

            {/* Production Details */}
            <section className="py-8 border-b border-white/10">
              <h2 className="font-display text-2xl font-semibold mb-5">Detalles de producción</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Detail icon={Sun} label="Luz natural" value={translateDetail(listing.details.naturalLight)} />
                <Detail icon={Sun} label="Mejor luz" value={listing.details.bestLightHours} />
                <Detail icon={Volume2} label="Ruido" value={translateDetail(listing.details.noise)} />
                <Detail icon={Zap} label="Energía" value={listing.details.powerOutlets} />
                <Detail icon={Wifi} label="Internet" value={listing.details.wifi} />
                <Detail icon={Car} label="Parqueo" value={listing.details.parking} />
                <Detail icon={Users} label="Crew max" value={`${listing.maxCrew}`} />
                <Detail icon={Camera} label="Drone" value={listing.details.drone ? "Permitido" : "No permitido"} />
                <Detail icon={Camera} label="Nocturno" value={listing.details.nightShoots ? "Permitido" : "No permitido"} />
              </div>
            </section>

            {/* Amenities */}
            <section className="py-8 border-b border-white/10">
              <h2 className="font-display text-2xl font-semibold mb-5">Amenidades</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm rounded-2xl surface-quiet px-3 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-coral shadow-glow-coral shrink-0" />{a}
                  </div>
                ))}
              </div>
            </section>

            {/* Rules */}
            <section className="py-8 border-b border-white/10">
              <h2 className="font-display text-2xl font-semibold mb-4">Reglas del espacio</h2>
              <ul className="space-y-2 text-muted-foreground">
                {listing.rules.map((r) => <li key={r} className="flex gap-2"><Shield size={16} className="text-cobalt mt-0.5 shrink-0" />{r}</li>)}
              </ul>
            </section>

            {/* Map placeholder */}
            <section className="py-8 border-b border-white/10">
              <h2 className="font-display text-2xl font-semibold mb-4">Donde vas a crear</h2>
              <div className="aspect-[16/9] rounded-3xl widget flex items-center justify-center text-muted-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-glow opacity-50" />
                <span className="relative inline-flex items-center gap-2"><MapPin size={18} /> {listing.neighborhood}, {listing.city} · mapa preview</span>
              </div>
            </section>

            {/* Reviews */}
            <section className="py-8">
              <h2 className="font-display text-2xl font-semibold mb-6">
                <Star className="inline fill-gold stroke-gold mb-1" size={22} /> {listing.rating} · {listing.reviewCount} reviews
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { n: "Valentina · Music video", q: "Light was unreal at 5pm. Host moved furniture without us asking. 10/10." },
                  { n: "Juanca · Editorial", q: "Cinematic from any angle. Already booked for our next campaign." },
                ].map((r) => (
                  <div key={r.n} className="p-5 rounded-2xl widget">
                    <div className="flex gap-0.5 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="fill-gold stroke-gold" />)}</div>
                    <p className="text-sm">"{r.q}"</p>
                    <p className="text-xs text-muted-foreground mt-3">{r.n}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking widget */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-[2rem] widget p-5 sm:p-6 border-white/10">
              <div className="mb-5 rounded-3xl bg-gradient-cobalt p-4 text-white shadow-glow-cobalt glossy">
                <div className="text-[10px] uppercase tracking-wider text-white/75 font-bold">Reserva protegida</div>
                <div className="mt-1 font-display text-2xl font-semibold">Solicitud segura</div>
                <p className="mt-1 text-xs text-white/78">El anfitrión aprueba antes de cobrar. Coordina todo dentro de Booked.</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold">{formatCOP(listing.hourlyCop)}</span>
                <span className="text-muted-foreground">/ hora</span>
              </div>
              <p className="text-xs text-muted-foreground">Medio día {formatCOP(listing.halfDayCop)} · Día completo {formatCOP(listing.fullDayCop)}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                <span className="surface-quiet rounded-2xl px-3 py-2"><Users size={13} className="inline mr-1 text-coral" /> Hasta {listing.maxCrew}</span>
                <span className="surface-quiet rounded-2xl px-3 py-2"><Sun size={13} className="inline mr-1 text-gold" /> {translateDetail(listing.details.naturalLight)}</span>
              </div>

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Fecha</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inp} />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Horas (min {listing.minHours})</span>
                  <input type="number" min={listing.minHours} value={hours} onChange={(e) => setHours(Math.max(listing.minHours, Number(e.target.value)))} className={inp} />
                </label>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <Row label={`${formatCOP(listing.hourlyCop)} × ${hours}h`} value={formatCOP(subtotal)} />
                <Row label="Limpieza" value={formatCOP(listing.cleaningFeeCop)} />
                <Row label="Servicio Booked (12%)" value={formatCOP(fee)} />
                <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-semibold text-base text-foreground">
                  <span>Total (COP)</span><span>{formatCOP(total)}</span>
                </div>
              </div>

              <Link to={`/checkout/${listing.id}`}>
              <Button variant="hero" size="lg" className="w-full mt-5">Solicitar reserva <ChevronRight size={18} /></Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground mt-3">No se cobra hasta que el anfitrión apruebe.</p>
            </div>
          </aside>
        </div>

        {/* Similar */}
        <section className="py-20">
          <h2 className="font-display text-3xl font-semibold mb-8">Locaciones similares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      </div>

      {/* Mobile sticky booking */}
      <div className="lg:hidden fixed bottom-28 inset-x-3 z-40 glass-strong rounded-2xl border-white/10 p-3 flex items-center justify-between gap-3 shadow-float">
        <div className="pl-2">
          <div className="font-semibold text-foreground">{formatCOP(listing.hourlyCop)} <span className="text-xs text-muted-foreground">/h</span></div>
          <div className="text-[10px] text-muted-foreground">min {listing.minHours}h</div>
        </div>
        <Link to={`/checkout/${listing.id}`} className="flex-1"><Button variant="hero" className="w-full">Reservar</Button></Link>
      </div>
    </PageShell>
  );
};

const inp = "mt-1 w-full h-11 px-4 rounded-2xl field-surface text-foreground outline-none";

const Detail = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="p-4 rounded-2xl widget min-w-0">
    <Icon size={16} className="text-cobalt" />
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2 font-semibold">{label}</div>
    <div className="font-semibold text-sm mt-0.5 break-words">{value}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{label}</span><span className="text-foreground">{value}</span></div>
);

const translateDetail = (value: string) => {
  const dictionary: Record<string, string> = {
    Excellent: "Excelente",
    Good: "Buena",
    Controlled: "Controlada",
    Quiet: "Bajo",
    Moderate: "Moderado",
    Lively: "Activo",
  };
  return dictionary[value] || value;
};

export default Listing;
