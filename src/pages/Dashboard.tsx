import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { ProductionIntelligence } from "@/components/ProductionIntelligence";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, User, MapPin } from "lucide-react";

const trips = [
  { id: 1, listing: LISTINGS[0], date: "May 22, 2026", time: "9:00–13:00", status: "Confirmed", production: "Fashion editorial" },
  { id: 2, listing: LISTINGS[5], date: "Jun 4, 2026", time: "Full day", status: "Pending host", production: "Music video" },
];

const Dashboard = () => {
  return (
    <PageShell>
      <div className="container-tight">
        <div className="flex items-center gap-4 mb-10">
          <img src="https://i.pravatar.cc/120?u=guest" alt="Profile" className="h-16 w-16 rounded-full ring-2 ring-white/15" />
          <div>
            <span className="editorial-eyebrow text-coral">Welcome back</span>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Camila García</h1>
          </div>
        </div>

        <Section title="Upcoming bookings" icon={Calendar}>
          <div className="grid sm:grid-cols-2 gap-4">
            {trips.map((t) => (
              <div key={t.id} className="rounded-3xl widget overflow-hidden hover-lift">
                <div className="aspect-[16/9] relative">
                  <img src={t.listing.image} alt={t.listing.title} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-cinema" />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full glass-strong text-white border-white/20">{t.status}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold">{t.listing.title}</h3>
                  <p className="text-sm text-muted-foreground inline-flex items-center gap-1 mt-1"><MapPin size={12} /> {t.listing.neighborhood}, {t.listing.city}</p>
                  <div className="mt-3 text-sm">{t.date} · {t.time}</div>
                  <div className="text-xs text-muted-foreground">{t.production}</div>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/listing/${t.listing.id}`}><Button variant="glass" size="sm">View space</Button></Link>
                    <Link to="/messages"><Button variant="hero" size="sm">Message host</Button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Production intelligence" icon={Calendar}>
          <ProductionIntelligence
            compact
            title="Your next shoot · Saturday May 22"
            subtitle="Live conditions for El Poblado, Medellín — mock data preview."
          />
        </Section>

        <Section title="Saved spaces" icon={Heart}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {LISTINGS.slice(0, 4).map((l) => (
              <Link to={`/listing/${l.id}`} key={l.id} className="group block">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10">
                  <img src={l.image} alt={l.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <p className="text-sm font-medium mt-2 truncate">{l.title}</p>
                <p className="text-xs text-muted-foreground">{formatCOP(l.hourlyCop)} / hr</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section title="Profile" icon={User}>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
            <Info label="Email" value="camila@booked.co" />
            <Info label="Phone / WhatsApp" value="+57 300 123 4567" />
            <Info label="City" value="Medellín" />
            <Info label="Member since" value="2026" />
          </div>
        </Section>
      </div>
    </PageShell>
  );
};

const Section = ({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) => (
  <section className="mb-12">
    <h2 className="font-display text-2xl font-semibold mb-4 inline-flex items-center gap-2"><Icon size={20} className="text-coral" /> {title}</h2>
    {children}
  </section>
);
const Info = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl widget">
    <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
    <div className="font-medium mt-1">{value}</div>
  </div>
);

export default Dashboard;
