import { NavLink, Link } from "react-router-dom";
import { Home, Compass, Calendar, Heart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/browse", label: "Explore", icon: Compass },
  { to: "/dashboard", label: "Bookings", icon: Calendar },
  { to: "/dashboard?tab=saved", label: "Saved", icon: Heart },
  { to: "/auth", label: "Profile", icon: User },
];

export const MobileNav = () => (
  <>
    {/* Floating Host CTA, sits above the bar */}
    <Link
      to="/host/new"
      aria-label="List your space"
      className="md:hidden fixed bottom-24 right-5 z-[55] h-14 w-14 rounded-full bg-gradient-sunset text-white grid place-items-center shadow-glow-coral border border-white/20 active:scale-95 transition-transform glossy"
    >
      <Plus size={22} strokeWidth={2.5} />
    </Link>

    <nav className="md:hidden fixed bottom-3 inset-x-3 z-50 pb-safe">
      <div className="glass-strong rounded-[28px] px-2 py-2 flex items-center justify-between shadow-float">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all",
                isActive
                  ? "text-white bg-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <it.icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="text-[10px] font-semibold tracking-tight">
                  {it.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  </>
);
