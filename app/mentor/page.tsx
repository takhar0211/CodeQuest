"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Bot, Loader2 } from "lucide-react";
import { ClientShell } from "@/components/ClientShell";
import { useGameStore } from "@/lib/game/store";
import { LANG_BY_ID } from "@/lib/content/languages";
import { SimpleMarkdown } from "@/components/lesson/SimpleMarkdown";
import { cn } from "@/lib/utils";

interface Msg {
  id: number;
  role: "user" | "model";
  text: string;
}

let msgId = 1;

export default function Mentor() {
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  const known = profile.knownLang
    ? LANG_BY_ID[profile.knownLang]?.name ?? profile.knownLang
    : "your home language";
  const target = profile.targetLang
    ? LANG_BY_ID[profile.targetLang]?.name ?? profile.targetLang
    : "the new one";

  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      id: msgId++,
      role: "model",
      text:
        "Greetings, " +
        (profile.name || "chieftain") +
        "! I am **Brogan the Bard**, your guide on the road from " +
        known +
        " to " +
        target +
        ". Ask me how a concept translates, or paste code you're stuck on and I'll point out where it bites.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function callApi(history: Msg[]) {
    const res = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role, text: m.text })),
        context: {
          name: profile.name,
          knownLang: known,
          targetLang: target,
          level: profile.level,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
    return data.text as string;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { id: msgId++, role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      // Strip the greeting (first message) when seeding history — it isn't part of
      // a real turn-by-turn exchange with the API.
      const apiHistory = next.slice(1);
      const reply = await callApi(apiHistory);
      setMessages((m) => [...m, { id: msgId++, role: "model", text: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function retryLast() {
    // Re-fire the last user message.
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setLoading(true);
    setError(null);
    try {
      const apiHistory = messages.slice(1).filter((m) => m.role !== "model" || m.id !== messages.at(-1)?.id);
      const reply = await callApi(apiHistory);
      setMessages((m) => [...m, { id: msgId++, role: "model", text: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClientShell>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 rounded-xl bg-royal-500 border-2 border-bark-900 flex items-center justify-center shadow-glow">
          <Bot className="text-gold-400" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
            Brogan the Bard
          </h1>
          <div className="text-sm text-parchment-100 font-body">
            Your AI mentor · {known} → {target} · Powered by Gemini
          </div>
        </div>
      </div>
      {hydrated && !profile.targetLang && (
        <div className="text-xs text-parchment-100/70 mb-3 italic">
          Tip: complete onboarding first so Brogan knows which language you're learning.
        </div>
      )}

      <div
        ref={scrollRef}
        className="panel-wood p-4 space-y-3 min-h-[460px] max-h-[60vh] overflow-y-auto"
      >
        {messages.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
        {loading && (
          <div className="text-sm text-parchment-100/80 italic flex items-center gap-2">
            <Loader2 className="animate-spin" size={14} />
            <Sparkles size={14} className="text-gold-400 animate-pulseGold rounded-full" />
            Brogan is composing a verse…
          </div>
        )}
        {error && (
          <div className="p-3 rounded-lg border-2 border-ember-500 bg-ember-500/20 text-parchment-50 text-sm">
            <div className="font-display text-base mb-1">Couldn't reach Gemini</div>
            <div className="font-mono text-xs break-all">{error}</div>
            <button
              onClick={retryLast}
              className="btn-stone mt-2 text-xs px-3 py-1"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"Ask about " + target + "…"}
          disabled={loading}
          className="flex-1 panel-stone px-4 py-3 text-parchment-50 outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-gold disabled:opacity-50"
        >
          <Send size={18} /> Send
        </button>
      </form>
    </ClientShell>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-xl border-2",
          isUser
            ? "bg-royal-500 border-royal-700 text-parchment-50 rounded-tr-sm"
            : "panel-parchment text-bark-900 rounded-tl-sm",
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
        ) : (
          <SimpleMarkdown text={msg.text} />
        )}
      </div>
    </div>
  );
}
