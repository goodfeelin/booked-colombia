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
            <span className="editorial-eyebrow">Host dashboard</span>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">Buenas, Mariana 👋</h1>
          </div>
          <Link to="/host/new"><Button variant="hero"><Plus size={16} /> New listing</Button></Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Stat icon={DollarSign} label="This month" value="COP 4.2M" tone="bg-gradient-sunset text-white" />
          <Stat icon={Calendar} label="Upcoming" value="6 shoots" />
          <Stat icon={Eye} label="Listing views" value="2,341" />
          <Stat icon={TrendingUp} label="Conversion" value="8.4%" />
        </div>

        <h2 className="font-display text-2xl font-semibold mb-4">Booking requests</h2>
        <div className="rounded-3xl bg-card border border-border overflow-hidden mb-12">
          {requests.map((r, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-5 border-b border-border last:border-0">
              <img src={r.listing.image} alt="" className="h-20 w-28 object-cover rounded-2xl shrink-0" />
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LISTINGS.slice(0, 3).map((l) => (
            <div key={l.id} className="rounded-3xl bg-card border border-border overflow-hidden hover-lift">
              <div className="aspect-[16/10]"><img src={l.image} alt={l.title} className="h-full w-full object-cover" /></div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold">{l.title}</h3>
                <p className="text-sm text-muted-foreground">{l.neighborhood}, {l.city}</p>
                <div className="flex justify-between mt-3 text-sm">
                  <span>{formatCOP(l.hourlyCop)}/hr</span>
                  <span className="inline-flex items-center gap-1 text-coral">● Live</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          <div className="rounded-3xl bg-secondary/50 border border-border p-6">
            <h3 className="font-semibold">Payout settings</h3>
            <p className="text-sm text-muted-foreground mt-1">Bancolombia · Nequi · PSE · Crypto coming soon.</p>
            <Button variant="outline" size="sm" className="mt-4">Configure</Button>
          </div>
          <div className="rounded-3xl bg-secondary/50 border border-border p-6">
            <h3 className="font-semibold">Listing performance</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed analytics rolling out next month.</p>
            <Button variant="outline" size="sm" className="mt-4">Preview</Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

const Stat = ({ icon: Icon, label, value, tone = "bg-card" }: { icon: any; label: string; value: string; tone?: string }) => (
  <div className={`p-5 rounded-3xl border border-border ${tone}`}>
    <Icon size={18} />
    <div className="text-xs uppercase tracking-wider opacity-80 mt-3">{label}</div>
    <div className="font-display text-2xl font-semibold mt-1">{value}</div>
  </div>
);

export default HostDashboard;
