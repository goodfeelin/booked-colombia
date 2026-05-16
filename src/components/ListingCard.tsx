import { Link } from "react-router-dom";
import { Heart, Star, Users } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/data/types";
import { formatCOP } from "@/data/listings";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  Verified: "bg-cobalt/25 text-white border-cobalt/40",
  "Instant Request": "bg-gold/25 text-white border-gold/40",
  "Great Natural Light": "bg-coral/25 text-white border-coral/40",
  "Music Video Friendly": "bg-pink/25 text-white border-pink/40",
  "Host Favorite": "bg-lilac/30 text-white border-lilac/50",
  Affordable: "bg-emerald-500/25 text-white border-emerald-400/40",
};

export const ListingCard = ({ listing, priority = false }: { listing: Listing; priority?: boolean }) => {
  const [saved, setSaved] = useState(false);
  return (
    <Link to={`/listing/${listing.id}`} className="group block hover-lift">
      <article className="overflow-hidden rounded-3xl widget border-white/10">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-cinema pointer-events-none" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
            {listing.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md",
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
            className="absolute top-3 right-3 h-10 w-10 rounded-full glass-strong inline-flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart size={16} className={saved ? "fill-coral stroke-coral" : "text-white"} />
          </button>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90 font-medium">{listing.city} · {listing.neighborhood}</span>
              <span className="inline-flex items-center gap-1 glass px-2 py-0.5 rounded-full">
                <Star size={11} className="fill-gold stroke-gold" />
                <span className="font-semibold">{listing.rating}</span>
              </span>
            </div>
            <h3 className="font-display text-xl leading-tight mt-1.5 drop-shadow-lg">{listing.title}</h3>
          </div>
        </div>

          <div className="p-4 flex items-end justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{listing.type}</div>
            <div className="mt-0.5 font-display text-xl font-semibold text-foreground">
              {formatCOP(listing.hourlyCop)}
              <span className="text-xs font-sans font-normal text-muted-foreground"> / h</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-1 shrink-0">
            <Users size={12} /> hasta {listing.maxCrew}
          </div>
        </div>
      </article>
    </Link>
  );
};
