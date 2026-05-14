import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { ListingCard } from "@/components/ListingCard";
import { LISTINGS, CITIES, LOCATION_TYPES, AMENITIES, PRODUCTION_TYPES } from "@/data/listings";
import { SlidersHorizontal, Map, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Browse = () => {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  const city = params.get("city") || "";
  const type = params.get("type") || "";
  const production = params.get("production") || "";
  const amenity = params.get("amenity") || "";
  const max = Number(params.get("max") || 0);
  const crew = Number(params.get("crew") || 0);
  const sort = params.get("sort") || "featured";

  const update = (key: string, val: string) => {
    const p = new URLSearchParams(params);
    if (val) p.set(key, val); else p.delete(key);
    setParams(p);
  };

  const filtered = useMemo(() => {
    let r = LISTINGS.filter((l) => {
      if (city && l.city !== city) return false;
      if (type && l.type !== type && !l.styleTags.some(t => t.toLowerCase() === type.toLowerCase()) && !l.amenities.includes(type as never)) return false;
      if (production && !l.productionTypes.includes(production as never)) return false;
      if (amenity && !l.amenities.includes(amenity as never)) return false;
      if (max && l.hourlyCop > max) return false;
      if (crew && l.maxCrew < crew) return false;
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => a.hourlyCop - b.hourlyCop);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.hourlyCop - a.hourlyCop);
    if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [city, type, production, amenity, max, crew, sort]);

  return (
    <PageShell>
      <div className="container-tight">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="editorial-eyebrow">Browse spaces</span>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">
              {city ? city : "All of Colombia"}
            </h1>
            <p className="text-muted-foreground mt-1">{filtered.length} cinematic {filtered.length === 1 ? "space" : "spaces"} available</p>
          </div>
          <div className="flex items-center gap-2">
            <select value={sort} onChange={(e) => update("sort", e.target.value)} className="h-11 px-4 rounded-full border border-border bg-card text-sm font-medium">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
            <Button variant="outline" size="default" onClick={() => setOpen(true)}><SlidersHorizontal size={16} /> Filters</Button>
            <Button variant="ghost" size="default"><Map size={16} /> Map</Button>
          </div>
        </div>

        {/* Quick chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Chip active={!city} onClick={() => update("city", "")}>All cities</Chip>
          {CITIES.map((c) => (
            <Chip key={c} active={city === c} onClick={() => update("city", c)}>{c}</Chip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-card border border-border p-16 text-center">
            <p className="font-display text-3xl">No spaces match those filters.</p>
            <p className="text-muted-foreground mt-2">Try widening your search — Colombia has more to give.</p>
            <Button className="mt-6" variant="hero" onClick={() => setParams(new URLSearchParams())}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
            {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </div>

      {/* Filter drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <aside onClick={(e) => e.stopPropagation()} className="relative w-full sm:max-w-md bg-background h-full overflow-y-auto p-6 shadow-float animate-fade-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold">Filters</h2>
              <button onClick={() => setOpen(false)} className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-foreground/5"><X size={16} /></button>
            </div>
            <FilterGroup label="Location type">
              <div className="flex flex-wrap gap-2">
                {LOCATION_TYPES.map((t) => (
                  <Chip key={t} active={type === t} onClick={() => update("type", type === t ? "" : t)}>{t}</Chip>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup label="Production type">
              <div className="flex flex-wrap gap-2">
                {PRODUCTION_TYPES.map((t) => (
                  <Chip key={t} active={production === t} onClick={() => update("production", production === t ? "" : t)}>{t}</Chip>
                ))}
              </div>
            </FilterGroup>
            <FilterGroup label="Max hourly price (COP)">
              <input type="range" min={100000} max={600000} step={20000} value={max || 600000} onChange={(e) => update("max", e.target.value)} className="w-full accent-coral" />
              <div className="text-sm text-muted-foreground mt-1">Up to ${(max || 600000).toLocaleString("es-CO")} COP</div>
            </FilterGroup>
            <FilterGroup label="Crew size (min)">
              <input type="number" min={1} value={crew || ""} onChange={(e) => update("crew", e.target.value)} className="h-11 w-full px-4 rounded-2xl border border-border bg-card" placeholder="e.g. 10" />
            </FilterGroup>
            <FilterGroup label="Amenities">
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((a) => (
                  <Chip key={a} active={amenity === a} onClick={() => update("amenity", amenity === a ? "" : a)}>{a}</Chip>
                ))}
              </div>
            </FilterGroup>
            <div className="sticky bottom-0 -mx-6 mt-8 px-6 py-4 bg-background border-t border-border flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setParams(new URLSearchParams())}>Clear</Button>
              <Button variant="hero" className="flex-1" onClick={() => setOpen(false)}>Show {filtered.length} spaces</Button>
            </div>
          </aside>
        </div>
      )}
    </PageShell>
  );
};

const Chip = ({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) => (
  <button onClick={onClick} className={cn(
    "px-4 py-2 rounded-full border text-sm font-medium transition-all",
    active ? "bg-foreground text-background border-foreground shadow-soft" : "bg-card border-border hover:border-foreground/50"
  )}>{children}</button>
);

const FilterGroup = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="py-5 border-b border-border last:border-0">
    <h3 className="font-semibold mb-3">{label}</h3>
    {children}
  </div>
);

export default Browse;
