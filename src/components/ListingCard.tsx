import { Link } from "react-router-dom";
import { Heart, Star, Users } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/data/types";
import { formatCOP } from "@/data/listings";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  Verified: "bg-cobalt/35 text-white border-cobalt/55",
  "Instant Request": "bg-gold/35 text-white border-gold/55",
  "Great Natural Light": "bg-coral/35 text-white border-coral/55",
  "Music Video Friendly": "bg-pink/35 text-white border-pink/55",
  "Host Favorite": "bg-lilac/40 text-white border-lilac/60",
  Affordable: "bg-emerald-500/35 text-white border-emerald-400/55",
};

export const ListingCard = ({ listing, priority = false }: { listing: Listing; priority?: boolean }) => {
  const [saved, setSaved] = useState(false);
  return (
    <Link to={`/listing/${listing.id}`} className="group block hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-3xl">
      <article className="overflow-hidden rounded-3xl widget border-white/10 group-hover:border-white/20">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 cinema-overlay-strong pointer-events-none" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[78%]">
            {listing.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md shadow-soft text-on-image",
                  badgeStyles[b] || "bg-white/15 text-white border-white/25"
                )}
              >
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
            aria-label="Guardar"
            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-background/55 backdrop-blur-xl border border-white/20 inline-flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-card"
          >
            <Heart size={16} className={saved ? "fill-coral stroke-coral" : "text-white"} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 text-on-image">
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="opacity-95 font-semibold truncate">{listing.city} · {listing.neighborhood}</span>
              <span className="inline-flex items-center gap-1 bg-background/45 backdrop-blur-md border border-white/18 px-2 py-0.5 rounded-full shrink-0">
                <Star size={11} className="fill-gold stroke-gold" />
                <span className="font-semibold">{listing.rating}</span>
              </span>
            </div>
            <h3 className="font-display text-[1.35rem] leading-tight mt-1.5 drop-shadow-lg text-balance">{listing.title}</h3>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex items-end justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{listing.type}</div>
            <div className="mt-0.5 font-display text-xl font-semibold text-foreground">
              {formatCOP(listing.hourlyCop)}
              <span className="text-xs font-sans font-semibold text-muted-foreground"> / h</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0 rounded-full surface-quiet px-2.5 py-1">
            <Users size={12} /> hasta {listing.maxCrew}
          </div>
        </div>
      </article>
    </Link>
  );
};
