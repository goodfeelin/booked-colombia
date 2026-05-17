const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const getSupabaseStatusMessage = () => {
  if (isSupabaseConfigured) {
    return "Supabase configurado. Booked puede usar datos reales.";
  }

  return "Supabase no está configurado. Booked sigue funcionando en modo mock local.";
};

