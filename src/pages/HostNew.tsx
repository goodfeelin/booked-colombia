import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { CITIES } from "@/data/listings";
import { Check, Upload, ChevronLeft, ChevronRight, Sparkles, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { Amenity, LocationType, ProductionType } from "@/lib/marketplaceTypes";

const STEPS = [
  "Tipo de locación",
  "Información básica",
  "Dirección",
  "Fotos",
  "Descripción",
  "Precios",
  "Disponibilidad",
  "Reglas",
  "Producción",
  "Revisión",
];

const locationTypes: LocationType[] = ["Apartamento", "Casa", "Penthouse", "Finca", "Piscina", "Rooftop", "Cocina", "Estudio", "Bodega", "Casa colonial", "Loft industrial", "Villa"];
const productionTypes: ProductionType[] = ["Film", "TV", "Fotografía", "Evento", "Podcast", "Video musical", "Comercial", "Contenido", "Campaña de marca", "Workshop"];
const amenities: Amenity[] = ["Luz natural", "Piscina", "Rooftop", "Cocina", "Parqueadero", "Ascensor", "Acceso de carga", "Wi-Fi rápido", "Zona de maquillaje", "Baño", "Aire acondicionado", "Seguridad", "Energía", "Blackout", "Exterior"];
const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

type ListingDraft = {
  title: string;
  locationType: LocationType | "";
  city: string;
  neighborhood: string;
  address: string;
  description: string;
  hourlyPriceCop: string;
  halfDayPriceCop: string;
  fullDayPriceCop: string;
  cleaningFeeCop: string;
  securityDepositCop: string;
  minimumHours: string;
  maxCrewSize: string;
  eventCapacity: string;
  productionTypesAllowed: ProductionType[];
  amenities: Amenity[];
  houseRules: string;
  parkingLoadingInfo: string;
  noiseRestrictions: string;
  elevatorAccess: string;
  naturalLightNotes: string;
  bestLightHours: string;
  powerInternetInfo: string;
  bathroomAccess: string;
  makeupChangingArea: boolean;
  furnitureMovementAllowed: boolean;
  nightShootsAllowed: boolean;
  eventsAllowed: boolean;
  alcoholPolicy: string;
  smokingPolicy: string;
  petsPolicy: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
  blockedDates: string;
};

const initialDraft: ListingDraft = {
  title: "Laureles Retro Kitchen House",
  locationType: "Cocina",
  city: "Medellín",
  neighborhood: "Laureles",
  address: "",
  description: "",
  hourlyPriceCop: "180000",
  halfDayPriceCop: "680000",
  fullDayPriceCop: "1200000",
  cleaningFeeCop: "50000",
  securityDepositCop: "300000",
  minimumHours: "2",
  maxCrewSize: "8",
  eventCapacity: "12",
  productionTypesAllowed: ["Fotografía", "Contenido", "Comercial"],
  amenities: ["Cocina", "Luz natural", "Baño", "Wi-Fi rápido", "Energía"],
  houseRules: "No freidoras industriales sin extractor\nRestaurar muebles al finalizar\nNo compartir dirección fuera de Booked",
  parkingLoadingInfo: "Parqueo en calle tranquila, acceso por primer piso.",
  noiseRestrictions: "Barrio residencial, volumen moderado después de 8 p.m.",
  elevatorAccess: "Primer piso, sin ascensor requerido.",
  naturalLightNotes: "Luz suave por ventanales laterales, ideal para food content.",
  bestLightHours: "10:00 a.m. - 2:00 p.m.",
  powerInternetInfo: "110V, 12 tomas, Wi-Fi 200 Mbps.",
  bathroomAccess: "2 baños disponibles para crew.",
  makeupChangingArea: false,
  furnitureMovementAllowed: true,
  nightShootsAllowed: false,
  eventsAllowed: true,
  alcoholPolicy: "Permitido con aprobación previa.",
  smokingPolicy: "No permitido en interiores.",
  petsPolicy: "Mascotas por solicitud.",
  availableDays: ["Lun", "Mar", "Mié", "Jue", "Vie"],
  startTime: "08:00",
  endTime: "20:00",
  blockedDates: "2026-06-01, 2026-06-12",
};

const HostNew = () => {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ListingDraft>(initialDraft);

  const update = <K extends keyof ListingDraft>(key: K, value: ListingDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const toggleArray = <K extends "amenities" | "productionTypesAllowed" | "availableDays">(key: K, value: ListingDraft[K][number]) => {
    setDraft((current) => {
      const values = current[key] as Array<typeof value>;
      return { ...current, [key]: values.includes(value) ? values.filter((item) => item !== value) : [...values, value] };
    });
  };

  const estimatedDaily = useMemo(() => Number(draft.hourlyPriceCop || 0) * Number(draft.minimumHours || 1), [draft.hourlyPriceCop, draft.minimumHours]);
  const next = () => setStep((current) => Math.min(STEPS.length - 1, current + 1));
  const prev = () => setStep((current) => Math.max(0, current - 1));

  const publish = () => {
    toast.success("Espacio enviado a revisión", {
      description: "Tu listing queda como pending_review y listo para conectar a Supabase.",
    });
  };

  return (
    <PageShell>
      <div className="container-tight">
        <div className="max-w-5xl mx-auto">
          <span className="editorial-eyebrow text-coral">Publicar espacio</span>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl font-semibold text-balance">Convierte tu locación en un set rentable.</h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">Onboarding mock, pero estructurado para Supabase: datos privados, producción, logística, disponibilidad y precios en COP.</p>

          <ol className="flex items-center gap-2 mt-10 mb-8 overflow-x-auto no-scrollbar pb-2">
            {STEPS.map((label, index) => (
              <li key={label} className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className={cn("h-8 w-8 inline-flex items-center justify-center rounded-full text-xs font-bold border border-white/10",
                  index < step ? "bg-cobalt text-white" : index === step ? "bg-gradient-sunset text-white shadow-glow-coral glossy" : "glass text-muted-foreground")}>
                  {index < step ? <Check size={14} /> : index + 1}
                </span>
                <span className={cn(index === step ? "font-semibold text-foreground" : "text-muted-foreground")}>{label}</span>
                {index < STEPS.length - 1 && <span className="w-5 h-px bg-white/10" />}
              </li>
            ))}
          </ol>

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <section className="rounded-[2rem] widget p-5 sm:p-7 min-w-0">
              {step === 0 && (
                <Step title="Tipo de locación" copy="Elige el formato principal. Esto ayuda a creadores a comparar espacios sin lenguaje de hotel.">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {locationTypes.map((type) => (
                      <Choice key={type} active={draft.locationType === type} onClick={() => update("locationType", type)}>{type}</Choice>
                    ))}
                  </div>
                </Step>
              )}

              {step === 1 && (
                <Step title="Información básica" copy="Nombre claro, capacidad real y datos que evitan idas y vueltas.">
                  <Field label="Título"><input className={inp} value={draft.title} onChange={(event) => update("title", event.target.value)} /></Field>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Crew máximo"><input type="number" className={inp} value={draft.maxCrewSize} onChange={(event) => update("maxCrewSize", event.target.value)} /></Field>
                    <Field label="Capacidad evento"><input type="number" className={inp} value={draft.eventCapacity} onChange={(event) => update("eventCapacity", event.target.value)} /></Field>
                    <Field label="Horas mínimas"><input type="number" className={inp} value={draft.minimumHours} onChange={(event) => update("minimumHours", event.target.value)} /></Field>
                  </div>
                  <Field label="Tipos de producción permitidos">
                    <div className="flex flex-wrap gap-2">
                      {productionTypes.map((type) => <Pill key={type} active={draft.productionTypesAllowed.includes(type)} onClick={() => toggleArray("productionTypesAllowed", type)}>{type}</Pill>)}
                    </div>
                  </Field>
                </Step>
              )}

              {step === 2 && (
                <Step title="Dirección, ciudad y barrio" copy="La dirección exacta se mantiene privada hasta que la reserva esté confirmada.">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Ciudad"><select className={inp} value={draft.city} onChange={(event) => update("city", event.target.value)}>{CITIES.map((city) => <option key={city}>{city}</option>)}</select></Field>
                    <Field label="Barrio"><input className={inp} value={draft.neighborhood} onChange={(event) => update("neighborhood", event.target.value)} /></Field>
                  </div>
                  <Field label="Dirección privada"><input className={inp} placeholder="Solo visible después de confirmar reserva" value={draft.address} onChange={(event) => update("address", event.target.value)} /></Field>
                </Step>
              )}

              {step === 3 && (
                <Step title="Fotos" copy="Mock de carga por ahora. En Supabase esto será storage + orden visual.">
                  <div className="rounded-3xl border-2 border-dashed border-white/15 p-8 sm:p-12 text-center bg-white/5">
                    <Upload className="mx-auto mb-3" />
                    <p className="font-semibold">Sube mínimo 8 fotos</p>
                    <p className="text-sm text-muted-foreground mt-1">Incluye fachada, acceso, baños, luz natural, detalles y cada área shootable.</p>
                    <Button variant="glass" className="mt-4">Seleccionar archivos</Button>
                  </div>
                </Step>
              )}

              {step === 4 && (
                <Step title="Descripción" copy="Describe la experiencia de producción, no como estadía.">
                  <Field label="Descripción"><textarea rows={6} className={cn(inp, "h-auto py-3")} value={draft.description} placeholder="Qué se puede grabar, qué luz tiene, cómo entra el crew, qué hace especial la locación..." onChange={(event) => update("description", event.target.value)} /></Field>
                  <Field label="Amenidades">
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity) => <Pill key={amenity} active={draft.amenities.includes(amenity)} onClick={() => toggleArray("amenities", amenity)}>{amenity}</Pill>)}
                    </div>
                  </Field>
                </Step>
              )}

              {step === 5 && (
                <Step title="Precios" copy="COP es la fuente de verdad. Crypto puede venir después, pero el precio base siempre queda en pesos.">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Precio por hora COP"><input type="number" className={inp} value={draft.hourlyPriceCop} onChange={(event) => update("hourlyPriceCop", event.target.value)} /></Field>
                    <Field label="Medio día COP"><input type="number" className={inp} value={draft.halfDayPriceCop} onChange={(event) => update("halfDayPriceCop", event.target.value)} /></Field>
                    <Field label="Día completo COP"><input type="number" className={inp} value={draft.fullDayPriceCop} onChange={(event) => update("fullDayPriceCop", event.target.value)} /></Field>
                    <Field label="Limpieza COP"><input type="number" className={inp} value={draft.cleaningFeeCop} onChange={(event) => update("cleaningFeeCop", event.target.value)} /></Field>
                    <Field label="Depósito seguridad COP"><input type="number" className={inp} value={draft.securityDepositCop} onChange={(event) => update("securityDepositCop", event.target.value)} /></Field>
                  </div>
                </Step>
              )}

              {step === 6 && (
                <Step title="Disponibilidad" copy="Estructura simple para fechas disponibles, bloqueadas y ventanas horarias.">
                  <AvailabilityPreview selectedDays={draft.availableDays} />
                  <Field label="Días disponibles">
                    <div className="flex flex-wrap gap-2">
                      {weekDays.map((day) => <Choice key={day} active={draft.availableDays.includes(day)} onClick={() => toggleArray("availableDays", day)}>{day}</Choice>)}
                    </div>
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Hora inicio"><input type="time" className={inp} value={draft.startTime} onChange={(event) => update("startTime", event.target.value)} /></Field>
                    <Field label="Hora fin"><input type="time" className={inp} value={draft.endTime} onChange={(event) => update("endTime", event.target.value)} /></Field>
                  </div>
                  <Field label="Fechas bloqueadas"><input className={inp} value={draft.blockedDates} onChange={(event) => update("blockedDates", event.target.value)} /></Field>
                </Step>
              )}

              {step === 7 && (
                <Step title="Reglas" copy="Reglas claras protegen al anfitrión y al crew.">
                  <Field label="Reglas de la casa"><textarea rows={5} className={cn(inp, "h-auto py-3")} value={draft.houseRules} onChange={(event) => update("houseRules", event.target.value)} /></Field>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Field label="Alcohol"><input className={inp} value={draft.alcoholPolicy} onChange={(event) => update("alcoholPolicy", event.target.value)} /></Field>
                    <Field label="Smoking"><input className={inp} value={draft.smokingPolicy} onChange={(event) => update("smokingPolicy", event.target.value)} /></Field>
                    <Field label="Mascotas"><input className={inp} value={draft.petsPolicy} onChange={(event) => update("petsPolicy", event.target.value)} /></Field>
                  </div>
                </Step>
              )}

              {step === 8 && (
                <Step title="Producción y logística" copy="Detalles que convierten una locación bonita en una locación usable.">
                  <Field label="Parqueo / carga"><input className={inp} value={draft.parkingLoadingInfo} onChange={(event) => update("parkingLoadingInfo", event.target.value)} /></Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Ruido"><input className={inp} value={draft.noiseRestrictions} onChange={(event) => update("noiseRestrictions", event.target.value)} /></Field>
                    <Field label="Ascensor / acceso"><input className={inp} value={draft.elevatorAccess} onChange={(event) => update("elevatorAccess", event.target.value)} /></Field>
                    <Field label="Luz natural"><input className={inp} value={draft.naturalLightNotes} onChange={(event) => update("naturalLightNotes", event.target.value)} /></Field>
                    <Field label="Mejores horas"><input className={inp} value={draft.bestLightHours} onChange={(event) => update("bestLightHours", event.target.value)} /></Field>
                    <Field label="Energía / internet"><input className={inp} value={draft.powerInternetInfo} onChange={(event) => update("powerInternetInfo", event.target.value)} /></Field>
                    <Field label="Baños"><input className={inp} value={draft.bathroomAccess} onChange={(event) => update("bathroomAccess", event.target.value)} /></Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Toggle label="Zona maquillaje/cambio" checked={draft.makeupChangingArea} onChange={(value) => update("makeupChangingArea", value)} />
                    <Toggle label="Permite mover muebles" checked={draft.furnitureMovementAllowed} onChange={(value) => update("furnitureMovementAllowed", value)} />
                    <Toggle label="Shoots nocturnos" checked={draft.nightShootsAllowed} onChange={(value) => update("nightShootsAllowed", value)} />
                    <Toggle label="Eventos permitidos" checked={draft.eventsAllowed} onChange={(value) => update("eventsAllowed", value)} />
                  </div>
                </Step>
              )}

              {step === 9 && (
                <Step title="Revisión final" copy="Así queda el payload mock para enviar a aprobación.">
                  <dl className="grid sm:grid-cols-2 gap-3 text-sm">
                    <ReviewItem label="Título" value={draft.title} />
                    <ReviewItem label="Tipo" value={draft.locationType} />
                    <ReviewItem label="Ciudad" value={draft.city} />
                    <ReviewItem label="Barrio" value={draft.neighborhood} />
                    <ReviewItem label="Precio hora" value={`COP ${Number(draft.hourlyPriceCop || 0).toLocaleString("es-CO")}`} />
                    <ReviewItem label="Crew" value={`${draft.maxCrewSize} personas`} />
                    <ReviewItem label="Producciones" value={draft.productionTypesAllowed.join(", ")} />
                    <ReviewItem label="Disponibilidad" value={`${draft.availableDays.join(", ")} · ${draft.startTime}-${draft.endTime}`} />
                  </dl>
                </Step>
              )}
            </section>

            <aside className="lg:sticky lg:top-28 self-start space-y-4">
              <div className="widget p-5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Estado</div>
                <div className="font-display text-2xl font-semibold mt-1">Borrador local</div>
                <p className="text-sm text-muted-foreground mt-2">Al publicar, pasaría a <span className="text-foreground font-semibold">pending_review</span> para admin.</p>
              </div>
              <div className="rounded-3xl bg-gradient-cobalt p-5 text-white shadow-glow-cobalt glossy">
                <CalendarDays size={20} />
                <h3 className="font-display text-2xl font-semibold mt-3">Precio base</h3>
                <p className="text-white/80 text-sm mt-1">Mínimo estimado: COP {estimatedDaily.toLocaleString("es-CO")}</p>
              </div>
            </aside>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="glass" onClick={prev} disabled={step === 0}><ChevronLeft size={16} /> Atrás</Button>
            {step < STEPS.length - 1
              ? <Button variant="hero" onClick={next}>Continuar <ChevronRight size={16} /></Button>
              : <Button variant="hero" onClick={publish}>Enviar a revisión <Sparkles size={16} /></Button>}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

const inp = "w-full h-11 px-4 rounded-2xl bg-white/5 border border-white/10 text-foreground outline-none focus:border-cobalt transition-colors";

const Step = ({ title, copy, children }: { title: string; copy: string; children: React.ReactNode }) => (
  <div className="space-y-5">
    <div>
      <h2 className="font-display text-3xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{copy}</p>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">{label}</span>
    {children}
  </label>
);

const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} className={cn("px-3 py-1.5 rounded-full text-xs font-semibold border transition-all press",
    active ? "bg-gradient-cobalt text-white border-white/15 glossy" : "glass border-white/10 hover:bg-white/15")}>{children}</button>
);

const Choice = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button type="button" onClick={onClick} className={cn("min-h-12 rounded-2xl px-3 py-2 text-sm font-semibold border transition-all press",
    active ? "bg-gradient-sunset text-white border-white/15 shadow-glow-coral glossy" : "glass border-white/10 hover:bg-white/15")}>{children}</button>
);

const Toggle = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) => (
  <button type="button" onClick={() => onChange(!checked)} className={cn("flex items-center justify-between gap-3 rounded-2xl p-3 border text-sm font-semibold transition-all press",
    checked ? "bg-cobalt/20 border-cobalt/30 text-foreground" : "glass border-white/10 text-muted-foreground")}>
    {label}
    <span className={cn("h-6 w-11 rounded-full p-0.5 transition-all", checked ? "bg-gradient-sunset" : "bg-white/10")}>
      <span className={cn("block h-5 w-5 rounded-full bg-white transition-transform", checked && "translate-x-5")} />
    </span>
  </button>
);

const AvailabilityPreview = ({ selectedDays }: { selectedDays: string[] }) => (
  <div className="grid grid-cols-7 gap-2 rounded-3xl glass p-3">
    {weekDays.map((day, index) => (
      <div key={day} className={cn("rounded-2xl p-2 text-center text-xs border", selectedDays.includes(day) ? "bg-cobalt/20 border-cobalt/30 text-foreground" : "bg-destructive/10 border-destructive/20 text-muted-foreground")}>
        <div className="font-bold">{index + 12}</div>
        <div className="mt-1">{day}</div>
        <div className="mt-1 text-[9px] uppercase tracking-wider">{selectedDays.includes(day) ? "Disponible" : "Bloqueada"}</div>
      </div>
    ))}
  </div>
);

const ReviewItem = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 min-w-0">
    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</dt>
    <dd className="mt-1 font-medium break-words">{value || <span className="text-muted-foreground">Pendiente</span>}</dd>
  </div>
);

export default HostNew;
