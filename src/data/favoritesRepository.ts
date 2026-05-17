import { supabase } from "@/integrations/supabase/client";
import { mockFavorites } from "@/lib/marketplaceMockData";
import type { Favorite } from "@/lib/marketplaceTypes";

export const listFavoritesForUser = async (userId: string): Promise<Favorite[]> => {
  if (!supabase) {
    return mockFavorites.filter((favorite) => favorite.userId === userId);
  }

  const { data, error } = await supabase.from("favorites").select("*").eq("user_id", userId).order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapFavorite);
};

export const addFavorite = async (userId: string, listingId: string): Promise<Favorite> => {
  const favorite: Favorite = {
    id: crypto.randomUUID(),
    userId,
    listingId,
    createdAt: new Date().toISOString(),
  };

  if (!supabase) {
    return favorite;
  }

  const { data, error } = await supabase.from("favorites").insert(toFavoriteRow(favorite)).select("*").single();
  if (error) throw error;
  return mapFavorite(data);
};

export const removeFavorite = async (userId: string, listingId: string): Promise<void> => {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.from("favorites").delete().eq("user_id", userId).eq("location_id", listingId);
  if (error) throw error;
};

export const toggleFavorite = async (userId: string, listingId: string, saved: boolean): Promise<Favorite | null> => {
  if (saved) {
    await removeFavorite(userId, listingId);
    return null;
  }

  return addFavorite(userId, listingId);
};

const mapFavorite = (row: Record<string, unknown>): Favorite => ({
  id: String(row.id),
  userId: String(row.user_id),
  listingId: String(row.location_id),
  createdAt: String(row.created_at || ""),
});

const toFavoriteRow = (favorite: Favorite) => ({
  id: favorite.id,
  user_id: favorite.userId,
  location_id: favorite.listingId,
});

