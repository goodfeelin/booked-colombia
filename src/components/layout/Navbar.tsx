import { Link, NavLink } from "react-router-dom";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/browse", label: "Explore" },
  { to: "/dashboard", label: "Bookings" },
  { to: "/messages", label: "Messages" },
  { to: "/host/dashboard", label: "Host" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
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

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/browse" className="md:hidden">
              <Button variant="glass" size="icon" aria-label="Search">
                <Search />
              </Button>
            </Link>
            <Link to="/host/new" className="hidden md:block">
              <Button variant="glass" size="sm">
                <Sparkles size={14} /> List your space
              </Button>
            </Link>
            <Link to="/auth" className="hidden sm:block">
              <Button variant="hero" size="sm">Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
