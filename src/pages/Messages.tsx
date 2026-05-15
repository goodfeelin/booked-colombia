import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { LISTINGS } from "@/data/listings";
import { Send, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const conversations = LISTINGS.slice(0, 4).map((l, i) => ({
  id: l.id,
  host: l.host,
  listing: l,
  preview: ["Confirmed for Saturday — see you at 9am ✨","Drone is allowed, bring your own permit","¡Hola! Yes, the rooftop is available","I can move the cobalt sofas, no problem"][i],
  time: ["10:32","Yesterday","2 days ago","Mar 4"][i],
  unread: i === 0 || i === 2,
}));

const seed = [
  { from: "host", text: "¡Hola Camila! Bienvenida a Booked. Excited about your shoot 📸" },
  { from: "me", text: "Hi Mariana! Quick question — how's the natural light at 5pm?" },
  { from: "host", text: "5pm is unreal. The whole west wall lights up gold for about 40 min." },
  { from: "me", text: "Perfect. Booking now." },
  { from: "host", text: "Confirmed for Saturday — see you at 9am ✨" },
];

const Messages = () => {
  const [active, setActive] = useState(conversations[0]);
  const [text, setText] = useState("");
  const [thread, setThread] = useState(seed);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setThread([...thread, { from: "me", text }]);
    setText("");
  };

  return (
    <PageShell>
      <div className="container-tight">
        <span className="editorial-eyebrow text-coral">Messages</span>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold mb-6">Talk to your hosts.</h1>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 h-[70vh] rounded-3xl widget overflow-hidden">
          <aside className="border-r border-white/10 overflow-y-auto">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-2 px-3 h-10 rounded-full bg-white/5 border border-white/10">
                <Search size={14} className="text-muted-foreground" />
                <input placeholder="Search messages" className="bg-transparent outline-none text-sm w-full" />
              </div>
            </div>
            {conversations.map((c) => (
              <button key={c.id} onClick={() => setActive(c)} className={cn(
                "w-full text-left p-4 flex gap-3 border-b border-white/8 hover:bg-white/5 transition-colors",
                active.id === c.id && "bg-white/8"
              )}>
                <img src={c.host.avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white/15" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm truncate">{c.host.name}</p>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.listing.title}</p>
                  <p className="text-xs mt-1 truncate">{c.preview}</p>
                </div>
                {c.unread && <span className="h-2 w-2 rounded-full bg-coral mt-1.5 shrink-0 animate-pulse-glow" />}
              </button>
            ))}
          </aside>

          <section className="flex flex-col">
            <header className="flex items-center gap-3 p-4 border-b border-white/10">
              <img src={active.host.avatar} alt="" className="h-10 w-10 rounded-full ring-2 ring-white/15" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{active.host.name}</p>
                <p className="text-xs text-muted-foreground">{active.listing.title}</p>
              </div>
              <Button variant="glass" size="sm"><Phone size={14} /> WhatsApp</Button>
            </header>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-gradient-night">
              {thread.map((m, i) => (
                <div key={i} className={cn("max-w-[75%] px-4 py-2.5 rounded-3xl text-sm border",
                  m.from === "me"
                    ? "ml-auto bg-gradient-cobalt text-white rounded-br-md border-white/15 glossy"
                    : "bg-white/5 border-white/10 rounded-bl-md")}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={send} className="p-4 border-t border-white/10 flex gap-2">
              <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" className="flex-1 h-12 px-4 rounded-full bg-white/5 border border-white/10 outline-none focus:border-cobalt text-foreground" />
              <Button type="submit" variant="hero" size="icon"><Send size={16} /></Button>
            </form>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default Messages;
