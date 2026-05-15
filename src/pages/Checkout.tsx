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
        <span className="editorial-eyebrow text-coral">Checkout</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Confirm your shoot.</h1>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_420px] gap-8 mt-10">
          <div className="space-y-6">
            <Card title="Date & time">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: "hourly", label: "Hourly", price: `${formatCOP(listing.hourlyCop)}/h` },
                  { k: "halfDay", label: "Half-day", price: formatCOP(listing.halfDayCop) },
                  { k: "fullDay", label: "Full-day", price: formatCOP(listing.fullDayCop) },
                ].map((o) => (
                  <button type="button" key={o.k} onClick={() => setDuration(o.k as any)} className={cn(
                    "p-4 rounded-2xl border text-left transition-all press",
                    duration === o.k
                      ? "bg-gradient-cobalt text-white border-white/15 shadow-glow-cobalt glossy"
                      : "glass border-white/10 hover:bg-white/15"
                  )}>
                    <div className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">{o.label}</div>
                    <div className="font-semibold mt-1 text-sm">{o.price}</div>
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
                <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell the host about your project, references, light requirements…" className={cn(inp, "py-3 h-auto")} />
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
                    "p-4 rounded-2xl border text-left transition-all relative press",
                    method === m.k
                      ? "bg-gradient-sunset text-white border-white/15 shadow-glow-coral glossy"
                      : "glass border-white/10 hover:bg-white/15",
                    !m.available && "opacity-60 cursor-not-allowed hover:bg-white/5"
                  )}>
                    <m.icon size={18} />
                    <div className="font-medium text-sm mt-2">{m.label}</div>
                    {!m.available && <span className="absolute top-2 right-2 text-[9px] px-1.5 py-0.5 rounded-full bg-gold text-gold-foreground font-bold">Soon</span>}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-cobalt" /> You won't be charged until the host approves your request.</p>
            </Card>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-3xl widget overflow-hidden">
              <div className="aspect-[16/10] relative">
                <img src={listing.image} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-cinema" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{listing.title}</h3>
                <p className="text-sm text-muted-foreground">{listing.neighborhood}, {listing.city}</p>
                <div className="border-t border-white/10 my-5" />
                <div className="space-y-2 text-sm">
                  <Row label={duration === "hourly" ? `${formatCOP(listing.hourlyCop)} × ${hours}h` : duration === "halfDay" ? "Half-day" : "Full-day"} value={formatCOP(subtotal)} />
                  <Row label="Cleaning fee" value={formatCOP(listing.cleaningFeeCop)} />
                  <Row label="Booked service fee" value={formatCOP(fee)} />
                </div>
                <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-display text-xl font-semibold">
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

const inp = "w-full h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-foreground outline-none focus:border-cobalt transition-colors";
const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-3xl widget p-6">
    <h2 className="font-display text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
);
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">{label}</span>
    {children}
  </label>
);
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{label}</span><span className="text-foreground">{value}</span></div>
);

export default Checkout;
