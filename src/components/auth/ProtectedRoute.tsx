import { Navigate, useLocation } from "react-router-dom";
import { useBookedAuth } from "@/hooks/useBookedAuth";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { isAuthenticated, loading } = useBookedAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background bg-gradient-night text-foreground grid place-items-center px-6">
        <div className="rounded-3xl glass-strong p-6 text-center max-w-sm">
          <div className="mx-auto mb-4 h-10 w-10 rounded-2xl bg-gradient-sunset shadow-glow-coral animate-pulse" />
          <p className="font-display text-2xl font-semibold">Cargando perfil...</p>
          <p className="text-sm text-muted-foreground mt-1">Estamos restaurando tu sesión de Booked.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
};
