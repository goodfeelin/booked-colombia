import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemePreference = "system" | "dark" | "light";

type ThemeContextValue = {
  preference: ThemePreference;
  resolvedTheme: "dark" | "light";
  setPreference: (preference: ThemePreference) => void;
};

const THEME_KEY = "booked.theme";

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const getStoredPreference = (): ThemePreference => {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "dark" || stored === "light" || stored === "system" ? stored : "system";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [preference, setPreferenceState] = useState<ThemePreference>(getStoredPreference);
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() =>
    typeof window === "undefined" ? "dark" : getSystemTheme()
  );

  const resolvedTheme = preference === "system" ? systemTheme : preference;

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const update = () => setSystemTheme(query.matches ? "light" : "dark");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("light", resolvedTheme === "light");
    root.dataset.theme = resolvedTheme;
  }, [resolvedTheme]);

  const setPreference = (nextPreference: ThemePreference) => {
    window.localStorage.setItem(THEME_KEY, nextPreference);
    setPreferenceState(nextPreference);
  };

  const value = useMemo(
    () => ({ preference, resolvedTheme, setPreference }),
    [preference, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
