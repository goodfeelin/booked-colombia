import { supabase } from "@/integrations/supabase/client";
import { LISTINGS } from "@/data/listings";
import type { Listing } from "@/data/types";
import type { AvailabilitySlot, LocationListing } from "@/lib/marketplaceTypes";

export const listPublishedLocations = async (): Promise<Listing[]> => {
  if (!supabase) {
    return LISTINGS;
  }

  const { data, error } = await supabase
    .from("locations")
    .select("*, location_photos(*)")
    .eq("approval_status", "approved")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapLocationRowToListing);
};

export const getLocationById = async (listingId: string): Promise<Listing | null> => {
  if (!supabase) {
    return LISTINGS.find((listing) => listing.id === listingId) || null;
  }

  const { data, error } = await supabase
    .from("locations")
    .select("*, location_photos(*)")
    .eq("id", listingId)
    .maybeSingle();
  if (error) throw error;
  return data ? mapLocationRowToListing(data) : null;
};

export const listHostLocations = async (hostId: string): Promise<LocationListing[]> => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("locations")
    .select("*, location_photos(*)")
    .eq("host_id", hostId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapLocationRow);
};

export const listAvailabilitySlots = async (listingId: string): Promise<AvailabilitySlot[]> => {
  if (!supabase) {
    return [
      { id: "mock-slot-1", listingId, date: "2026-05-22", startTime: "09:00", endTime: "18:00", status: "available", label: "Disponible" },
      { id: "mock-slot-2", listingId, date: "2026-05-23", startTime: "09:00", endTime: "18:00", status: "booked", label: "Reservada" },
      { id: "mock-slot-3", listingId, date: "2026-05-24", startTime: "00:00", endTime: "23:59", status: "blocked", label: "Bloqueada" },
    ];
  }

  const { data, error } = await supabase
    .from("availability_slots")
    .select("*")
    .eq("location_id", listingId)
    .order("date", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapAvailabilitySlot);
};

const mapLocationRowToListing = (row: Record<string, unknown>): Listing => {
  const photos = Array.isArray(row.location_photos) ? row.location_photos as Array<Record<string, unknown>> : [];
  const image = String(photos[0]?.url || "/placeholder.svg");

  return {
    id: String(row.id),
    title: String(row.title || ""),
    city: String(row.city || "Medellín") as Listing["city"],
    neighborhood: String(row.barrio || ""),
    type: String(row.location_type || "Studio") as Listing["type"],
    hourlyCop: Number(row.hourly_price_cop || 0),
    halfDayCop: Number(row.half_day_price_cop || 0),
    fullDayCop: Number(row.full_day_price_cop || 0),
    cleaningFeeCop: Number(row.cleaning_fee_cop || 0),
    minHours: Number(row.minimum_hours || 1),
    maxCrew: Number(row.max_crew_size || 1),
    rating: Number(row.rating_average || 0),
    reviewCount: Number(row.review_count || 0),
    image,
    gallery: photos.map((photo) => String(photo.url || image)),
    badges: ["Verified"],
    amenities: [],
    description: String(row.description || ""),
    rules: Array.isArray(row.house_rules) ? row.house_rules as string[] : [],
    host: { name: "Anfitrión Booked", avatar: "/placeholder.svg", verified: true, superhost: false },
    details: {
      naturalLight: "Good",
      bestLightHours: String(row.best_light_hours || ""),
      noise: "Moderate",
      elevator: Boolean(row.elevator_access),
      parking: String(row.parking_loading_info || ""),
      powerOutlets: String(row.power_internet_info || ""),
      wifi: String(row.power_internet_info || ""),
      bathrooms: Number(row.bathroom_count || 1),
      makeupArea: Boolean(row.makeup_changing_area),
      furnitureMovable: Boolean(row.furniture_movement_allowed),
      nightShoots: Boolean(row.night_shoots_allowed),
      drone: false,
      pets: String(row.pets_policy || "").toLowerCase().includes("permit"),
      smoking: "Outdoor only",
      security: "",
    },
    productionTypes: [],
    styleTags: [],
  };
};

const mapLocationRow = (row: Record<string, unknown>): LocationListing => ({
  id: String(row.id),
  hostId: String(row.host_id),
  title: String(row.title || ""),
  locationType: String(row.location_type || "Estudio") as LocationListing["locationType"],
  city: String(row.city || ""),
  neighborhood: String(row.barrio || ""),
  addressPrivate: String(row.address_private || ""),
  description: String(row.description || ""),
  hourlyPriceCop: Number(row.hourly_price_cop || 0),
  halfDayPriceCop: Number(row.half_day_price_cop || 0),
  fullDayPriceCop: Number(row.full_day_price_cop || 0),
  cleaningFeeCop: Number(row.cleaning_fee_cop || 0),
  securityDepositCop: Number(row.security_deposit_cop || 0),
  minimumHours: Number(row.minimum_hours || 1),
  maxCrewSize: Number(row.max_crew_size || 1),
  eventCapacity: Number(row.event_capacity || 1),
  productionTypesAllowed: Array.isArray(row.production_types_allowed) ? row.production_types_allowed as LocationListing["productionTypesAllowed"] : [],
  amenities: [],
  houseRules: Array.isArray(row.house_rules) ? row.house_rules as string[] : [],
  parkingLoadingInfo: String(row.parking_loading_info || ""),
  noiseRestrictions: String(row.noise_restrictions || ""),
  elevatorAccess: String(row.elevator_access || ""),
  naturalLightNotes: String(row.natural_light_notes || ""),
  bestLightHours: String(row.best_light_hours || ""),
  powerInternetInfo: String(row.power_internet_info || ""),
  bathroomAccess: String(row.bathroom_access || ""),
  makeupChangingArea: Boolean(row.makeup_changing_area),
  furnitureMovementAllowed: Boolean(row.furniture_movement_allowed),
  nightShootsAllowed: Boolean(row.night_shoots_allowed),
  eventsAllowed: Boolean(row.events_allowed),
  alcoholPolicy: String(row.alcohol_policy || ""),
  smokingPolicy: String(row.smoking_policy || ""),
  petsPolicy: String(row.pets_policy || ""),
  approvalStatus: String(row.approval_status || "draft") as LocationListing["approvalStatus"],
  photos: [],
});

const mapAvailabilitySlot = (row: Record<string, unknown>): AvailabilitySlot => ({
  id: String(row.id),
  listingId: String(row.location_id),
  date: String(row.date),
  startTime: String(row.start_time),
  endTime: String(row.end_time),
  status: String(row.status) as AvailabilitySlot["status"],
  label: row.label ? String(row.label) : undefined,
});

