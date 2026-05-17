import { createClient } from "@supabase/supabase-js";
import { getSupabaseStatusMessage, isSupabaseConfigured } from "@/lib/supabaseStatus";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let warnedAboutMockMode = false;

if (!isSupabaseConfigured && import.meta.env.DEV && !warnedAboutMockMode) {
  warnedAboutMockMode = true;
  console.info(getSupabaseStatusMessage());
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export type BookedSupabaseClient = NonNullable<typeof supabase>;

