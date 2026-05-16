import { NavLink, Link } from "react-router-dom";
import { Home, Compass, Calendar, Heart, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/browse", label: "Explorar", icon: Compass },
  { to: "/dashboard", label: "Reservas", icon: Calendar },
  { to: "/dashboard?tab=saved", label: "Guardados", icon: Heart },
  { to: "/profile", label: "Perfil", icon: User },
];

export const MobileNav = () => (
  <>
    {/* Floating Host CTA, sits above the bar */}
    <Link
      to="/host/new"
      aria-label="Publicar espacio"
      className="md:hidden fixed bottom-[calc(env(safe-area-inset-bottom)+6.25rem)] right-4 z-[55] h-14 w-14 rounded-full bg-gradient-sunset text-white grid place-items-center shadow-glow-coral border border-white/20 active:scale-95 transition-transform glossy"
    >
      <Plus size={22} strokeWidth={2.5} />
    </Link>

    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-safe pointer-events-none">
      <div className="glass-strong rounded-[28px] px-1.5 py-2 flex items-center justify-between shadow-float pointer-events-auto max-w-full">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              cn(
                "min-w-0 flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-0.5 rounded-2xl transition-all",
                isActive
                  ? "text-white bg-white/10"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <it.icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="max-w-full truncate text-[9px] min-[380px]:text-[10px] font-semibold tracking-tight">
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
