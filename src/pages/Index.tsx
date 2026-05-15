import { Link } from "react-router-dom";
import { ArrowRight, Camera, Film, Music, Sparkles, Shield, Clock, Wallet } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import medellinImg from "@/assets/city-medellin.jpg";
import bogotaImg from "@/assets/city-bogota.jpg";
import cartagenaImg from "@/assets/city-cartagena.jpg";
import { PageShell } from "@/components/layout/PageShell";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { ProductionIntelligence } from "@/components/ProductionIntelligence";
import { LISTINGS } from "@/data/listings";
import { Button } from "@/components/ui/button";

const cityCards = [
  { name: "Medellín", img: medellinImg, count: 142, tag: "Golden hour penthouses" },
  { name: "Bogotá", img: bogotaImg, count: 98, tag: "Concrete & color" },
  { name: "Cartagena", img: cartagenaImg, count: 76, tag: "Colonial heat" },
];

const categories = [
  { label: "All Spaces", icon: "✨" },
  { label: "Apartment", icon: "🏙️" },
  { label: "Rooftop", icon: "🌆" },
  { label: "Studio", icon: "📸" },
  { label: "Finca", icon: "🌴" },
  { label: "Pool", icon: "💧" },
  { label: "Kitchen", icon: "🍳" },
  { label: "Warehouse", icon: "🏭" },
  { label: "Colonial house", icon: "🏛️" },
  { label: "Penthouse", icon: "🌇" },
];

const Index = () => {
  return (
    <PageShell bare>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Cinematic Medellín penthouse at golden hour" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background" />
          <div className="absolute inset-0 bg-gradient-glow opacity-80" />
        </div>

        <div className="container-tight pt-28 sm:pt-36 pb-12 flex-1 flex flex-col justify-center">
          <span className="editorial-eyebrow text-coral animate-fade-up">Colombia · Cinematic production locations</span>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] max-w-5xl animate-fade-up" style={{ animationDelay: "80ms" }}>
            Book <em className="italic text-gradient-sunset not-italic font-bold">cinematic</em> spaces<br className="hidden sm:block" /> across Colombia.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-up" style={{ animationDelay: "160ms" }}>
            Premium homes, rooftops, studios, fincas, pools, kitchens and hidden gems for every production size and budget — film, photo, music, content, brand campaigns.
          </p>

          <div className="mt-10 max-w-5xl animate-fade-up" style={{ animationDelay: "240ms" }}>
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Link to="/browse"><Button variant="hero" size="lg">Explore locations <ArrowRight size={18} /></Button></Link>
            <Link to="/host/new"><Button variant="glass" size="lg"><Sparkles size={16} /> List your space</Button></Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "420ms" }}>
            <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> 400+ verified spaces</span>
            <span className="inline-flex items-center gap-2"><Wallet size={14} className="text-coral" /> Every budget — from $75K to premium</span>
            <span className="inline-flex items-center gap-2"><Shield size={14} className="text-cobalt" /> Production-grade trust</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-tight py-10">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.label === "All Spaces" ? "/browse" : `/browse?type=${encodeURIComponent(c.label)}`}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass border-white/10 hover:bg-white/15 hover:-translate-y-0.5 transition-all text-sm font-medium press"
            >
              <span className="text-base">{c.icon}</span>{c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section className="container-tight pt-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="editorial-eyebrow">First-wave cities</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Where the light is best.</h2>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all text-muted-foreground hover:text-foreground">
            All cities <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cityCards.map((c, i) => (
            <Link
              key={c.name}
              to={`/browse?city=${encodeURIComponent(c.name)}`}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] hover-lift border border-white/10"
            >
              <img src={c.img} alt={`${c.name}, Colombia`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-cinema" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <span className="editorial-eyebrow text-white/70">0{i + 1}</span>
                <h3 className="font-display text-3xl font-semibold mt-1">{c.name}</h3>
                <p className="text-sm text-white/80">{c.count} spaces · {c.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container-tight py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="editorial-eyebrow">Editor's selection</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Handpicked for your next shoot.</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">Affordable indie spaces, mid-range creative homes and premium luxury locations — all in one place.</p>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all text-muted-foreground hover:text-foreground">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LISTINGS.slice(0, 6).map((l, i) => <ListingCard key={l.id} listing={l} priority={i < 3} />)}
        </div>
      </section>

      {/* PRODUCTION INTELLIGENCE FEATURE SHOWCASE */}
      <section className="container-tight py-16">
        <div className="rounded-[2rem] glass-strong p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50 pointer-events-none" />
          <div className="relative">
            <div className="max-w-2xl mb-6">
              <span className="editorial-eyebrow text-coral">Coming with every booking</span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold leading-tight">Plan every shoot like a pro.</h2>
              <p className="mt-3 text-muted-foreground">
                After you book, Booked unlocks shoot-day intelligence — weather, golden hour, rain risk, light quality and crew readiness — right inside your booking. Apple-style widgets, zero spreadsheets.
              </p>
            </div>
            <ProductionIntelligence compact title="Live shoot dashboard" subtitle="Preview using mock data — real weather + sun APIs roll out at launch." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-foreground text-background py-20 mt-12 rounded-t-[3rem]">
        <div className="container-tight">
          <span className="editorial-eyebrow text-background/60">How Booked works</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold max-w-3xl">From scroll to set in three moves.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Scout", body: "Search by city, light, crew size, vibe, budget — find spaces no agency has." },
              { n: "02", title: "Request", body: "Pick your hours or full day. Message hosts. Confirm via WhatsApp." },
              { n: "03", title: "Shoot", body: "Show up, plug in, create. Pay safely in COP, soon in crypto." },
            ].map((s) => (
              <div key={s.n} className="p-7 rounded-3xl bg-background/5 border border-background/10 backdrop-blur">
                <span className="font-display text-6xl text-gradient-sunset">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-background/70 text-sm">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BOOKED */}
      <section className="container-tight py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="editorial-eyebrow">Why Booked</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Built for Colombia's creative scene.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Not Airbnb. Not a casting agency. A premium marketplace tuned to Colombian producers, directors, photographers, students, influencers, agencies and the hosts who love them.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Camera, t: "Production-first details", b: "Light hours, power, ceiling height, crew limits — every spec a DP needs." },
                { icon: Film, t: "Cinematic spaces only", b: "Curated rooftops, fincas, colonial homes, lofts, studios — never generic." },
                { icon: Music, t: "Music video friendly", b: "Hosts who get neon, smoke, fog, late nights and big crews." },
                { icon: Clock, t: "Hourly to full-day", b: "From a 2-hour reel to a week-long campaign — pricing that flexes." },
              ].map((it) => (
                <li key={it.t} className="flex gap-4">
                  <span className="h-11 w-11 inline-flex items-center justify-center rounded-2xl bg-gradient-sunset text-white shrink-0 shadow-glow-coral border border-white/15 glossy">
                    <it.icon size={18} />
                  </span>
                  <div>
                    <p className="font-semibold">{it.t}</p>
                    <p className="text-sm text-muted-foreground">{it.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-float border border-white/10">
              <img src={medellinImg} alt="Medellín skyline at golden hour" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 widget p-5 max-w-[260px]">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Average host payout</div>
              <div className="font-display text-3xl font-semibold mt-1">+ COP 4.2M</div>
              <div className="text-xs text-muted-foreground mt-1">per month, top 25% hosts</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-sunset text-white rounded-3xl p-5 shadow-glow-coral max-w-[240px] animate-float-slow border border-white/20 glossy">
              <div className="text-xs uppercase tracking-wider opacity-90">Productions hosted</div>
              <div className="font-display text-3xl font-semibold mt-1">2,300+</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOST CTA */}
      <section className="container-tight pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14 bg-gradient-cobalt text-white shadow-glow-cobalt border border-white/15 glossy">
          <div className="absolute inset-0 bg-gradient-glow opacity-70 pointer-events-none" />
          <div className="relative max-w-2xl">
            <span className="editorial-eyebrow text-white/70">For hosts</span>
            <h2 className="mt-2 font-display text-4xl sm:text-6xl font-semibold leading-[1]">Your space, on every set in Colombia.</h2>
            <p className="mt-5 text-white/85 text-lg">List your apartment, rooftop, finca, kitchen, studio or hidden gem. We bring the productions, the protections, and the payouts.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/host/new"><Button variant="gold" size="lg">List your space <ArrowRight size={18} /></Button></Link>
              <Link to="/host/dashboard"><Button variant="glass" size="lg">Host dashboard</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
