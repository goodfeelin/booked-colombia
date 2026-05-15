import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Camera, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"guest" | "host">("guest");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "signin" ? "Welcome back!" : "Account created!");
    setTimeout(() => navigate(role === "host" ? "/host/dashboard" : "/dashboard"), 800);
  };

  return (
    <PageShell>
      <div className="container-tight max-w-md">
        <div className="text-center">
          <span className="editorial-eyebrow text-coral">Booked Colombia</span>
          <h1 className="mt-2 font-display text-4xl font-semibold">{mode === "signin" ? "Welcome back." : "Join the scene."}</h1>
          <p className="text-muted-foreground mt-2">{mode === "signin" ? "Sign in to scout, save and book spaces." : "Create an account in 30 seconds."}</p>
        </div>

        {mode === "signup" && (
          <div className="mt-6 grid grid-cols-2 gap-2 p-1 glass rounded-full border-white/10">
            {[
              { k: "guest", label: "I'm a creator", icon: Camera },
              { k: "host", label: "I'm a host", icon: Sparkles },
            ].map((r) => (
              <button key={r.k} onClick={() => setRole(r.k as any)} className={cn(
                "py-2.5 rounded-full text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all press",
                role === r.k ? "bg-gradient-cobalt text-white shadow-glow-cobalt glossy" : "text-muted-foreground hover:text-foreground")}>
                <r.icon size={14} /> {r.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="mt-6 rounded-3xl widget p-6 space-y-4">
          {mode === "signup" && <Field icon={Sparkles} placeholder="Full name" type="text" required />}
          <Field icon={Mail} placeholder="Email" type="email" required />
          <Field icon={Lock} placeholder="Password" type="password" required />
          <Button type="submit" variant="hero" size="lg" className="w-full">
            {mode === "signin" ? "Sign in" : "Create account"}
          </Button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex-1 h-px bg-white/10" /> or <span className="flex-1 h-px bg-white/10" />
          </div>
          <Button type="button" variant="glass" className="w-full">Continue with Google</Button>
          <Button type="button" variant="glass" className="w-full">Continue with Apple</Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {mode === "signin" ? "New to Booked? " : "Already have an account? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-foreground hover:underline">
            {mode === "signin" ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
    </PageShell>
  );
};

const Field = ({ icon: Icon, ...props }: { icon: any } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <label className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cobalt transition-colors">
    <Icon size={16} className="text-muted-foreground" />
    <input {...props} className="bg-transparent outline-none w-full text-sm text-foreground placeholder:text-muted-foreground" />
  </label>
);

export default Auth;
