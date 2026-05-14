import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { CITIES, LOCATION_TYPES, AMENITIES } from "@/data/listings";
import { Check, Upload, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["Basics", "Photos", "Production", "Pricing", "Calendar", "Review"];

const HostNew = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    title: "", type: "", city: "", neighborhood: "", address: "",
    crew: "", amenities: [] as string[], rules: "", parking: "", light: "", noise: "",
    hourly: "", minHours: "3", halfDay: "", fullDay: "", cleaning: "", deposit: "",
    days: [] as string[], startTime: "08:00", endTime: "20:00",
  });
  const update = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }));
  const toggle = (k: "amenities" | "days", v: string) => setData((d) => ({
    ...d, [k]: d[k].includes(v) ? d[k].filter((x) => x !== v) : [...d[k], v],
  }));

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const publish = () => toast.success("Listing submitted for review!", { description: "Our team reviews every listing within 24 hours." });

  return (
    <PageShell>
      <div className="container-tight max-w-3xl">
        <span className="editorial-eyebrow">Become a host</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">List your space on Booked.</h1>
        <p className="text-muted-foreground mt-2">Six steps. About 10 minutes. Earn from your first shoot this month.</p>

        {/* Progress */}
        <ol className="flex items-center gap-2 mt-10 mb-8 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <li key={s} className={cn("flex items-center gap-2 text-sm whitespace-nowrap")}>
              <span className={cn("h-7 w-7 inline-flex items-center justify-center rounded-full text-xs font-semibold",
                i < step ? "bg-cobalt text-white" : i === step ? "bg-gradient-sunset text-white shadow-glow-coral" : "bg-secondary text-muted-foreground")}>
                {i < step ? <Check size={14} /> : i + 1}
              </span>
              <span className={cn(i === step ? "font-semibold" : "text-muted-foreground")}>{s}</span>
              {i < STEPS.length - 1 && <span className="w-6 h-px bg-border" />}
            </li>
          ))}
        </ol>

        <div className="rounded-3xl bg-card border border-border p-8 shadow-card">
          {step === 0 && (
            <div className="space-y-5">
              <Field label="Listing title"><input className={inp} placeholder="e.g. El Poblado Glass Penthouse" value={data.title} onChange={(e) => update("title", e.target.value)} /></Field>
              <Field label="Location type"><select className={inp} value={data.type} onChange={(e) => update("type", e.target.value)}><option value="">Select…</option>{LOCATION_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="City"><select className={inp} value={data.city} onChange={(e) => update("city", e.target.value)}><option value="">Select…</option>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
                <Field label="Neighborhood"><input className={inp} placeholder="e.g. Laureles" value={data.neighborhood} onChange={(e) => update("neighborhood", e.target.value)} /></Field>
              </div>
              <Field label="Address (private)"><input className={inp} placeholder="Shared after booking confirmation" value={data.address} onChange={(e) => update("address", e.target.value)} /></Field>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center bg-secondary/40">
                <Upload className="mx-auto mb-3" />
                <p className="font-semibold">Drop your photos here</p>
                <p className="text-sm text-muted-foreground mt-1">Wide, bright, high-resolution shots perform 4× better. Upload 8+ photos.</p>
                <Button variant="outline" className="mt-4">Browse files</Button>
              </div>
              <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2"><Sparkles size={16} className="text-coral mt-0.5" /> Shoot in natural light. No flash.</li>
                <li className="flex gap-2"><Sparkles size={16} className="text-coral mt-0.5" /> Show wide angles, then details.</li>
                <li className="flex gap-2"><Sparkles size={16} className="text-coral mt-0.5" /> Include exterior + every shootable room.</li>
              </ul>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <Field label="Max crew capacity"><input type="number" className={inp} placeholder="e.g. 15" value={data.crew} onChange={(e) => update("crew", e.target.value)} /></Field>
              <Field label="Amenities">
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map((a) => (
                    <button key={a} type="button" onClick={() => toggle("amenities", a)} className={cn("px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                      data.amenities.includes(a) ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-foreground/50")}>{a}</button>
                  ))}
                </div>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Natural light"><select className={inp} value={data.light} onChange={(e) => update("light", e.target.value)}><option>Excellent</option><option>Good</option><option>Controlled</option></select></Field>
                <Field label="Noise level"><select className={inp} value={data.noise} onChange={(e) => update("noise", e.target.value)}><option>Quiet</option><option>Moderate</option><option>Lively</option></select></Field>
              </div>
              <Field label="Parking & loading access"><input className={inp} placeholder="e.g. 4 covered spots + freight elevator" value={data.parking} onChange={(e) => update("parking", e.target.value)} /></Field>
              <Field label="House rules (one per line)"><textarea rows={4} className={cn(inp, "py-3")} value={data.rules} onChange={(e) => update("rules", e.target.value)} /></Field>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Hourly rate (COP)"><input type="number" className={inp} placeholder="e.g. 280000" value={data.hourly} onChange={(e) => update("hourly", e.target.value)} /></Field>
                <Field label="Minimum booking (hours)"><input type="number" className={inp} value={data.minHours} onChange={(e) => update("minHours", e.target.value)} /></Field>
                <Field label="Half-day rate (COP)"><input type="number" className={inp} placeholder="e.g. 1000000" value={data.halfDay} onChange={(e) => update("halfDay", e.target.value)} /></Field>
                <Field label="Full-day rate (COP)"><input type="number" className={inp} placeholder="e.g. 1800000" value={data.fullDay} onChange={(e) => update("fullDay", e.target.value)} /></Field>
                <Field label="Cleaning fee (COP, optional)"><input type="number" className={inp} value={data.cleaning} onChange={(e) => update("cleaning", e.target.value)} /></Field>
                <Field label="Security deposit (COP, optional)"><input type="number" className={inp} value={data.deposit} onChange={(e) => update("deposit", e.target.value)} /></Field>
              </div>
              <div className="rounded-2xl bg-gradient-cream p-4 text-sm">
                <strong>Tip:</strong> Top hosts in {data.city || "Medellín"} earn between COP 2.5M–6M / month. Pricing aggressively in your first month builds reviews fast.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <Field label="Available days">
                <div className="flex flex-wrap gap-2">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
                    <button key={d} type="button" onClick={() => toggle("days", d)} className={cn("h-12 w-12 rounded-2xl text-sm font-semibold border transition-all",
                      data.days.includes(d) ? "bg-gradient-sunset text-white border-transparent" : "bg-card border-border hover:border-foreground/50")}>{d}</button>
                  ))}
                </div>
              </Field>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Earliest start"><input type="time" className={inp} value={data.startTime} onChange={(e) => update("startTime", e.target.value)} /></Field>
                <Field label="Latest end"><input type="time" className={inp} value={data.endTime} onChange={(e) => update("endTime", e.target.value)} /></Field>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">Almost ready.</h2>
              <p className="text-muted-foreground mb-6">Review your listing then publish. Our team approves every listing within 24 hours to keep Booked premium.</p>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <ReviewItem label="Title" value={data.title} />
                <ReviewItem label="Type" value={data.type} />
                <ReviewItem label="City" value={data.city} />
                <ReviewItem label="Neighborhood" value={data.neighborhood} />
                <ReviewItem label="Crew" value={data.crew} />
                <ReviewItem label="Hourly (COP)" value={data.hourly} />
                <ReviewItem label="Amenities" value={data.amenities.join(", ")} />
                <ReviewItem label="Days" value={data.days.join(", ")} />
              </dl>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prev} disabled={step === 0}><ChevronLeft size={16} /> Back</Button>
          {step < STEPS.length - 1
            ? <Button variant="hero" onClick={next}>Continue <ChevronRight size={16} /></Button>
            : <Button variant="hero" onClick={publish}>Submit for review <Sparkles size={16} /></Button>}
        </div>
      </div>
    </PageShell>
  );
};

const inp = "w-full h-11 px-4 rounded-2xl border border-border bg-background outline-none focus:border-foreground transition-colors";
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</span>
    {children}
  </label>
);
const ReviewItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-secondary/50">
    <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
    <dd className="mt-1 font-medium">{value || <span className="text-muted-foreground">—</span>}</dd>
  </div>
);

export default HostNew;
