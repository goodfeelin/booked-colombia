import { Link, NavLink } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBookedAuth } from "@/hooks/useBookedAuth";

const links = [
  { to: "/browse", label: "Explorar" },
  { to: "/dashboard", label: "Reservas" },
  { to: "/messages", label: "Mensajes" },
  { to: "/host/dashboard", label: "Panel anfitrión" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useBookedAuth();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-tight">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-3 sm:px-5 transition-all duration-500 border border-white/10",
            scrolled ? "glass-strong h-14 shadow-card" : "glass h-16"
          )}
        >
          <Link to="/" className="flex items-center gap-2.5 group pl-2">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-sunset shadow-glow-coral border border-white/20 glossy">
              <span className="font-display text-white text-lg leading-none font-bold">B</span>
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-foreground">Booked</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.22em] text-muted-foreground ml-1">CO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 min-w-0">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/browse" className="md:hidden">
              <Button variant="glass" size="icon" aria-label="Buscar">
                <Search />
              </Button>
            </Link>
            <Link to="/host/new" className="hidden md:block">
              <Button variant="glass" size="sm">
                <Sparkles size={14} /> Publicar espacio
              </Button>
            </Link>
            <Link to={isAuthenticated ? "/profile" : "/auth"} className="hidden sm:block">
              <Button variant="hero" size="sm">{isAuthenticated ? "Perfil" : "Ingresar"}</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
