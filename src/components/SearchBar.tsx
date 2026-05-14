import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Camera, Search } from "lucide-react";
import { CITIES, PRODUCTION_TYPES } from "@/data/listings";
import { Button } from "@/components/ui/button";

export const SearchBar = ({ compact = false }: { compact?: boolean }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [production, setProduction] = useState("");
  const [crew, setCrew] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (production) params.set("production", production);
    if (crew) params.set("crew", crew);
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className={`glass rounded-full shadow-float p-2 grid grid-cols-1 ${compact ? "md:grid-cols-[1.2fr_1fr_1.2fr_0.8fr_auto]" : "md:grid-cols-[1.2fr_1fr_1.3fr_0.9fr_auto]"} gap-1 items-stretch`}>
      <Field icon={<MapPin size={16} />} label="City">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent outline-none w-full text-sm font-medium">
          <option value="">Anywhere in Colombia</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field icon={<Calendar size={16} />} label="Date">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent outline-none w-full text-sm font-medium" />
      </Field>
      <Field icon={<Camera size={16} />} label="Production">
        <select value={production} onChange={(e) => setProduction(e.target.value)} className="bg-transparent outline-none w-full text-sm font-medium">
          <option value="">Any project</option>
          {PRODUCTION_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </Field>
      <Field icon={<Users size={16} />} label="Crew">
        <input type="number" min={1} placeholder="Crew size" value={crew} onChange={(e) => setCrew(e.target.value)} className="bg-transparent outline-none w-full text-sm font-medium placeholder:text-muted-foreground" />
      </Field>
      <Button type="submit" variant="hero" size="lg" className="rounded-full">
        <Search size={18} /> <span className="hidden sm:inline">Search</span>
      </Button>
    </form>
  );
};

const Field = ({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) => (
  <label className="rounded-full px-5 py-2 hover:bg-foreground/5 transition-colors cursor-text flex flex-col justify-center min-w-0">
    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex items-center gap-1.5">{icon}{label}</span>
    <span className="mt-0.5 truncate">{children}</span>
  </label>
);
