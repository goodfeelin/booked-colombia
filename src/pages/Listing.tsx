import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS, formatCOP } from "@/data/listings";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Star, Users, MapPin, Sun, Volume2, Wifi, Zap, Car, Camera, Heart, Share2, Shield, ChevronRight } from "lucide-react";
import { useState } from "react";

const Listing = () => {
  const { id } = useParams();
  const listing = LISTINGS.find((l) => l.id === id);
  const [hours, setHours] = useState(4);
  const [date, setDate] = useState("");

  if (!listing) {
    return (
      <PageShell>
        <div className="container-tight py-20 text-center">
          <h1 className="font-display text-4xl">Space not found.</h1>
          <Link to="/browse"><Button variant="hero" className="mt-6">Browse all spaces</Button></Link>
        </div>
      </PageShell>
    );
  }

  const subtotal = listing.hourlyCop * hours;
  const fee = Math.round(subtotal * 0.12);
  const total = subtotal + fee + listing.cleaningFeeCop;
  const similar = LISTINGS.filter((l) => l.id !== listing.id).slice(0, 3);

  return (
    <PageShell>
      <div className="container-tight">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <span className="editorial-eyebrow">{listing.type}</span>
            <h1 className="mt-1 font-display text-4xl sm:text-5xl font-semibold">{listing.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Star size={14} className="fill-gold stroke-gold" /> {listing.rating} · {listing.reviewCount} reviews</span>
              <span className="inline-flex items-center gap-1"><MapPin size={14} /> {listing.neighborhood}, {listing.city}</span>
              <span className="inline-flex items-center gap-1"><Users size={14} /> Up to {listing.maxCrew} crew</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Heart size={14} /> Save</Button>
            <Button variant="outline" size="sm"><Share2 size={14} /> Share</Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[60vh] rounded-3xl overflow-hidden">
          <div className="col-span-4 md:col-span-2 row-span-2 relative">
            <img src={listing.gallery[0]} alt={listing.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          {listing.gallery.slice(1, 3).map((g, i) => (
            <div key={i} className="hidden md:block col-span-2 md:col-span-1 row-span-2 relative">
              <img src={g} alt={`${listing.title} ${i + 2}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-10 mt-10">
          <div>
            {/* Host */}
            <div className="flex items-center gap-4 pb-8 border-b border-border">
              <img src={listing.host.avatar} alt={listing.host.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-semibold">Hosted by {listing.host.name}{listing.host.superhost && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-sunset text-white">Superhost</span>}</p>
                <p className="text-sm text-muted-foreground">Verified host · Responds within 1 hour · WhatsApp available</p>
              </div>
            </div>

            {/* Description */}
            <section className="py-8 border-b border-border">
              <p className="text-lg leading-relaxed">{listing.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {listing.styleTags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border">{t}</span>
                ))}
              </div>
            </section>

            {/* Production Details */}
            <section className="py-8 border-b border-border">
              <h2 className="font-display text-2xl font-semibold mb-5">Production details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Detail icon={Sun} label="Natural light" value={listing.details.naturalLight} />
                <Detail icon={Sun} label="Best light hours" value={listing.details.bestLightHours} />
                <Detail icon={Volume2} label="Noise" value={listing.details.noise} />
                <Detail icon={Zap} label="Power" value={listing.details.powerOutlets} />
                <Detail icon={Wifi} label="Internet" value={listing.details.wifi} />
                <Detail icon={Car} label="Parking" value={listing.details.parking} />
                <Detail icon={Users} label="Max crew" value={`${listing.maxCrew}`} />
                <Detail icon={Camera} label="Drone" value={listing.details.drone ? "Allowed" : "Not allowed"} />
                <Detail icon={Camera} label="Night shoots" value={listing.details.nightShoots ? "Allowed" : "Not allowed"} />
              </div>
            </section>

            {/* Amenities */}
            <section className="py-8 border-b border-border">
              <h2 className="font-display text-2xl font-semibold mb-5">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 rounded-full bg-coral" />{a}
                  </div>
                ))}
              </div>
            </section>

            {/* Rules */}
            <section className="py-8 border-b border-border">
              <h2 className="font-display text-2xl font-semibold mb-4">House rules</h2>
              <ul className="space-y-2 text-muted-foreground">
                {listing.rules.map((r) => <li key={r} className="flex gap-2"><Shield size={16} className="text-cobalt mt-0.5 shrink-0" />{r}</li>)}
              </ul>
            </section>

            {/* Map placeholder */}
            <section className="py-8 border-b border-border">
              <h2 className="font-display text-2xl font-semibold mb-4">Where you'll shoot</h2>
              <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-cobalt/10 via-secondary to-coral/10 border border-border flex items-center justify-center text-muted-foreground">
                <span className="inline-flex items-center gap-2"><MapPin size={18} /> {listing.neighborhood}, {listing.city} (map preview)</span>
              </div>
            </section>

            {/* Reviews */}
            <section className="py-8">
              <h2 className="font-display text-2xl font-semibold mb-6"><Star className="inline fill-gold stroke-gold mb-1" size={22} /> {listing.rating} · {listing.reviewCount} reviews</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { n: "Valentina · Music video", q: "Light was unreal at 5pm. Host moved furniture without us asking. 10/10." },
                  { n: "Juanca · Editorial", q: "Cinematic from any angle. Already booked for our next campaign." },
                ].map((r) => (
                  <div key={r.n} className="p-5 rounded-2xl bg-card border border-border">
                    <div className="flex gap-0.5 mb-2">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="fill-gold stroke-gold" />)}</div>
                    <p className="text-sm">"{r.q}"</p>
                    <p className="text-xs text-muted-foreground mt-3">{r.n}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Booking widget */}
          <aside className="lg:sticky lg:top-28 self-start">
            <div className="rounded-3xl bg-card border border-border shadow-card p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold">{formatCOP(listing.hourlyCop)}</span>
                <span className="text-muted-foreground">/ hour</span>
              </div>
              <p className="text-xs text-muted-foreground">Half-day {formatCOP(listing.halfDayCop)} · Full-day {formatCOP(listing.fullDayCop)}</p>

              <div className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Date</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full h-11 px-4 rounded-2xl border border-border bg-background" />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Hours (min {listing.minHours})</span>
                  <input type="number" min={listing.minHours} value={hours} onChange={(e) => setHours(Math.max(listing.minHours, Number(e.target.value)))} className="mt-1 w-full h-11 px-4 rounded-2xl border border-border bg-background" />
                </label>
              </div>

              <div className="mt-5 space-y-2 text-sm">
                <Row label={`${formatCOP(listing.hourlyCop)} × ${hours}h`} value={formatCOP(subtotal)} />
                <Row label="Cleaning fee" value={formatCOP(listing.cleaningFeeCop)} />
                <Row label="Booked service fee (12%)" value={formatCOP(fee)} />
                <div className="border-t border-border pt-3 mt-3 flex justify-between font-semibold text-base">
                  <span>Total (COP)</span><span>{formatCOP(total)}</span>
                </div>
              </div>

              <Link to={`/checkout/${listing.id}`}>
                <Button variant="hero" size="lg" className="w-full mt-5">Request to book <ChevronRight size={18} /></Button>
              </Link>
              <p className="text-center text-xs text-muted-foreground mt-3">You won't be charged until the host approves.</p>
            </div>
          </aside>
        </div>

        {/* Similar */}
        <section className="py-20">
          <h2 className="font-display text-3xl font-semibold mb-8">Similar spaces</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      </div>

      {/* Mobile sticky booking */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border p-3 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold">{formatCOP(listing.hourlyCop)} <span className="text-xs text-muted-foreground">/h</span></div>
          <div className="text-xs text-muted-foreground">min {listing.minHours}h</div>
        </div>
        <Link to={`/checkout/${listing.id}`} className="flex-1"><Button variant="hero" className="w-full">Request to book</Button></Link>
      </div>
    </PageShell>
  );
};

const Detail = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="p-4 rounded-2xl bg-card border border-border">
    <Icon size={16} className="text-cobalt" />
    <div className="text-xs text-muted-foreground mt-2">{label}</div>
    <div className="font-medium text-sm">{value}</div>
  </div>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-muted-foreground"><span>{label}</span><span>{value}</span></div>
);

export default Listing;
