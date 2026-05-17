import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type ThemePreference } from "./ThemeProvider";

const options: Array<{ value: ThemePreference; label: string; icon: LucideIcon }> = [
  { value: "system", label: "Sistema", icon: Monitor },
  { value: "dark", label: "Oscuro", icon: Moon },
  { value: "light", label: "Claro", icon: Sun },
];

export const ThemeSelector = () => {
  const { preference, setPreference } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-1.5 rounded-full glass p-1 border-white/10 shadow-inner-glow">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setPreference(option.value)}
          className={cn(
            "min-w-0 rounded-full px-2.5 py-2.5 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all duration-300 press",
            preference === option.value
              ? "bg-gradient-sunset text-white shadow-glow-coral glossy"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
          )}
        >
          <option.icon size={14} />
          <span className="truncate">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
