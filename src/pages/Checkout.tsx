import { useParams, useNavigate } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP, PRODUCTION_TYPES } from "@/data/listings";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreditCard, Wallet, Bitcoin, Banknote, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = LISTINGS.find((l) => l.id === id) || LISTINGS[0];
  const [duration, setDuration] = useState<"hourly" | "halfDay" | "fullDay">("hourly");
  const [hours, setHours] = useState(listing.minHours);
  const [crew, setCrew] = useState(5);
  const [production, setProduction] = useState(PRODUCTION_TYPES[0]);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("09:00");
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<"card" | "pse" | "nequi" | "crypto">("card");

  const subtotal =
    duration === "hourly" ? listing.hourlyCop * hours :
    duration === "halfDay" ? listing.halfDayCop : listing.fullDayCop;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee + listing.cleaningFeeCop;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Booking request sent!", { description: "The host will respond within 1 hour." });
    setTimeout(() => navigate("/dashboard"), 1200);
  };

  return (
    <PageShell>
      <div className="container-tight">
        <span className="editorial-eyebrow">Checkout</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Confirm your shoot.</h1>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_420px] gap-10 mt-10">
          <div className="space-y-8">
            <Card title="Date & time">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { k: "hourly", label: "Hourly", price: `${formatCOP(listing.hourlyCop)}/h` },
                  { k: "halfDay", label: "Half-day", price: formatCOP(listing.halfDayCop) },
                  { k: "fullDay", label: "Full-day", price: formatCOP(listing.fullDayCop) },
                ].map((o) => (
                  <button type="button" key={o.k} onClick={() => setDuration(o.k as any)} className={cn(
                    "p-4 rounded-2xl border text-left transition-all",
                    duration === o.k ? "bg-foreground text-background border-foreground shadow-soft" : "bg-card border-border hover:border-foreground/50"
                  )}>
                    <div className="text-xs uppercase tracking-wider opacity-70">{o.label}</div>
                    <div className="font-semibold mt-1">{o.price}</div>
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                <Field label="Date"><input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inp} /></Field>
                <Field label="Start"><input type="time" value={start} onChange={(e) => setStart(e.target.value)} className={inp} /></Field>
                {duration === "hourly" && (
                  <Field label={`Hours (min ${listing.minHours})`}><input type="number" min={listing.minHours} value={hours} onChange={(e) => setHours(Math.max(listing.minHours, +e.target.value))} className={inp} /></Field>
                )}
              </div>
            </Card>

            <Card title="Production details">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Production type">
                  <select className={inp} value={production} onChange={(e) => setProduction(e.target.value as any)}>
                    {PRODUCTION_TYPES.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Crew size"><input type="number" min={1} max={listing.maxCrew} value={crew} onChange={(e) => setCrew(+e.target.value)} className={inp} /></Field>
              </div>
              <Field label="Message to host (optional)">
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell the host about your project, references, light requirements…" className={cn(inp, "py-3")} />
              </Field>
            </Card>

            <Card title="Payment method">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { k: "card", label: "Card", icon: CreditCard, available: true },
                  { k: "pse", label: "PSE / Nequi", icon: Banknote, available: false },
                  { k: "nequi", label: "Bancolombia", icon: Wallet, available: false },
                  { k: "crypto", label: "Crypto", icon: Bitcoin, available: false },
                ].map((m) => (
                  <button type="button" key={m.k} onClick={() => m.available && setMethod(m.k as any)} disabled={!m.available} className={cn(
                    "p-4 rounded-2xl border text-left transition-all relative",
                    method === m.k ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-foreground/50",
                    !m.available && "opacity-60 cursor-not-allowed"
                  )}>
                    <m.icon size={18} />
                    <div className="font-medium text-sm mt-2">{m.label}</div>
                    {!m.available && <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full bg-gold text-gold-foreground">Soon</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-cobalt" /> You won't be charged until the host approves your request.</p>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-3xl bg-card border border-border shadow-card overflow-hidden">
              <div className="aspect-[16/10]"><img src={listing.image} alt="" className="h-full w-full object-cover" /></div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">{listing.neighborhood}, {listing.city}</p>
                <div className="border-t border-border my-5" />
                <div className="space-y-2 text-sm">
                  <Row label={duration === "hourly" ? `${formatCOP(listing.hourlyCop)} × ${hours}h` : duration === "halfDay" ? "Half-day" : "Full-day"} value={formatCOP(subtotal)} />
                  <Row label="Cleaning fee" value={formatCOP(listing.cleaningFeeCop)} />
                  <Row label="Booked service fee" value={formatCOP(fee)} />
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between font-display text-xl font-semibold">
                  <span>Total</span><span>{formatCOP(total)}</span>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full mt-5">Request to book</Button>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </PageShell>
  );
};

const inp = "w-full h-11 px-4 rounded-2xl border border-border bg-background outline-none focus:border-foreground transition-colors";
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-3xl bg-card border border-border p-6 shadow-soft">
    <h2 className="font-display text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
    {children}
  </label>
);
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{label}</span><span className="text-foreground">{value}</span></div>
);

export default Checkout;
