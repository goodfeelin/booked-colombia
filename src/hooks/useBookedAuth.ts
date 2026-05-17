import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const useBookedAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useBookedAuth debe usarse dentro de AuthProvider.");
  }

  return context;
};

