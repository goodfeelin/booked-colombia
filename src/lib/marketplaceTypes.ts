export type UserRole = "creador" | "anfitrion" | "admin";

export type BookingStatus =
  | "Solicitud enviada"
  | "Pendiente de aprobación"
  | "Confirmada"
  | "Rechazada"
  | "Cancelada"
  | "Completada";

export type PaymentStatus = "No iniciado" | "Pendiente" | "Autorizado" | "Pagado" | "Reembolsado" | "Fallido";

export type ProductionType =
  | "Film"
  | "TV"
  | "Fotografía"
  | "Evento"
  | "Podcast"
  | "Video musical"
  | "Comercial"
  | "Contenido"
  | "Campaña de marca"
  | "Workshop";

export type LocationType =
  | "Apartamento"
  | "Casa"
  | "Penthouse"
  | "Finca"
  | "Piscina"
  | "Rooftop"
  | "Cocina"
  | "Estudio"
  | "Bodega"
  | "Restaurante"
  | "Bar"
  | "Oficina"
  | "Casa colonial"
  | "Loft industrial"
  | "Villa";

export type Amenity =
  | "Luz natural"
  | "Piscina"
  | "Rooftop"
  | "Cocina"
  | "Parqueadero"
  | "Ascensor"
  | "Acceso de carga"
  | "Wi-Fi rápido"
  | "Zona de maquillaje"
  | "Baño"
  | "Aire acondicionado"
  | "Seguridad"
  | "Energía"
  | "Blackout"
  | "Exterior";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  city: string;
  avatarUrl?: string;
  roles: UserRole[];
  verificationStatus: "pending" | "approved" | "rejected" | "retry";
  whatsappConnected: boolean;
  createdAt: string;
}

export interface HostProfile {
  id: string;
  userId: string;
  displayName: string;
  responseTimeMinutes: number;
  verificationStatus: "pending" | "approved" | "rejected" | "retry";
  payoutStatus: "not_configured" | "pending" | "ready";
  bio?: string;
}

export interface ListingPhoto {
  id: string;
  listingId: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface LocationListing {
  id: string;
  hostId: string;
  title: string;
  locationType: LocationType;
  city: string;
  neighborhood: string;
  addressPrivate: string;
  description: string;
  hourlyPriceCop: number;
  halfDayPriceCop: number;
  fullDayPriceCop: number;
  cleaningFeeCop: number;
  securityDepositCop: number;
  minimumHours: number;
  maxCrewSize: number;
  eventCapacity: number;
  productionTypesAllowed: ProductionType[];
  amenities: Amenity[];
  houseRules: string[];
  parkingLoadingInfo: string;
  noiseRestrictions: string;
  elevatorAccess: string;
  naturalLightNotes: string;
  bestLightHours: string;
  powerInternetInfo: string;
  bathroomAccess: string;
  makeupChangingArea: boolean;
  furnitureMovementAllowed: boolean;
  nightShootsAllowed: boolean;
  eventsAllowed: boolean;
  alcoholPolicy: string;
  smokingPolicy: string;
  petsPolicy: string;
  approvalStatus: "draft" | "pending_review" | "approved" | "rejected";
  photos: ListingPhoto[];
}

export interface AvailabilitySlot {
  id: string;
  listingId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "available" | "blocked" | "booked";
  label?: string;
}

export interface BookingRequest {
  id: string;
  listingId: string;
  guestId: string;
  hostId: string;
  date: string;
  startTime: string;
  endTime: string;
  bookingType: "hourly" | "half_day" | "full_day";
  crewSize: number;
  productionType: ProductionType;
  purpose: ProductionType;
  messageToHost: string;
  subtotalCop: number;
  feesCop: number;
  cleaningFeeCop: number;
  totalCop: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface Conversation {
  id: string;
  bookingId: string;
  listingId: string;
  guestId: string;
  hostId: string;
  lastMessagePreview: string;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  listingId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  body: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  listingId: string;
  createdAt: string;
}
