import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Camera, Sparkles, UserRound, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { LucideIcon } from "lucide-react";
import type { MockUserRole } from "@/lib/mockAuth";
import { useBookedAuth } from "@/hooks/useBookedAuth";

type AuthAlert = {
  title: string;
  body: string;
};

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, loading, isMockMode } = useBookedAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"guest" | "host">("guest");
  const [fullName, setFullName] = useState("Juan Sierra");
  const [email, setEmail] = useState("juan@booked.co");
  const [password, setPassword] = useState("booked123");
  const [submitting, setSubmitting] = useState(false);
  const [authAlert, setAuthAlert] = useState<AuthAlert | null>(null);
  const returnTo = (location.state as { from?: string } | null)?.from;

  const submit = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAuthAlert(null);
    try {
      if (mode === "signin") {
        await signIn({ email, password, roleType: role });
        toast.success(isMockMode ? "Modo mock activo." : "Bienvenido de nuevo.", {
          description: role === "host" ? "Te llevamos al panel de anfitrión." : "Te llevamos a tu perfil.",
        });
      } else {
        const result = await signUp({ email, password, fullName, roleType: role });
        if (result.profileCreated) {
          toast.success(isMockMode ? "Cuenta mock creada." : "Cuenta creada correctamente.", {
            description: role === "host" ? "Puedes publicar tu primera locación." : "Tu perfil de creador quedó listo.",
          });
        } else {
          setAuthAlert({
            title: "Cuenta creada, falta completar tu perfil",
            body: "Tu acceso quedó activo, pero Supabase no dejó guardar el perfil todavía. Puedes continuar y completarlo desde Perfil.",
          });
          toast.success("Cuenta creada correctamente.", {
            description: "Tu perfil se podrá completar desde Booked.",
          });
        }
      }

      const target = returnTo || (role === "host" ? (mode === "signup" ? "/host/new" : "/host/dashboard") : "/profile");
      navigate(target, { replace: true });
    } catch (error) {
      setAuthAlert(toAuthAlert(error, mode));
    } finally {
      setSubmitting(false);
    }
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
          <p className="text-muted-foreground mt-2">{mode === "signin" ? "Ingresa para reservar, guardar locaciones y coordinar producciones." : "Crea tu cuenta y deja listo tu perfil de creador."}</p>
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

        {authAlert && (
          <div className="mt-4 rounded-3xl border border-destructive/35 bg-destructive/12 px-4 py-3 text-left shadow-card backdrop-blur-xl">
            <p className="text-sm font-semibold text-foreground">{authAlert.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{authAlert.body}</p>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 rounded-3xl widget p-6 space-y-4">
          {mode === "signup" && <Field icon={UserRound} placeholder="Nombre completo" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} required />}
          <Field icon={Mail} placeholder="Correo" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Field icon={Lock} placeholder="Contraseña" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting || loading} onClick={submit}>
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {mode === "signin" ? "Ingresar" : "Crear cuenta"}
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex-1 h-px bg-white/10" /> o <span className="flex-1 h-px bg-white/10" />
          </div>
          <Button type="button" variant="glass" className="w-full" onClick={continueAsGuest}>Continuar como invitado</Button>
          {isMockMode && <Button type="button" variant="glass" className="w-full" onClick={() => navigate("/profile")}>Ver perfil mock</Button>}
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "signin" ? "¿Nuevo en Booked? " : "¿Ya tienes cuenta? "}
          <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setAuthAlert(null); }} className="font-semibold text-foreground hover:underline">
            {mode === "signin" ? "Crear cuenta" : "Ingresar"}
          </button>
        </p>
        </div>
      </div>
    </PageShell>
  );
};

const toAuthAlert = (error: unknown, mode: "signin" | "signup"): AuthAlert => {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login") || normalized.includes("invalid credentials")) {
    return {
      title: "Correo o contraseña inválidos",
      body: "Revisa tus datos e inténtalo otra vez.",
    };
  }
  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return {
      title: "Este correo ya tiene una cuenta",
      body: "Ingresa con tu contraseña o usa otro correo para crear una cuenta nueva.",
    };
  }
  if (normalized.includes("password")) {
    return {
      title: "La contraseña no cumple los requisitos",
      body: "Usa una contraseña más segura e inténtalo otra vez.",
    };
  }
  if (normalized.includes("profile") || normalized.includes("profiles")) {
    return {
      title: "Cuenta creada, falta completar tu perfil",
      body: "Tu acceso quedó activo, pero falta ajustar la tabla de perfiles en Supabase.",
    };
  }

  return mode === "signup"
    ? {
        title: "No se pudo crear la cuenta",
        body: "Ocurrió un error al crear tu cuenta. Revisa los datos e inténtalo otra vez.",
      }
    : {
        title: "No se pudo iniciar sesión",
        body: "Ocurrió un error al entrar. Revisa los datos e inténtalo otra vez.",
      };
};

const Field = ({ icon: Icon, ...props }: { icon: LucideIcon } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="flex items-center gap-3 h-12 px-4 rounded-2xl field-surface">
    <Icon size={16} className="text-muted-foreground" />
    <input {...props} className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" />
  </label>
);

export default Auth;
