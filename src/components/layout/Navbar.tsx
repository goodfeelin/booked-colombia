import { Link, NavLink } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/browse", label: "Explore" },
  { to: "/host/new", label: "Become a host" },
  { to: "/messages", label: "Messages" },
  { to: "/dashboard", label: "Trips" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
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
        scrolled ? "py-3" : "py-5",
      )}
    >
      <div className="container-tight">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-500",
            scrolled ? "glass shadow-card h-14" : "bg-transparent h-16",
          )}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-sunset shadow-glow-coral">
              <span className="font-display text-white text-lg leading-none">B</span>
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">Booked</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-1">CO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    isActive ? "bg-foreground text-background" : "hover:bg-foreground/5",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/browse" className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Search"><Search /></Button>
            </Link>
            <Link to="/auth" className="hidden sm:block">
              <Button variant="hero" size="sm">Sign in</Button>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 glass rounded-3xl p-4 shadow-card animate-fade-up">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn("block px-4 py-3 rounded-2xl font-medium", isActive ? "bg-foreground text-background" : "hover:bg-foreground/5")
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/auth" onClick={() => setOpen(false)} className="block mt-2">
              <Button variant="hero" className="w-full">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
