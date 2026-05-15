import { Link } from "react-router-dom";
import { Instagram, Music2, MessageCircle } from "lucide-react";

export const Footer = () => (
  <footer className="mt-24 border-t border-white/8 bg-gradient-night">
    <div className="container-tight py-16 grid gap-12 md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-sunset shadow-glow-coral border border-white/20 glossy">
            <span className="font-display text-white text-lg leading-none font-bold">B</span>
          </span>
          <span className="font-display text-2xl font-semibold">Booked</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-xs">
          A premium Colombian marketplace for renting cinematic spaces — by the hour or by the day. For every production size and every budget.
        </p>
        <div className="flex gap-2 mt-5">
          <Social icon={MessageCircle} label="WhatsApp" />
          <Social icon={Instagram} label="Instagram" />
          <Social icon={Music2} label="TikTok" />
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
    <div className="border-t border-white/8">
      <div className="container-tight py-6 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Booked Colombia. Hecho con ☕ en Medellín.</p>
        <p>COP · USD coming soon · Crypto-ready</p>
      </div>
    </div>
  </footer>
);

const Social = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <a aria-label={label} href="#" className="h-10 w-10 inline-flex items-center justify-center rounded-2xl glass hover:bg-white/15 transition-colors">
    <Icon size={16} />
  </a>
);

const FooterCol = ({ title, links }: { title: string; links: { to: string; label: string }[] }) => (
  <div>
    <h4 className="font-display text-sm font-semibold mb-4 text-foreground">{title}</h4>
    <ul className="space-y-2.5 text-sm text-muted-foreground">
      {links.map((l) => (
        <li key={l.label}><Link to={l.to} className="hover:text-foreground transition-colors">{l.label}</Link></li>
      ))}
    </ul>
  </div>
);
