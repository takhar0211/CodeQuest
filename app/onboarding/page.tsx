"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LANGUAGES } from "@/lib/content/languages";
import { COURSES } from "@/lib/content/courses";
import type { LanguageId, SkillLevel } from "@/lib/types";
import { useGameStore } from "@/lib/game/store";
import { useAuth } from "@/components/auth/AuthProvider";
import { cn } from "@/lib/utils";

const STEPS = ["name", "known", "target", "level"] as const;
type Step = (typeof STEPS)[number];

const LEVELS: { id: SkillLevel; title: string; blurb: string; icon: string }[] = [
  {
    id: "beginner",
    title: "Beginner",
    blurb: "I want syntax mapped clearly and exercises that walk me through.",
    icon: "🛡️",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    blurb: "I want fast comparison and idioms — skip the basics.",
    icon: "⚔️",
  },
  {
    id: "advanced",
    title: "Advanced",
    blurb: "Drop me into edge cases, footguns, and runtime quirks.",
    icon: "👑",
  },
];

export default function Onboarding() {
  const router = useRouter();
  const setOnboarding = useGameStore((s) => s.setOnboarding);
  const setHydrated = useGameStore((s) => s.setHydrated);
  const auth = useAuth();

  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [known, setKnown] = useState<LanguageId | null>(null);
  const [target, setTarget] = useState<LanguageId | null>(null);
  const [level, setLevel] = useState<SkillLevel>("beginner");

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  const supportedPairs = useMemo(
    () =>
      new Set(
        COURSES.map((c) => c.knownLang + "→" + c.targetLang),
      ),
    [],
  );

  const pairHasCourse =
    known && target && supportedPairs.has(known + "→" + target);

  function advance() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }
  function back() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }
  function finish() {
    if (!known || !target) return;
    setOnboarding({ name: name || "Chieftain", knownLang: known, targetLang: target, level });
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      {auth.configured && !auth.user && !auth.loading && (
        <div className="panel-parchment p-3 mb-4 text-bark-900 text-sm flex flex-wrap items-center justify-between gap-2">
          <span>
            Playing as guest — progress lives only in this browser.{" "}
            <Link href="/signup?next=/onboarding" className="font-display underline">
              Sign up
            </Link>{" "}
            to sync across devices.
          </span>
        </div>
      )}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={cn(
                "h-2 rounded-full flex-1",
                STEPS.indexOf(step) >= i
                  ? "bg-gold-400"
                  : "bg-bark-900/60",
              )}
            />
          ))}
        </div>
        <div className="font-display text-parchment-100 text-sm mt-2">
          Step {STEPS.indexOf(step) + 1} of {STEPS.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="panel-wood p-6"
        >
          {step === "name" && (
            <div>
              <h2 className="font-display text-3xl text-gold-400">
                What shall we call you, chieftain?
              </h2>
              <p className="font-body text-parchment-100 mt-2">
                Your name goes on the leaderboard.
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ada"
                className="mt-4 w-full panel-parchment px-4 py-3 font-display text-2xl outline-none"
                autoFocus
              />
            </div>
          )}

          {step === "known" && (
            <LangPicker
              title="Which language do you already know?"
              subtitle="We'll use it as your home base."
              selected={known}
              onSelect={setKnown}
            />
          )}

          {step === "target" && (
            <LangPicker
              title="Which language do you want to conquer?"
              subtitle={
                known
                  ? "We'll map every concept back to " + (LANGUAGES.find((l) => l.id === known)?.name ?? "what you know") + "."
                  : "Pick the next territory."
              }
              selected={target}
              onSelect={setTarget}
              excluded={known ?? undefined}
              hint={
                known
                  ? (id) =>
                      supportedPairs.has(known + "→" + id)
                        ? "🏰 Full course"
                        : "⚠ Preview content"
                  : undefined
              }
            />
          )}

          {step === "level" && (
            <div>
              <h2 className="font-display text-3xl text-gold-400">
                Pick your starting rank.
              </h2>
              <p className="font-body text-parchment-100 mt-2">
                Lessons will scale to match.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={cn(
                      "text-left p-4 rounded-xl border-2 transition",
                      level === l.id
                        ? "panel-parchment border-gold-600 shadow-glow"
                        : "panel-stone hover:scale-[1.01]",
                    )}
                  >
                    <div className="text-3xl">{l.icon}</div>
                    <div className="font-display text-xl mt-1">
                      {l.title}
                    </div>
                    <div className={cn("text-sm mt-1", level === l.id ? "text-bark-800" : "text-parchment-100")}>
                      {l.blurb}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          disabled={step === "name"}
          className="btn-stone disabled:opacity-40"
        >
          Back
        </button>

        {step === "level" ? (
          <button
            onClick={finish}
            disabled={!known || !target}
            className="btn-gold"
          >
            {pairHasCourse ? "Enter the realm" : "Enter (preview content)"}
          </button>
        ) : (
          <button
            onClick={advance}
            disabled={
              (step === "name" && !name.trim()) ||
              (step === "known" && !known) ||
              (step === "target" && !target)
            }
            className="btn-gold"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}

function LangPicker({
  title,
  subtitle,
  selected,
  onSelect,
  excluded,
  hint,
}: {
  title: string;
  subtitle: string;
  selected: LanguageId | null;
  onSelect: (id: LanguageId) => void;
  excluded?: LanguageId;
  hint?: (id: LanguageId) => string;
}) {
  return (
    <div>
      <h2 className="font-display text-3xl text-gold-400">{title}</h2>
      <p className="font-body text-parchment-100 mt-1">{subtitle}</p>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {LANGUAGES.filter((l) => l.id !== excluded).map((l) => {
          const isSel = selected === l.id;
          return (
            <button
              key={l.id}
              onClick={() => onSelect(l.id)}
              className={cn(
                "flex flex-col items-start text-left p-3 rounded-xl border-2 transition",
                isSel
                  ? "panel-parchment border-gold-600 shadow-glow"
                  : "panel-stone hover:scale-[1.02]",
              )}
            >
              <div className="text-3xl">{l.emoji}</div>
              <div className="font-display text-lg mt-1">{l.name}</div>
              <div
                className={cn(
                  "text-xs mt-0.5",
                  isSel ? "text-bark-800" : "text-parchment-100/90",
                )}
              >
                {l.blurb}
              </div>
              {hint && (
                <div
                  className={cn(
                    "text-[10px] font-bold mt-1",
                    isSel ? "text-bark-900" : "text-gold-400",
                  )}
                >
                  {hint(l.id)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
