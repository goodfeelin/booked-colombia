import { Link } from "react-router-dom";
import { ArrowRight, Camera, Film, Music, Sparkles, Shield, Clock, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import medellinImg from "@/assets/city-medellin.jpg";
import bogotaImg from "@/assets/city-bogota.jpg";
import cartagenaImg from "@/assets/city-cartagena.jpg";
import { PageShell } from "@/components/layout/PageShell";
import { SearchBar } from "@/components/SearchBar";
import { ListingCard } from "@/components/ListingCard";
import { LISTINGS } from "@/data/listings";
import { Button } from "@/components/ui/button";

const cityCards = [
  { name: "Medellín", img: medellinImg, count: 142, tag: "Golden hour penthouses" },
  { name: "Bogotá", img: bogotaImg, count: 98, tag: "Concrete & color" },
  { name: "Cartagena", img: cartagenaImg, count: 76, tag: "Colonial heat" },
];

const categories = [
  { label: "Penthouses", icon: "🏙️" }, { label: "Fincas", icon: "🌴" },
  { label: "Rooftops", icon: "🌆" }, { label: "Studios", icon: "📸" },
  { label: "Pools", icon: "💧" }, { label: "Colonial", icon: "🏛️" },
  { label: "Industrial", icon: "🏭" }, { label: "Kitchens", icon: "🍳" },
];

const Index = () => {
  return (
    <PageShell bare>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="Cinematic Medellín penthouse at golden hour" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-background" />
          <div className="absolute inset-0 bg-gradient-glow opacity-60" />
        </div>

        <div className="container-tight pt-32 sm:pt-40 pb-12 flex-1 flex flex-col justify-center text-white">
          <span className="editorial-eyebrow text-white/80 animate-fade-up">Colombia · Premium production locations</span>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] max-w-5xl animate-fade-up" style={{ animationDelay: "80ms" }}>
            Book <em className="italic text-gradient-sunset not-italic font-bold">cinematic</em> spaces<br className="hidden sm:block" /> across Colombia.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl animate-fade-up" style={{ animationDelay: "160ms" }}>
            Premium homes, rooftops, studios, fincas, pools, kitchens and hidden gems for film,
            photography, content and creative productions.
          </p>

          <div className="mt-10 max-w-5xl animate-fade-up" style={{ animationDelay: "240ms" }}>
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Link to="/browse"><Button variant="hero" size="lg">Explore locations <ArrowRight size={18} /></Button></Link>
            <Link to="/host/new"><Button variant="glass" size="lg">List your space</Button></Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80 animate-fade-up" style={{ animationDelay: "420ms" }}>
            <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> 400+ verified spaces</span>
            <span className="inline-flex items-center gap-2"><Shield size={14} className="text-gold" /> Production-grade trust</span>
            <span className="inline-flex items-center gap-2"><MessageCircle size={14} className="text-gold" /> WhatsApp support</span>
          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="container-tight py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="editorial-eyebrow">First-wave cities</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Where the light is best.</h2>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">All cities <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cityCards.map((c, i) => (
            <Link key={c.name} to={`/browse?city=${encodeURIComponent(c.name)}`} className="group relative overflow-hidden rounded-3xl aspect-[4/5] hover-lift">
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

      {/* CATEGORIES */}
      <section className="container-tight pb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.label} to={`/browse?type=${encodeURIComponent(c.label)}`} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border hover:border-foreground hover:-translate-y-0.5 transition-all shadow-soft text-sm font-medium">
              <span>{c.icon}</span>{c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container-tight py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="editorial-eyebrow">Editor's selection</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Handpicked for your next shoot.</h2>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all">View all <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LISTINGS.map((l, i) => <ListingCard key={l.id} listing={l} priority={i < 3} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-foreground text-background py-24 mt-16 rounded-t-[3rem]">
        <div className="container-tight">
          <span className="editorial-eyebrow text-background/60">How Booked works</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold max-w-3xl">From scroll to set in three moves.</h2>
          <div className="mt-14 grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Scout", body: "Search by city, light, crew size, vibe — find spaces no agency has." },
              { n: "02", title: "Request", body: "Pick your hours or full day. Message hosts. Confirm via WhatsApp." },
              { n: "03", title: "Shoot", body: "Show up, plug in, create. Pay safely in COP, soon in crypto." },
            ].map((s) => (
              <div key={s.n} className="p-8 rounded-3xl bg-background/5 border border-background/10 backdrop-blur">
                <span className="font-display text-6xl text-gradient-sunset">{s.n}</span>
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-background/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BOOKED */}
      <section className="container-tight py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="editorial-eyebrow">Why Booked</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Built for Colombia's creative scene.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Not Airbnb. Not a casting agency. A premium marketplace tuned to Colombian producers,
              directors, photographers, content creators and the hosts who love them.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Camera, t: "Production-first details", b: "Light hours, power, ceiling height, crew limits — every spec a DP needs." },
                { icon: Film, t: "Cinematic spaces only", b: "Curated rooftops, fincas, colonial homes, lofts, studios — never generic." },
                { icon: Music, t: "Music video friendly", b: "Hosts who get neon, smoke, fog, late nights and big crews." },
                { icon: Clock, t: "Hourly to full-day", b: "From a 2-hour reel to a week-long campaign — pricing that flexes." },
              ].map((it) => (
                <li key={it.t} className="flex gap-4">
                  <span className="h-11 w-11 inline-flex items-center justify-center rounded-2xl bg-gradient-sunset text-white shrink-0"><it.icon size={18} /></span>
                  <div><p className="font-semibold">{it.t}</p><p className="text-sm text-muted-foreground">{it.b}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-float">
              <img src={medellinImg} alt="Medellín skyline at golden hour" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-3xl p-5 shadow-card max-w-[260px]">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Average host payout</div>
              <div className="font-display text-3xl font-semibold mt-1">+ COP 4,2M</div>
              <div className="text-xs text-muted-foreground mt-1">per month, top 25% hosts</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-gradient-sunset text-white rounded-3xl p-5 shadow-glow-coral max-w-[240px] animate-float-slow">
              <div className="text-xs uppercase tracking-wider opacity-90">Productions hosted</div>
              <div className="font-display text-3xl font-semibold mt-1">2,300+</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOST CTA */}
      <section className="container-tight pb-24">
        <div className="relative overflow-hidden rounded-[3rem] p-10 sm:p-16 bg-gradient-cobalt text-white shadow-glow-cobalt">
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
