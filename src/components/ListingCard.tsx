import { Link } from "react-router-dom";
import { Heart, Star, Users } from "lucide-react";
import { useState } from "react";
import type { Listing } from "@/data/types";
import { formatCOP } from "@/data/listings";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  Verified: "bg-cobalt/10 text-cobalt border-cobalt/20",
  "Instant Request": "bg-gold/15 text-foreground border-gold/30",
  "Great Natural Light": "bg-coral/10 text-coral border-coral/20",
  "Music Video Friendly": "bg-foreground text-background border-transparent",
  "Host Favorite": "bg-lilac/40 text-foreground border-lilac/40",
};

export const ListingCard = ({ listing, priority = false }: { listing: Listing; priority?: boolean }) => {
  const [saved, setSaved] = useState(false);
  return (
    <Link to={`/listing/${listing.id}`} className="group block hover-lift">
      <article className="overflow-hidden rounded-3xl bg-card shadow-card">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={listing.image}
            alt={listing.title}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-cinema pointer-events-none" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 max-w-[80%]">
            {listing.badges.slice(0, 2).map((b) => (
              <span key={b} className={cn("text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md", badgeStyles[b])}>
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
            aria-label="Save"
            className="absolute top-4 right-4 h-10 w-10 rounded-full glass inline-flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart size={16} className={saved ? "fill-coral stroke-coral" : ""} />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="opacity-90">{listing.city} · {listing.neighborhood}</span>
              <span className="inline-flex items-center gap-1"><Star size={12} className="fill-gold stroke-gold" />{listing.rating}</span>
            </div>
            <h3 className="font-display text-xl leading-tight mt-1 drop-shadow">{listing.title}</h3>
          </div>
        </div>

        <div className="p-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{listing.type}</div>
            <div className="mt-1 font-display text-xl font-semibold">{formatCOP(listing.hourlyCop)} <span className="text-xs font-sans font-normal text-muted-foreground">/ hour</span></div>
          </div>
          <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
            <Users size={12} /> up to {listing.maxCrew}
          </div>
        </div>
      </article>
    </Link>
  );
};
