import { Link } from "react-router-dom";
import { Instagram, Music2, MessageCircle } from "lucide-react";

export const Footer = () => (
  <footer className="mt-32 border-t border-foreground/10 bg-gradient-cream">
    <div className="container-tight py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-sunset shadow-glow-coral">
            <span className="font-display text-white text-lg leading-none">B</span>
          </span>
          <span className="font-display text-2xl font-semibold">Booked</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
          A premium Colombian marketplace for renting cinematic spaces — by the hour or by the day.
        </p>
        <div className="flex gap-3 mt-5">
          <a aria-label="WhatsApp" href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-colors"><MessageCircle size={16} /></a>
          <a aria-label="Instagram" href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-colors"><Instagram size={16} /></a>
          <a aria-label="TikTok" href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground hover:text-background transition-colors"><Music2 size={16} /></a>
        </div>
      </div>

      <FooterCol title="Explore" links={[
        { to: "/browse?city=Medellín", label: "Medellín" },
        { to: "/browse?city=Bogotá", label: "Bogotá" },
        { to: "/browse?city=Cartagena", label: "Cartagena" },
        { to: "/browse", label: "All locations" },
      ]} />
      <FooterCol title="Hosts" links={[
        { to: "/host/new", label: "List your space" },
        { to: "/host/dashboard", label: "Host dashboard" },
        { to: "#", label: "Host guidelines" },
        { to: "#", label: "Verified host program" },
      ]} />
      <FooterCol title="Booked" links={[
        { to: "#", label: "About" },
        { to: "#", label: "Trust & safety" },
        { to: "#", label: "Press" },
        { to: "#", label: "Contact" },
      ]} />
    </div>
    <div className="border-t border-foreground/10">
      <div className="container-tight py-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Booked Colombia. Hecho con ☕ en Medellín.</p>
        <p>Pricing in COP · USD coming soon · Crypto-ready</p>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div>
    <h4 className="font-display text-sm font-semibold mb-4">{title}</h4>
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {links.map((l) => (
        <li key={l.label}><Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link></li>
      ))}
    </ul>
  </div>
);
