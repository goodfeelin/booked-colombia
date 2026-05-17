import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, FileText, Eye, ShieldCheck, Flag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const queues = [
  { title: "Aprobación de listings", count: "12", body: "Revisar fotos, reglas, precios, dirección privada y logística." },
  { title: "Verificación de anfitriones", count: "7", body: "Identidad, WhatsApp, payout y señales de confianza reales." },
  { title: "Disputas de reserva", count: "2", body: "Daños, cancelaciones, no-show, uso distinto al declarado." },
  { title: "Reportes", count: "5", body: "Listings, usuarios o mensajes que violan políticas de Booked." },
];

const Admin = () => {
  return (
    <PageShell>
      <div className="container-tight">
        <span className="editorial-eyebrow text-coral">Admin · Booked Trust</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Centro de revisión.</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Placeholder estructurado para mantener calidad del marketplace antes de conectar flujos reales de Supabase.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          <Stat icon={FileText} label="Listings pendientes" value="12" />
          <Stat icon={ShieldCheck} label="Hosts por verificar" value="7" />
          <Stat icon={AlertTriangle} label="Disputas abiertas" value="2" />
          <Stat icon={Flag} label="Reportes activos" value="5" />
        </div>

        <section className="grid md:grid-cols-4 gap-4 mt-10">
          {queues.map((queue) => (
            <article key={queue.title} className="widget p-5">
              <div className="font-display text-4xl font-semibold">{queue.count}</div>
              <h2 className="font-semibold mt-2">{queue.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{queue.body}</p>
            </article>
          ))}
        </section>

        <h2 className="font-display text-2xl font-semibold mt-12 mb-4">Listings pendientes de aprobación</h2>
        <div className="rounded-3xl widget overflow-hidden">
          {LISTINGS.slice(0, 3).map((listing) => (
            <div key={listing.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 border-b border-white/8 last:border-0">
              <img src={listing.image} className="h-20 w-full md:w-28 object-cover rounded-2xl border border-white/10" alt="" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{listing.title}</p>
                <p className="text-sm text-muted-foreground">{listing.host.name} · {listing.city} · {formatCOP(listing.hourlyCop)}/h</p>
                <p className="text-xs text-muted-foreground mt-1">Checklist: fotos, reglas, precio COP, dirección privada, producción y logística.</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Rechazar</Button>
                <Button variant="glass" size="sm"><Eye size={14} /> Ver</Button>
                <Button variant="hero" size="sm">Aprobar</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {["Reported listings", "Reported users", "Booking disputes"].map((title) => (
            <div key={title} className="rounded-3xl widget p-6">
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">Cola mock lista para políticas, evidencia y resolución.</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) => (
  <div className="p-5 widget">
    <Icon size={18} className="text-coral" />
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3 font-semibold">{label}</div>
    <div className="font-display text-2xl font-semibold mt-1">{value}</div>
  </div>
);

export default Admin;
