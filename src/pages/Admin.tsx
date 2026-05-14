import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, FileText, Eye } from "lucide-react";

const Admin = () => {
  return (
    <PageShell>
      <div className="container-tight">
        <span className="editorial-eyebrow">Internal · Admin</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Mission control.</h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          <Stat icon={FileText} label="Pending listings" value="12" />
          <Stat icon={Users} label="Active users" value="3,421" />
          <Stat icon={Eye} label="Bookings this week" value="184" />
          <Stat icon={AlertTriangle} label="Open disputes" value="2" />
        </div>

        <h2 className="font-display text-2xl font-semibold mt-12 mb-4">Listings pending approval</h2>
        <div className="rounded-3xl bg-card border border-border overflow-hidden">
          {LISTINGS.slice(0, 3).map((l) => (
            <div key={l.id} className="flex flex-col md:flex-row md:items-center gap-4 p-5 border-b border-border last:border-0">
              <img src={l.image} className="h-16 w-24 object-cover rounded-2xl" alt="" />
              <div className="flex-1">
                <p className="font-semibold">{l.title}</p>
                <p className="text-sm text-muted-foreground">{l.host.name} · {l.city} · {formatCOP(l.hourlyCop)}/hr</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Reject</Button>
                <Button variant="hero" size="sm">Approve</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {["Users","Bookings","Reports & disputes"].map((t) => (
            <div key={t} className="rounded-3xl bg-secondary/50 border border-border p-6">
              <h3 className="font-display text-lg font-semibold">{t}</h3>
              <p className="text-sm text-muted-foreground mt-1">Coming soon.</p>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
};

const Stat = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="p-5 rounded-3xl bg-card border border-border">
    <Icon size={18} className="text-coral" />
    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-3">{label}</div>
    <div className="font-display text-2xl font-semibold mt-1">{value}</div>
  </div>
);

export default Admin;
