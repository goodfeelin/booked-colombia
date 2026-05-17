import { supabase } from "@/integrations/supabase/client";
import { mockBookingRequests } from "@/lib/marketplaceMockData";
import type { BookingRequest, BookingStatus } from "@/lib/marketplaceTypes";

export const listBookingsForGuest = async (guestId: string): Promise<BookingRequest[]> => {
  if (!supabase) {
    return mockBookingRequests.filter((booking) => booking.guestId === guestId);
  }

  const { data, error } = await supabase.from("bookings").select("*").eq("guest_id", guestId).order("date", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapBooking);
};

export const listBookingsForHost = async (hostId: string): Promise<BookingRequest[]> => {
  if (!supabase) {
    return mockBookingRequests.filter((booking) => booking.hostId === hostId);
  }

  const { data, error } = await supabase.from("bookings").select("*").eq("host_id", hostId).order("date", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapBooking);
};

export const createBookingRequest = async (booking: BookingRequest): Promise<BookingRequest> => {
  if (!supabase) {
    return booking;
  }

  const { data, error } = await supabase.from("bookings").insert(toBookingRow(booking)).select("*").single();
  if (error) throw error;
  return mapBooking(data);
};

export const updateBookingStatus = async (bookingId: string, status: BookingStatus): Promise<BookingRequest | null> => {
  if (!supabase) {
    const booking = mockBookingRequests.find((item) => item.id === bookingId);
    return booking ? { ...booking, status } : null;
  }

  const { data, error } = await supabase.from("bookings").update({ status }).eq("id", bookingId).select("*").maybeSingle();
  if (error) throw error;
  return data ? mapBooking(data) : null;
};

const mapBooking = (row: Record<string, unknown>): BookingRequest => ({
  id: String(row.id),
  listingId: String(row.location_id),
  guestId: String(row.guest_id),
  hostId: String(row.host_id),
  date: String(row.date),
  startTime: String(row.start_time),
  endTime: String(row.end_time),
  bookingType: String(row.booking_type) as BookingRequest["bookingType"],
  crewSize: Number(row.crew_size || 1),
  productionType: String(row.production_type) as BookingRequest["productionType"],
  purpose: String(row.purpose) as BookingRequest["purpose"],
  messageToHost: String(row.message_to_host || ""),
  subtotalCop: Number(row.subtotal_cop || 0),
  feesCop: Number(row.fees_cop || 0),
  cleaningFeeCop: Number(row.cleaning_fee_cop || 0),
  totalCop: Number(row.total_cop || 0),
  status: String(row.status) as BookingRequest["status"],
  paymentStatus: String(row.payment_status) as BookingRequest["paymentStatus"],
  createdAt: String(row.created_at || ""),
});

const toBookingRow = (booking: BookingRequest) => ({
  id: booking.id,
  location_id: booking.listingId,
  guest_id: booking.guestId,
  host_id: booking.hostId,
  date: booking.date,
  start_time: booking.startTime,
  end_time: booking.endTime,
  booking_type: booking.bookingType,
  crew_size: booking.crewSize,
  production_type: booking.productionType,
  purpose: booking.purpose,
  message_to_host: booking.messageToHost,
  subtotal_cop: booking.subtotalCop,
  fees_cop: booking.feesCop,
  cleaning_fee_cop: booking.cleaningFeeCop,
  total_cop: booking.totalCop,
  status: booking.status,
  payment_status: booking.paymentStatus,
});

