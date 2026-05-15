import { MapPin, Sun, Cloud, CloudRain, Camera, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type IntelData = {
  location?: string;
  weather?: { label: string; tempC: number };
  goldenHour?: string;
  rainRiskPct?: number;
  lightQuality?: "Excellent" | "Good" | "Soft" | "Harsh";
  crewReadyPct?: number;
};

const defaultData: IntelData = {
  location: "El Poblado, Medellín",
  weather: { label: "Partly cloudy", tempC: 24 },
  goldenHour: "5:42 – 6:24 PM",
  rainRiskPct: 18,
  lightQuality: "Excellent",
  crewReadyPct: 92,
};

export const ProductionIntelligence = ({
  data = defaultData,
  compact = false,
  title = "Production Intelligence",
  subtitle = "Mock data — connects to real weather APIs after launch.",
}: {
  data?: IntelData;
  compact?: boolean;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <section className={cn(compact ? "" : "py-4")}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <span className="editorial-eyebrow text-coral">Smart shoot planning</span>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <Widget tone="cobalt" icon={MapPin} label="Shoot location" value={data.location || "—"} sub="Confirmed" />
        <Widget tone="sunset" icon={Cloud} label="Weather" value={`${data.weather?.tempC ?? 24}°`} sub={data.weather?.label || "—"} />
        <Widget tone="gold" icon={Sun} label="Golden hour" value={data.goldenHour || "—"} sub="42 min window" />
        <Widget tone="lilac" icon={CloudRain} label="Rain risk" value={`${data.rainRiskPct ?? 0}%`} sub={(data.rainRiskPct ?? 0) < 30 ? "Low — proceed" : "Plan a backup"} />
        <Widget tone="coral" icon={Camera} label="Natural light" value={data.lightQuality || "—"} sub="Soft, directional" />
        <Widget tone="cobalt" icon={Users} label="Crew readiness" value={`${data.crewReadyPct ?? 0}%`} sub="Confirmed for call time" />
      </div>
    </section>
  );
};

const tones: Record<string, string> = {
  cobalt: "from-cobalt/30 to-cobalt/5 ring-cobalt/30 text-cobalt",
  sunset: "from-coral/30 to-orange/5 ring-coral/30 text-coral",
  gold: "from-gold/30 to-gold/5 ring-gold/30 text-gold",
  lilac: "from-lilac/30 to-lilac/5 ring-lilac/30 text-lilac",
  coral: "from-pink/30 to-coral/5 ring-pink/30 text-pink",
};

const Widget = ({
  icon: Icon,
  label,
  value,
  sub,
  tone = "cobalt",
}: {
  icon: any;
  label: string;
  value: string;
  sub: string;
  tone?: keyof typeof tones | string;
}) => (
  <div className="widget p-4 sm:p-5 relative overflow-hidden">
    <div className={cn("absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-60 bg-gradient-to-br", tones[tone])} />
    <div className="relative">
      <div className="flex items-center justify-between">
        <div className={cn("h-9 w-9 rounded-2xl grid place-items-center bg-white/5 ring-1", tones[tone])}>
          <Icon size={16} />
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
      </div>
      <div className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-foreground leading-tight">{value}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  </div>
);
