import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Camera, Users, Wallet, Search } from "lucide-react";
import { CITIES, PRODUCTION_TYPES } from "@/data/listings";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [production, setProduction] = useState("");
  const [crew, setCrew] = useState("");
  const [budget, setBudget] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (production) params.set("production", production);
    if (crew) params.set("crew", crew);
    if (budget) params.set("max", budget);
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="glass-strong rounded-[28px] p-3 sm:p-4 shadow-float w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
        <Field icon={<MapPin size={15} />} label="Locación">
          <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
            <option value="">Cualquier ciudad en Colombia</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field icon={<Calendar size={15} />} label="Fecha">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </Field>
        <Field icon={<Camera size={15} />} label="Producción">
          <select value={production} onChange={(e) => setProduction(e.target.value)} className={selectCls}>
            <option value="">Cualquier proyecto</option>
            {PRODUCTION_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        <Field icon={<Users size={15} />} label="Crew">
          <input type="number" min={1} placeholder="e.g. 8" value={crew} onChange={(e) => setCrew(e.target.value)} className={inputCls} />
        </Field>
        <Field icon={<Wallet size={15} />} label="Presupuesto / h">
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectCls}>
            <option value="">Cualquier presupuesto</option>
            <option value="150000">Menos de $150K COP</option>
            <option value="300000">Menos de $300K COP</option>
            <option value="500000">Menos de $500K COP</option>
            <option value="1000000">Premium $500K+</option>
          </select>
        </Field>
      </div>
      <Button type="submit" variant="hero" size="lg" className="w-full mt-3 h-14 text-base">
        <Search size={18} /> Buscar locaciones
      </Button>
    </form>
  );
};

const inputCls = "bg-transparent outline-none w-full text-sm font-semibold text-foreground placeholder:text-muted-foreground";
const selectCls = inputCls + " appearance-none cursor-pointer";

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <label className="rounded-2xl px-4 py-2.5 bg-white/5 hover:bg-white/8 border border-white/8 transition-colors cursor-text flex flex-col justify-center min-w-0">
    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-1.5 font-semibold">
      {icon}{label}
    </span>
    <span className="mt-0.5 min-w-0 overflow-hidden">{children}</span>
  </label>
);
