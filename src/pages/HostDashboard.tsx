import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { ProductionIntelligence } from "@/components/ProductionIntelligence";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Check, Clock, DollarSign, Eye, Pencil, Plus, Sparkles, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const hostListings = [
  LISTINGS.find((item) => item.id === "laureles-retro-kitchen")!,
  LISTINGS.find((item) => item.id === "rooftop-neon-terrace")!,
  LISTINGS.find((item) => item.id === "tropical-finca-pool")!,
];

const requests = [
  {
    name: "Andres Cortes",
    listing: hostListings[0],
    date: "30 mayo · 9:00 a.m. - 1:00 p.m.",
    crew: 8,
    amount: 1280000,
    status: "Solicitud recibida",
    details: "Food content con cocina activa, 2 luces y micro crew.",
  },
  {
    name: "Mariangel Soto",
    listing: hostListings[2],
    date: "2 junio · Día completo",
    crew: 14,
    amount: 1750000,
    status: "Pendiente aprobacion",
    details: "Campana swimwear, maquillaje en sitio y drone exterior.",
  },
];

const approved = [
  { listing: hostListings[1], name: "Nicolas Mesa", date: "7 junio · 6:00 p.m.", crew: 18, status: "Confirmada" },
  { listing: hostListings[0], name: "Laura Brand Studio", date: "12 junio · 10:00 a.m.", crew: 6, status: "Confirmada" },
];

const listingMeta: Record<string, { earnings: string; next: string; occupancy: string }> = {
  "laureles-retro-kitchen": { earnings: "COP 2.8M", next: "30 mayo · Andres", occupancy: "72%" },
  "rooftop-neon-terrace": { earnings: "COP 5.4M", next: "7 junio · Nicolas", occupancy: "81%" },
  "tropical-finca-pool": { earnings: "COP 6.1M", next: "2 junio · Mariangel", occupancy: "64%" },
};

const HostDashboard = () => {
  return (
    <PageShell>
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="editorial-eyebrow text-coral">Panel anfitrión</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Buenas, Juan.</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">Solicitudes, calendario, payouts mock e inteligencia de producción para operar tus espacios con criterio premium.</p>
          </div>
          <Link to="/host/new"><Button variant="hero"><Plus size={16} /> Publicar espacio</Button></Link>
        </div>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <Stat icon={DollarSign} label="Ingresos mes" value="COP 14.3M" tone="sunset" />
          <Stat icon={Clock} label="Solicitudes" value="2" tone="gold" />
          <Stat icon={BarChart3} label="Ocupacion" value="72%" tone="cobalt" />
          <Stat icon={Eye} label="Mas vista" value="Rooftop" tone="lilac" />
        </section>

        <div className="grid xl:grid-cols-[1fr_0.85fr] gap-6 mb-10">
          <section className="widget overflow-hidden min-w-0">
            <div className="p-5 sm:p-6 border-b border-white/10">
              <h2 className="font-display text-2xl font-semibold">Solicitudes entrantes</h2>
              <p className="text-sm text-muted-foreground mt-1">Acepta o declina con los detalles de producción visibles.</p>
            </div>
            <div className="divide-y divide-white/10">
              {requests.map((request) => (
                <article key={`${request.name}-${request.listing.id}`} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4 min-w-0">
                  <img src={request.listing.image} alt="" className="h-24 w-full md:w-32 object-cover rounded-2xl shrink-0 border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-gold/20 border border-gold/30 text-white font-bold">
                      {request.status}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold truncate">{request.listing.title}</h3>
                    <p className="text-sm text-muted-foreground">{request.name} · {request.date}</p>
                    <p className="text-sm mt-2 break-words">{request.details}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1">Crew {request.crew}</span>
                      <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1">Payout {formatCOP(request.amount)}</span>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none"><X size={14} /> Declinar</Button>
                    <Button variant="hero" size="sm" className="flex-1 md:flex-none"><Check size={14} /> Aceptar</Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] glass-strong p-5 sm:p-6 overflow-hidden min-w-0">
            <ProductionIntelligence
              compact
              title="Preview operativo"
              subtitle="Condiciones mock para tu rooftop con próximo shoot aprobado."
              data={{
                location: "Zona T, Bogotá",
                weather: { label: "Viento suave", tempC: 17 },
                goldenHour: "5:38 - 6:11 p.m.",
                rainRiskPct: 28,
                lightQuality: "Good",
                crewReadyPct: 86,
              }}
            />
          </section>
        </div>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-semibold mb-4">Shoots aprobados</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {approved.map((shoot) => (
              <article key={`${shoot.name}-${shoot.listing.id}`} className="widget p-4 flex gap-3 min-w-0">
                <img src={shoot.listing.image} alt="" className="h-20 w-24 rounded-2xl object-cover shrink-0 border border-white/10" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-cobalt/20 border border-cobalt/30 text-white font-bold">
                    {shoot.status}
                  </span>
                  <p className="font-semibold mt-2 truncate">{shoot.listing.title}</p>
                  <p className="text-sm text-muted-foreground">{shoot.name} · {shoot.date}</p>
                  <p className="text-xs text-muted-foreground">Crew {shoot.crew} · Detalles enviados</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">Mis espacios</h2>
              <p className="text-sm text-muted-foreground">Listings activos con earnings, proxima reserva y ocupacion.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {hostListings.map((listing) => {
              const meta = listingMeta[listing.id];
              return (
                <article key={listing.id} className="rounded-3xl widget overflow-hidden hover-lift min-w-0">
                  <div className="aspect-[16/10] relative">
                    <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-cinema" />
                    <span className="absolute top-3 left-3 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/20">
                      {listing.city}
                    </span>
                  </div>
                  <div className="p-5 min-w-0">
                    <h3 className="font-display text-xl font-semibold leading-tight">{listing.title === "Rooftop Neon Terrace" ? "Medellin Rooftop Neon Terrace" : listing.title}</h3>
                    <p className="text-sm text-muted-foreground">{listing.neighborhood}, {listing.city}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <Mini label="Ingresos" value={meta.earnings} />
                      <Mini label="Proxima" value={meta.next} />
                      <Mini label="Ocupacion" value={meta.occupancy} />
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="glass" size="sm" className="flex-1"><Pencil size={14} /> Editar</Button>
                      <Button variant="glass" size="sm" className="flex-1"><Calendar size={14} /> Calendario</Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid sm:grid-cols-2 gap-4 mt-10">
          <div className="rounded-3xl bg-gradient-cobalt p-6 text-white shadow-glow-cobalt border border-white/15 glossy">
            <Sparkles size={20} />
            <h3 className="font-display text-2xl font-semibold mt-3">Listing mas visto</h3>
            <p className="text-white/80 text-sm mt-1">Rooftop Neon Terrace concentra 38% de vistas y mejor conversion en videos musicales.</p>
          </div>
          <div className="rounded-3xl widget p-6">
            <h3 className="font-display text-2xl font-semibold">Payouts placeholder</h3>
            <p className="text-sm text-muted-foreground mt-1">Bancolombia, Nequi y PSE se mantienen como estados mock hasta integrar backend.</p>
            <Button variant="glass" size="sm" className="mt-4">Configurar pagos</Button>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

const tones: Record<string, string> = {
  sunset: "from-coral/30 to-orange/5 ring-coral/30 text-coral",
  cobalt: "from-cobalt/30 to-cobalt/5 ring-cobalt/30 text-cobalt",
  lilac: "from-lilac/30 to-pink/5 ring-lilac/30 text-lilac",
  gold: "from-gold/30 to-gold/5 ring-gold/30 text-gold",
};

const Stat = ({ icon: Icon, label, value, tone = "cobalt" }: { icon: LucideIcon; label: string; value: string; tone?: keyof typeof tones }) => (
  <div className="p-4 sm:p-5 widget relative overflow-hidden min-w-0">
    <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${tones[tone]}`} />
    <div className="relative">
      <div className={`h-9 w-9 rounded-2xl grid place-items-center bg-white/5 ring-1 ${tones[tone]}`}>
        <Icon size={16} />
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3 font-semibold truncate">{label}</div>
      <div className="font-display text-2xl sm:text-3xl font-semibold mt-0.5 truncate">{value}</div>
    </div>
  </div>
);

const Mini = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 p-2 min-w-0">
    <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold truncate">{label}</div>
    <div className="mt-1 text-xs font-semibold break-words">{value}</div>
  </div>
);

export default HostDashboard;
