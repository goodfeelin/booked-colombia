import { supabase } from "@/integrations/supabase/client";
import { mockHostProfiles, mockUsers } from "@/lib/marketplaceMockData";
import type { HostProfile, UserProfile } from "@/lib/marketplaceTypes";

export const getProfileById = async (userId: string): Promise<UserProfile | null> => {
  if (!supabase) {
    return mockUsers.find((user) => user.id === userId) || null;
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data ? mapProfile(data) : null;
};

export const getCurrentProfile = async (): Promise<UserProfile | null> => {
  if (!supabase) {
    return mockUsers[0] || null;
  }

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) {
    if (authError) throw authError;
    return null;
  }

  return getProfileById(authData.user.id);
};

export const getHostProfileByUserId = async (userId: string): Promise<HostProfile | null> => {
  if (!supabase) {
    return mockHostProfiles.find((host) => host.userId === userId) || null;
  }

  const { data, error } = await supabase.from("host_profiles").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? mapHostProfile(data) : null;
};

export const upsertProfile = async (profile: UserProfile): Promise<UserProfile> => {
  if (!supabase) {
    return profile;
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert(toProfileRow(profile))
    .select("*")
    .single();
  if (error) throw error;
  return mapProfile(data);
};

const mapProfile = (row: Record<string, unknown>): UserProfile => ({
  id: String(row.id),
  fullName: String(row.full_name || ""),
  email: String(row.email || ""),
  phone: row.whatsapp_number ? String(row.whatsapp_number) : undefined,
  city: String(row.city || ""),
  avatarUrl: row.avatar_url ? String(row.avatar_url) : undefined,
  roles: Array.isArray(row.roles) ? row.roles as UserProfile["roles"] : [String(row.role || "creador") as UserProfile["roles"][number]],
  verificationStatus: row.verification_status as UserProfile["verificationStatus"],
  whatsappConnected: Boolean(row.whatsapp_connected),
  createdAt: String(row.created_at || ""),
});

const mapHostProfile = (row: Record<string, unknown>): HostProfile => ({
  id: String(row.id),
  userId: String(row.user_id),
  displayName: String(row.display_name || ""),
  responseTimeMinutes: Number(row.response_time_minutes || 0),
  verificationStatus: row.verification_status as HostProfile["verificationStatus"],
  payoutStatus: row.payout_status as HostProfile["payoutStatus"],
  bio: row.bio ? String(row.bio) : undefined,
});

const toProfileRow = (profile: UserProfile) => ({
  id: profile.id,
  full_name: profile.fullName,
  username: profile.email.split("@")[0],
  email: profile.email,
  whatsapp_number: profile.phone,
  city: profile.city,
  avatar_url: profile.avatarUrl || null,
  role: profile.roles[0] || "creador",
  verification_status: profile.verificationStatus,
  whatsapp_connected: profile.whatsappConnected,
});
