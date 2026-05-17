import { LISTINGS } from "@/data/listings";
import type { BookingRequest, Conversation, Favorite, HostProfile, Message, UserProfile } from "./marketplaceTypes";

export const mockUsers: UserProfile[] = [
  {
    id: "user-juan",
    fullName: "Juan Sierra",
    email: "juan@booked.co",
    phone: "+57 300 123 4567",
    city: "Medellín, Colombia",
    avatarUrl: "https://i.pravatar.cc/120?u=Juan%20Sierra",
    roles: ["creador", "anfitrion"],
    verificationStatus: "approved",
    whatsappConnected: true,
    createdAt: "2026-04-12T10:00:00Z",
  },
  {
    id: "user-andres",
    fullName: "Andrés Cortés",
    email: "andres@studio.co",
    city: "Medellín, Colombia",
    roles: ["creador"],
    verificationStatus: "approved",
    whatsappConnected: true,
    createdAt: "2026-04-18T10:00:00Z",
  },
];

export const mockHostProfiles: HostProfile[] = [
  {
    id: "host-juan",
    userId: "user-juan",
    displayName: "Juan Sierra",
    responseTimeMinutes: 42,
    verificationStatus: "approved",
    payoutStatus: "pending",
    bio: "Anfitrión y creador enfocado en locaciones con buena luz, acceso claro y producción seria.",
  },
];

export const mockBookingRequests: BookingRequest[] = [
  {
    id: "booking-poblado-editorial",
    listingId: "poblado-glass-penthouse",
    guestId: "user-juan",
    hostId: "host-mariana",
    date: "2026-05-22",
    startTime: "09:00",
    endTime: "13:00",
    bookingType: "hourly",
    crewSize: 8,
    productionType: "Fotografía",
    purpose: "Campaña de marca",
    messageToHost: "Editorial de moda con dos looks, una mesa de styling y uso de sala durante golden hour.",
    subtotalCop: 1280000,
    feesCop: 154000,
    cleaningFeeCop: 80000,
    totalCop: 1514000,
    status: "Confirmada",
    paymentStatus: "Autorizado",
    createdAt: "2026-05-16T14:00:00Z",
  },
  {
    id: "booking-finca-video",
    listingId: "tropical-finca-pool",
    guestId: "user-juan",
    hostId: "host-sofia",
    date: "2026-06-04",
    startTime: "08:00",
    endTime: "18:00",
    bookingType: "full_day",
    crewSize: 14,
    productionType: "Video musical",
    purpose: "Video musical",
    messageToHost: "Video musical con piscina, drone exterior y maquillaje en sitio. Sin pirotecnia.",
    subtotalCop: 2800000,
    feesCop: 336000,
    cleaningFeeCop: 150000,
    totalCop: 3286000,
    status: "Pendiente de aprobación",
    paymentStatus: "Pendiente",
    createdAt: "2026-05-17T09:00:00Z",
  },
  {
    id: "booking-laureles-food",
    listingId: "laureles-retro-kitchen",
    guestId: "user-andres",
    hostId: "host-juan",
    date: "2026-05-30",
    startTime: "09:00",
    endTime: "13:00",
    bookingType: "hourly",
    crewSize: 8,
    productionType: "Contenido",
    purpose: "Comercial",
    messageToHost: "Food content con cocina activa, dos luces LED, micro crew y movimiento mínimo de mesa.",
    subtotalCop: 720000,
    feesCop: 86000,
    cleaningFeeCop: 50000,
    totalCop: 856000,
    status: "Solicitud enviada",
    paymentStatus: "Pendiente",
    createdAt: "2026-05-17T11:30:00Z",
  },
];

export const mockFavorites: Favorite[] = [
  { id: "fav-1", userId: "user-juan", listingId: "poblado-glass-penthouse", createdAt: "2026-05-10T10:00:00Z" },
  { id: "fav-2", userId: "user-juan", listingId: "cartagena-colonial-villa", createdAt: "2026-05-11T10:00:00Z" },
  { id: "fav-3", userId: "user-juan", listingId: "laureles-retro-kitchen", createdAt: "2026-05-12T10:00:00Z" },
  { id: "fav-4", userId: "user-juan", listingId: "rooftop-neon-terrace", createdAt: "2026-05-13T10:00:00Z" },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv-poblado",
    bookingId: "booking-poblado-editorial",
    listingId: "poblado-glass-penthouse",
    guestId: "user-juan",
    hostId: "host-mariana",
    lastMessagePreview: "La entrada es por portería. Les dejo autorizados desde las 8:40 a.m.",
    unreadCount: 2,
    updatedAt: "2026-05-17T10:32:00Z",
  },
  {
    id: "conv-laureles",
    bookingId: "booking-laureles-food",
    listingId: "laureles-retro-kitchen",
    guestId: "user-andres",
    hostId: "host-juan",
    lastMessagePreview: "Si necesitan mover la mesa, no hay problema. Dejemos registro.",
    unreadCount: 0,
    updatedAt: "2026-05-16T16:00:00Z",
  },
];

export const mockMessages: Message[] = [
  { id: "msg-1", conversationId: "conv-poblado", senderId: "host-mariana", body: "Hola Juan, ya tengo la reserva confirmada para este sábado. Crew de 8, ¿cierto?", createdAt: "2026-05-17T10:03:00Z" },
  { id: "msg-2", conversationId: "conv-poblado", senderId: "user-juan", body: "Sí. Llegamos 8:45 para armar cámara y primera foto a las 9:20.", createdAt: "2026-05-17T10:05:00Z" },
  { id: "msg-3", conversationId: "conv-poblado", senderId: "host-mariana", body: "Perfecto. En portería dejo autorizados a Juan Sierra Producción. Hay 4 parqueaderos cubiertos.", createdAt: "2026-05-17T10:08:00Z" },
  { id: "msg-4", conversationId: "conv-poblado", senderId: "user-juan", body: "¿Podemos mover los sofás cobalt unos 50 cm hacia la ventana?", createdAt: "2026-05-17T10:12:00Z" },
  { id: "msg-5", conversationId: "conv-poblado", senderId: "host-mariana", body: "Sí, con cuidado y sin arrastrar. Hay sliders en el closet de servicio.", createdAt: "2026-05-17T10:14:00Z" },
];

export const findListing = (listingId: string) => LISTINGS.find((listing) => listing.id === listingId) || LISTINGS[0];
