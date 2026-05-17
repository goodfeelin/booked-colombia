import { supabase } from "@/integrations/supabase/client";
import { mockConversations, mockMessages } from "@/lib/marketplaceMockData";
import type { Conversation, Message } from "@/lib/marketplaceTypes";

export const listConversationsForUser = async (userId: string): Promise<Conversation[]> => {
  if (!supabase) {
    return mockConversations.filter((conversation) => conversation.guestId === userId || conversation.hostId === userId);
  }

  const { data, error } = await supabase
    .from("booking_conversations")
    .select("*")
    .or(`guest_id.eq.${userId},host_user_id.eq.${userId}`)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapConversation);
};

export const listMessagesForConversation = async (conversationId: string): Promise<Message[]> => {
  if (!supabase) {
    return mockMessages.filter((message) => message.conversationId === conversationId);
  }

  const { data, error } = await supabase
    .from("booking_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data || []).map(mapMessage);
};

export const sendBookingMessage = async (message: Message): Promise<Message> => {
  if (!supabase) {
    return message;
  }

  const { data, error } = await supabase.from("booking_messages").insert(toMessageRow(message)).select("*").single();
  if (error) throw error;
  return mapMessage(data);
};

const mapConversation = (row: Record<string, unknown>): Conversation => ({
  id: String(row.id),
  bookingId: String(row.booking_id),
  listingId: String(row.location_id),
  guestId: String(row.guest_id),
  hostId: String(row.host_user_id),
  lastMessagePreview: String(row.last_message_preview || ""),
  unreadCount: Number(row.unread_count || 0),
  updatedAt: String(row.updated_at || ""),
});

const mapMessage = (row: Record<string, unknown>): Message => ({
  id: String(row.id),
  conversationId: String(row.conversation_id),
  senderId: String(row.sender_id),
  body: String(row.body || ""),
  createdAt: String(row.created_at || ""),
});

const toMessageRow = (message: Message) => ({
  id: message.id,
  conversation_id: message.conversationId,
  sender_id: message.senderId,
  body: message.body,
});

