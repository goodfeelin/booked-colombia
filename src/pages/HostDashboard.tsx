import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calendar, DollarSign, Eye, Plus } from "lucide-react";

const requests = [
  { name: "Andrés Cortés", listing: LISTINGS[0], date: "May 30, 9–13h", crew: 8, amount: 1280000, status: "Pending" },
  { name: "Mariangel Soto", listing: LISTINGS[2], date: "Jun 2, full day", crew: 14, amount: 1750000, status: "Pending" },
];

const HostDashboard = () => {
  return (
    <PageShell>
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="editorial-eyebrow text-coral">Host dashboard</span>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Buenas, Mariana 👋</h1>
          </div>
          <Link to="/host/new"><Button variant="hero"><Plus size={16} /> New listing</Button></Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          <Stat icon={DollarSign} label="This month" value="COP 4.2M" tone="sunset" />
          <Stat icon={Calendar} label="Upcoming" value="6 shoots" tone="cobalt" />
          <Stat icon={Eye} label="Listing views" value="2,341" tone="lilac" />
          <Stat icon={TrendingUp} label="Conversion" value="8.4%" tone="gold" />
        </div>

        <h2 className="font-display text-2xl font-semibold mb-4">Booking requests</h2>
        <div className="rounded-3xl widget overflow-hidden mb-12">
          {requests.map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-5 border-b border-white/8 last:border-0">
              <img src={r.listing.image} alt="" className="h-20 w-28 object-cover rounded-2xl shrink-0 border border-white/10" />
              <div className="flex-1">
                <p className="font-semibold">{r.listing.title}</p>
                <p className="text-sm text-muted-foreground">{r.name} · {r.date} · crew of {r.crew}</p>
              </div>
              <div className="text-right">
                <div className="font-display text-xl font-semibold">{formatCOP(r.amount)}</div>
                <div className="text-xs text-muted-foreground">{r.status}</div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Decline</Button>
                <Button variant="hero" size="sm">Approve</Button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold mb-4">Your listings</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LISTINGS.slice(0, 3).map((l) => (
            <div key={l.id} className="rounded-3xl widget overflow-hidden hover-lift">
              <div className="aspect-[16/10] relative">
                <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-cinema" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.neighborhood}, {l.city}</p>
                <div className="flex justify-between mt-3 text-sm">
                  <span>{formatCOP(l.hourlyCop)}/hr</span>
                  <span className="inline-flex items-center gap-1 text-coral font-medium">● Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          <div className="rounded-3xl widget p-6">
            <h3 className="font-semibold">Payout settings</h3>
            <p className="text-sm text-muted-foreground mt-1">Bancolombia · Nequi · PSE · Crypto coming soon.</p>
            <Button variant="glass" size="sm" className="mt-4">Configure</Button>
          </div>
          <div className="rounded-3xl widget p-6">
            <h3 className="font-semibold">Listing performance</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed analytics rolling out next month.</p>
            <Button variant="glass" size="sm" className="mt-4">Preview</Button>
          </div>
        </div>
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

const Stat = ({ icon: Icon, label, value, tone = "cobalt" }: { icon: any; label: string; value: string; tone?: keyof typeof tones }) => (
  <div className="p-5 widget relative overflow-hidden">
    <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-60 bg-gradient-to-br ${tones[tone]}`} />
    <div className="relative">
      <div className={`h-9 w-9 rounded-2xl grid place-items-center bg-white/5 ring-1 ${tones[tone]}`}>
        <Icon size={16} />
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-3 font-semibold">{label}</div>
      <div className="font-display text-2xl font-semibold mt-0.5">{value}</div>
    </div>
  </div>
);

export default HostDashboard;
