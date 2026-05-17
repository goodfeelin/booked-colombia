import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { findListing, mockBookingRequests, mockConversations, mockMessages } from "@/lib/marketplaceMockData";
import { CalendarClock, Clock, MapPin, Navigation, Search, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const conversations = mockConversations.map((conversation) => {
  const booking = mockBookingRequests.find((item) => item.id === conversation.bookingId) || mockBookingRequests[0];
  const listing = findListing(conversation.listingId);
  return {
    ...conversation,
    booking,
    person: booking.hostId === "host-juan" ? "Andrés Cortés" : listing.host.name,
    role: booking.hostId === "host-juan" ? "Creador" : "Anfitrión",
    avatar: listing.host.avatar,
    listing,
    status: booking.status,
    preview: conversation.lastMessagePreview,
    time: new Date(conversation.updatedAt).toLocaleDateString("es-CO", { month: "short", day: "numeric" }),
    unread: conversation.unreadCount > 0,
  };
});

const messages = mockMessages
  .filter((message) => message.conversationId === conversations[0].id)
  .map((message) => ({
    from: message.senderId === "user-juan" ? "me" : "host",
    text: message.body,
    meta: new Date(message.createdAt).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
  }));

const quickActions = [
  { label: "Confirmar llegada", icon: Navigation },
  { label: "Compartir direccion", icon: MapPin },
  { label: "Ver reserva", icon: ShieldCheck },
  { label: "Cambiar horario", icon: Clock },
  { label: "Enviar detalles", icon: CalendarClock },
];

const statusTone: Record<string, string> = {
  "Solicitud recibida": "bg-gold/20 border-gold/30",
  Confirmada: "bg-cobalt/20 border-cobalt/30",
  Completada: "bg-emerald-500/20 border-emerald-400/30",
  Cancelada: "bg-destructive/20 border-destructive/30",
};

const Messages = () => {
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [text, setText] = useState("");
  const [thread, setThread] = useState(messages);
  const active = useMemo(() => conversations.find((item) => item.id === activeId) || conversations[0], [activeId]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setThread([...thread, { from: "me", text: text.trim(), meta: "Ahora" }]);
    setText("");
  };

  return (
    <PageShell>
      <div className="container-tight">
        <div className="mb-6">
          <span className="editorial-eyebrow text-coral">Mensajes</span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-semibold">Coordinación de producción.</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">Conversaciones dentro de Booked para parking, luces, acceso, llegada, mobiliario y setup.</p>
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-4 min-h-[72vh] rounded-[2rem] widget overflow-hidden">
          <aside className="border-b lg:border-b-0 lg:border-r border-white/10 min-w-0">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 px-3 h-11 rounded-full field-surface">
                <Search size={14} className="text-muted-foreground shrink-0" />
                <input placeholder="Buscar mensajes" className="bg-transparent outline-none text-sm w-full min-w-0" />
              </div>
            </div>
            <div className="max-h-[34vh] lg:max-h-[calc(72vh-77px)] overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActiveId(conversation.id)}
                  className={cn(
                    "w-full text-left p-4 flex gap-3 border-b border-white/8 hover:bg-white/5 transition-colors min-w-0",
                    active.id === conversation.id && "bg-white/8"
                  )}
                >
                  <div className="relative shrink-0">
                    <img src={conversation.avatar} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/15" />
                    <img src={conversation.listing.image} alt="" className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg object-cover ring-2 ring-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate">{conversation.person}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{conversation.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conversation.listing.title}</p>
                    <div className="mt-1 flex items-center gap-2 min-w-0">
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border text-white shrink-0 ${statusTone[conversation.status]}`}>
                        {conversation.status}
                      </span>
                      <p className="text-xs truncate">{conversation.preview}</p>
                    </div>
                  </div>
                  {conversation.unread && <span className="h-2.5 w-2.5 rounded-full bg-coral mt-1.5 shrink-0 animate-pulse-glow" />}
                </button>
              ))}
            </div>
          </aside>

          <section className="flex flex-col min-w-0 min-h-[70vh] lg:min-h-0">
            <header className="flex items-center gap-3 p-4 border-b border-white/10 min-w-0">
              <img src={active.avatar} alt="" className="h-11 w-11 rounded-full ring-2 ring-white/15 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{active.person}</p>
                <p className="text-xs text-muted-foreground truncate">{active.listing.title} · {active.status} · {active.role}</p>
              </div>
              <Button variant="glass" size="sm" className="hidden sm:inline-flex">Ver reserva</Button>
            </header>

            <div className="p-3 border-b border-white/10 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 min-w-max">
                {quickActions.map((action) => (
                  <button key={action.label} className="inline-flex items-center gap-2 rounded-full glass px-3 py-2 text-xs font-semibold border-white/10 press">
                    <action.icon size={13} /> {action.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-gradient-night">
              {thread.map((message, index) => (
                <div
                  key={`${message.text}-${index}`}
                  className={cn(
                    "max-w-[86%] sm:max-w-[72%] px-4 py-3 rounded-3xl text-sm border shadow-soft",
                    message.from === "me"
                      ? "ml-auto bg-gradient-cobalt text-white rounded-br-md border-white/15 glossy"
                      : "bg-white/6 border-white/10 rounded-bl-md"
                  )}
                >
                  <p className="break-words">{message.text}</p>
                  <p className={cn("mt-1 text-[10px]", message.from === "me" ? "text-white/70" : "text-muted-foreground")}>{message.meta}</p>
                </div>
              ))}
            </div>

            <form onSubmit={send} className="p-3 sm:p-4 border-t border-white/10 flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe dentro de Booked..."
                className="min-w-0 flex-1 h-12 px-4 rounded-full field-surface outline-none text-foreground"
              />
              <Button type="submit" variant="hero" size="icon" aria-label="Enviar"><Send size={16} /></Button>
            </form>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default Messages;
