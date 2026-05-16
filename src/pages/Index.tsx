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
  { name: "Medellín", img: medellinImg, count: 142, tag: "Penthouses de golden hour" },
  { name: "Bogotá", img: bogotaImg, count: 98, tag: "Concreto y color" },
  { name: "Cartagena", img: cartagenaImg, count: 76, tag: "Casas coloniales" },
];

const categories = [
  { label: "Todas", icon: "✨" },
  { label: "Apartamentos", icon: "🏙️" },
  { label: "Rooftops", icon: "🌆" },
  { label: "Estudios", icon: "📸" },
  { label: "Finca", icon: "🌴" },
  { label: "Piscinas", icon: "💧" },
  { label: "Cocinas", icon: "🍳" },
  { label: "Bodegas", icon: "🏭" },
  { label: "Coloniales", icon: "🏛️" },
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
          <span className="editorial-eyebrow text-coral animate-fade-up">Colombia · Locaciones cinematográficas</span>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl md:text-8xl font-semibold leading-[0.95] max-w-5xl animate-fade-up" style={{ animationDelay: "80ms" }}>
            Book <em className="italic text-gradient-sunset not-italic font-bold">cinematic</em> spaces<br className="hidden sm:block" /> across Colombia.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "160ms" }}>
            Locaciones premium para foto, video, música, contenido y campañas de marca.
          </p>

          <div className="mt-10 max-w-5xl animate-fade-up" style={{ animationDelay: "240ms" }}>
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "320ms" }}>
            <Link to="/browse"><Button variant="hero" size="lg">Explorar locaciones <ArrowRight size={18} /></Button></Link>
            <Link to="/host/new"><Button variant="glass" size="lg"><Sparkles size={16} /> Publicar espacio</Button></Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground animate-fade-up" style={{ animationDelay: "420ms" }}>
            <span className="inline-flex items-center gap-2"><Sparkles size={14} className="text-gold" /> 400+ espacios verificados</span>
            <span className="inline-flex items-center gap-2"><Wallet size={14} className="text-coral" /> Desde $75K COP/h</span>
            <span className="inline-flex items-center gap-2"><Shield size={14} className="text-cobalt" /> Para todo tipo de producción</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-tight py-10">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((c) => (
            <Link
              key={c.label}
              to={c.label === "Todas" ? "/browse" : "/browse"}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass border-white/10 hover:bg-white/15 hover:-translate-y-0.5 transition-all text-sm font-medium press"
            >
              <span className="text-base">{c.icon}</span>{c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* CITIES */}
      <section className="container-tight pt-8 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="editorial-eyebrow">Ciudades de lanzamiento</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Donde la luz trabaja contigo.</h2>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all text-muted-foreground hover:text-foreground">
            Todas las ciudades <ArrowRight size={14} />
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
                <p className="text-sm text-white/80">{c.count} locaciones · {c.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="container-tight py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="editorial-eyebrow">Selección Booked</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Curadas para tu próximo rodaje.</h2>
            <p className="text-muted-foreground mt-2 max-w-xl">Espacios indie, casas creativas y locaciones de lujo en una sola grilla.</p>
          </div>
          <Link to="/browse" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all text-muted-foreground hover:text-foreground">
            Ver todas <ArrowRight size={14} />
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
              <span className="editorial-eyebrow text-coral">Con cada reserva</span>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold leading-tight">Inteligencia de producción.</h2>
              <p className="mt-3 text-muted-foreground">
                Clima, golden hour, riesgo de lluvia, calidad de luz y condiciones del set en widgets claros para planear mejor cada shoot.
              </p>
            </div>
            <ProductionIntelligence compact title="Panel de producción" subtitle="Preview con datos mock; APIs reales en una siguiente fase." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-foreground text-background py-20 mt-12 rounded-t-[3rem]">
        <div className="container-tight">
          <span className="editorial-eyebrow text-background/60">Cómo funciona Booked</span>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold max-w-3xl">Del scouting al set en tres pasos.</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Explora", body: "Busca por ciudad, luz, crew, estilo y presupuesto sin caer en el swipe." },
              { n: "02", title: "Reserva", body: "Elige horas o día completo, envía detalles y coordina dentro de Booked." },
              { n: "03", title: "Crea", body: "Llega al set con instrucciones claras, pagos seguros y soporte de producción." },
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
            <span className="editorial-eyebrow">Por qué Booked</span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Hecho para la escena creativa colombiana.</h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              No es Airbnb. No es una agencia. Es un marketplace premium para productores, fotógrafos, directores, creadores, agencias y anfitriones que entienden un set.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Camera, t: "Detalles de producción", b: "Horas de luz, energía, crew máximo y reglas claras desde el inicio." },
                { icon: Film, t: "Locaciones cinematográficas", b: "Rooftops, fincas, casas coloniales, lofts y estudios con punto de vista." },
                { icon: Music, t: "Music video friendly", b: "Anfitriones que entienden neon, humo, noches largas y crews grandes." },
                { icon: Clock, t: "Por horas o día completo", b: "Desde un reel de dos horas hasta una campaña de varios días." },
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
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Ingreso anfitrión promedio</div>
              <div className="font-display text-3xl font-semibold mt-1">+ COP 4.2M</div>
              <div className="text-xs text-muted-foreground mt-1">mensual, top 25% anfitriones</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-gradient-sunset text-white rounded-3xl p-5 shadow-glow-coral max-w-[240px] animate-float-slow border border-white/20 glossy">
              <div className="text-xs uppercase tracking-wider opacity-90">Producciones recibidas</div>
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
            <span className="editorial-eyebrow text-white/70">Para anfitriones</span>
            <h2 className="mt-2 font-display text-4xl sm:text-6xl font-semibold leading-[1]">Tu espacio, en el próximo set de Colombia.</h2>
            <p className="mt-5 text-white/85 text-lg">Publica tu apartamento, rooftop, finca, cocina, estudio o joya escondida. Booked trae producciones, protecciones y pagos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/host/new"><Button variant="gold" size="lg">Publicar espacio <ArrowRight size={18} /></Button></Link>
              <Link to="/host/dashboard"><Button variant="glass" size="lg">Panel anfitrión</Button></Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Index;
