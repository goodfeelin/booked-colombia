import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Camera, Sparkles, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { setMockUser } from "@/lib/mockAuth";
import type { LucideIcon } from "lucide-react";
import type { MockUserRole } from "@/lib/mockAuth";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"guest" | "host">("guest");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMockUser(role);
    toast.success(mode === "signin" ? "Listo, entraste a Booked." : "Cuenta creada.", {
      description: role === "host" ? "Te llevamos al panel de anfitrión." : "Te llevamos a tus reservas.",
    });
    setTimeout(() => navigate(role === "host" ? "/host/dashboard" : "/profile"), 650);
  };

  const continueAsGuest = () => {
    toast("Modo invitado activo", { description: "Puedes explorar y guardar locaciones antes de reservar." });
    navigate("/browse");
  };

  return (
    <PageShell>
      <div className="container-tight">
        <div className="mx-auto w-full max-w-[560px]">
        <div className="text-center max-w-sm mx-auto">
          <span className="editorial-eyebrow text-coral">Booked Colombia</span>
          <h1 className="mt-2 font-display text-4xl font-semibold">{mode === "signin" ? "Vuelve a tu set." : "Entra a la escena."}</h1>
          <p className="text-muted-foreground mt-2">{mode === "signin" ? "Ingresa para reservar, guardar locaciones y coordinar producciones." : "Crea tu cuenta mock y prueba el flujo completo."}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 p-1 glass rounded-full border-white/10">
            {[
              { k: "guest", label: "Creador", icon: Camera },
              { k: "host", label: "Anfitrión", icon: Sparkles },
            ].map((r) => (
              <button key={r.k} onClick={() => setRole(r.k as MockUserRole)} className={cn(
                "min-w-0 py-2.5 px-2 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all press",
                role === r.k ? "bg-gradient-cobalt text-white shadow-glow-cobalt glossy" : "text-muted-foreground hover:text-foreground")}>
                <r.icon size={14} /> {r.label}
              </button>
            ))}
        </div>

        <form onSubmit={submit} className="mt-6 rounded-3xl widget p-6 space-y-4">
          {mode === "signup" && <Field icon={UserRound} placeholder="Nombre completo" type="text" defaultValue="Juan Sierra" required />}
          <Field icon={Mail} placeholder="Correo" type="email" defaultValue="juan@booked.co" required />
          <Field icon={Lock} placeholder="Contraseña" type="password" defaultValue="booked123" required />
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {mode === "signin" ? "Ingresar" : "Crear cuenta"}
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex-1 h-px bg-white/10" /> o <span className="flex-1 h-px bg-white/10" />
          </div>
          <Button type="button" variant="glass" className="w-full" onClick={continueAsGuest}>Continuar como invitado</Button>
          <Button type="button" variant="glass" className="w-full" onClick={() => navigate("/profile")}>Ver perfil mock</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "signin" ? "¿Nuevo en Booked? " : "¿Ya tienes cuenta? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-foreground hover:underline">
            {mode === "signin" ? "Crear cuenta" : "Ingresar"}
          </button>
        </p>
        </div>
      </div>
    </PageShell>
  );
};

const Field = ({ icon: Icon, ...props }: { icon: LucideIcon } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cobalt transition-colors">
    <Icon size={16} className="text-muted-foreground" />
    <input {...props} className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" />
  </label>
);

export default Auth;
