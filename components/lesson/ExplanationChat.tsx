"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Send, X, Loader2, BookOpen } from "lucide-react";
import type { LanguageId, Lesson } from "@/lib/types";
import { LANG_BY_ID } from "@/lib/content/languages";
import { SimpleMarkdown } from "@/components/lesson/SimpleMarkdown";
import { cn } from "@/lib/utils";

interface Msg {
  id: number;
  role: "user" | "model";
  text: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  lesson: Lesson;
  knownLang: LanguageId;
  targetLang: LanguageId;
  /** When set, the chat opens scoped to a single comparison within the lesson. */
  focusComparisonIndex?: number | null;
}

let mid = 1;

export function ExplanationChat({
  open,
  onClose,
  lesson,
  knownLang,
  targetLang,
  focusComparisonIndex,
}: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const hasFocus =
    typeof focusComparisonIndex === "number" &&
    focusComparisonIndex >= 0 &&
    focusComparisonIndex < lesson.comparisons.length;
  const focusedConcept = hasFocus
    ? lesson.comparisons[focusComparisonIndex as number].concept
    : null;

  // Reset when the modal opens or the focused comparison changes.
  useEffect(() => {
    if (!open) {
      setOpened(false);
      return;
    }
    if (opened) return;
    setOpened(true);
    setMessages([]);
    setError(null);
    fetchOpening();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lesson.id, focusComparisonIndex]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function callApi(history: Msg[]) {
    const known = LANG_BY_ID[knownLang]?.name ?? knownLang;
    const target = LANG_BY_ID[targetLang]?.name ?? targetLang;
    const res = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: history.map((m) => ({ role: m.role, text: m.text })),
        context: {
          lessonTitle: lesson.title,
          lessonIntro: lesson.intro,
          knownLang: known,
          targetLang: target,
          comparisons: lesson.comparisons,
          realWorld: lesson.realWorld,
          focusComparisonIndex: hasFocus ? focusComparisonIndex : undefined,
        },
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);
    return data.text as string;
  }

  async function fetchOpening() {
    setLoading(true);
    setError(null);
    const known = LANG_BY_ID[knownLang]?.name ?? knownLang;
    const target = LANG_BY_ID[targetLang]?.name ?? targetLang;
    const seedText = focusedConcept
      ? `Please dig deeper into the "${focusedConcept}" conversion. What should I actually internalize moving from ${known} to ${target} for this specific concept, and what's the most common mistake people make?`
      : `Please explain this conversion deeper. What should I actually internalize, and what's the most common mistake people make moving from ${known} to ${target} for this concept?`;
    const seed: Msg = { id: mid++, role: "user", text: seedText };
    try {
      const reply = await callApi([seed]);
      setMessages([seed, { id: mid++, role: "model", text: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { id: mid++, role: "user", text };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);
    try {
      const reply = await callApi(next);
      setMessages((m) => [...m, { id: mid++, role: "model", text: reply }]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 bg-bark-900/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="panel-wood w-full max-w-2xl max-h-[88vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b-2 border-bark-900">
              <div className="w-10 h-10 rounded-lg bg-royal-500 border-2 border-bark-900 flex items-center justify-center shadow-glow">
                <BookOpen className="text-gold-400" size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg text-gold-400 truncate">
                  {focusedConcept ?? "Sage's deeper explanation"}
                </div>
                <div className="text-xs text-parchment-100 font-body truncate">
                  Powered by Gemini ·{" "}
                  {LANG_BY_ID[knownLang]?.emoji}→{LANG_BY_ID[targetLang]?.emoji} {lesson.title}
                </div>
              </div>
              <button
                onClick={onClose}
                className="btn-ember px-3 py-2"
                title="End chat and return to lesson"
              >
                <X size={16} /> End chat
              </button>
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-royal-900/40"
            >
              {messages
                .filter((m, i) => !(i === 0 && m.role === "user")) // hide the seed prompt
                .map((m) => (
                  <Bubble key={m.id} msg={m} />
                ))}

              {loading && (
                <div className="flex items-center gap-2 text-parchment-100 text-sm italic">
                  <Loader2 className="animate-spin" size={14} />
                  <Sparkles size={14} className="text-gold-400" />
                  Sage is thinking…
                </div>
              )}

              {error && (
                <div className="p-3 rounded-lg border-2 border-ember-500 bg-ember-500/20 text-parchment-50 text-sm">
                  <div className="font-display text-base mb-1">Couldn't reach Gemini</div>
                  <div className="font-mono text-xs break-all">{error}</div>
                  <button
                    onClick={fetchOpening}
                    className="btn-stone mt-2 text-xs px-3 py-1"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="p-3 border-t-2 border-bark-900 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up…"
                disabled={loading}
                className="flex-1 panel-stone px-3 py-2 text-parchment-50 outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-gold disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] px-4 py-3 rounded-xl border-2",
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
