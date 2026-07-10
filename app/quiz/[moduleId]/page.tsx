"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Sword, Home } from "lucide-react";
import { ClientShell } from "@/components/ClientShell";
import { useGameStore } from "@/lib/game/store";
import { findCourse } from "@/lib/content/courses";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/types";

export default function QuizPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  const router = useRouter();
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);
  const record = useGameStore((s) => s.recordQuizResult);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  useEffect(() => {
    if (hydrated && !profile.onboarded) router.replace("/onboarding");
  }, [hydrated, profile.onboarded, router]);

  const course = useMemo(() => {
    if (!profile.knownLang || !profile.targetLang) return undefined;
    return findCourse(profile.knownLang, profile.targetLang);
  }, [profile.knownLang, profile.targetLang]);

  const mod = course?.modules.find((m) => m.id === moduleId);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [debugAnsweredCorrect, setDebugAnsweredCorrect] = useState(false);
  const [done, setDone] = useState(false);

  if (!course || !mod) {
    return (
      <ClientShell>
        <div className="panel-wood p-6 text-center">
          <div className="text-5xl mb-2">🗺️</div>
          <h2 className="font-display text-2xl text-gold-400">
            No trial here.
          </h2>
          <Link href="/dashboard" className="btn-gold mt-4 inline-block">
            Back to the kingdom
          </Link>
        </div>
      </ClientShell>
    );
  }

  const activeModule = mod;
  const q = activeModule.quiz[idx];

  const lockAnswer = (i: number) => {
    if (revealed) return;
    setPicked(i);
    setRevealed(true);
    if (i === q.correctIndex) {
      setCorrectCount((c) => c + 1);
      setXpEarned((x) => x + q.xp);
      if (q.kind === "debug") setDebugAnsweredCorrect(true);
    }
  };

  const nextQ = () => {
    if (idx < activeModule.quiz.length - 1) {
      setIdx(idx + 1);
      setPicked(null);
      setRevealed(false);
    } else {
      const total = activeModule.quiz.length;
      const score = correctCount / total;
      const moduleCompleted = score >= 0.6;
      record(
        activeModule.id,
        score,
        xpEarned + activeModule.rewardXp * (moduleCompleted ? 1 : 0),
        total,
        correctCount,
        moduleCompleted,
        debugAnsweredCorrect,
      );
      setDone(true);
    }
  };

  return (
    <ClientShell>
      {!done ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Link href={"/learn/" + activeModule.id} className="btn-stone text-sm">
              ← Back to lessons
            </Link>
            <div className="text-right">
              <div className="font-display text-xl sm:text-2xl text-gold-400">
                Trial of {activeModule.title}
              </div>
              <div className="text-sm text-parchment-100/90 font-body">
                Question {idx + 1} of {activeModule.quiz.length}
              </div>
            </div>
          </div>

          <div className="h-2 rounded-full bg-bark-900 overflow-hidden border border-bark-900 mb-4">
            <div
              className="h-full bg-gradient-to-r from-ember-400 to-gold-400 transition-all"
              style={{
                width: ((idx + (revealed ? 1 : 0)) / activeModule.quiz.length) * 100 + "%",
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="panel-wood p-5"
            >
              <div className="pill bg-bark-900 text-gold-400 mb-2">
                {q.kind === "mcq" ? "Multiple choice" : "Debug it"}
              </div>
              <h2 className="font-display text-2xl text-parchment-50">
                {q.prompt}
              </h2>
              {q.kind === "debug" && (
                <pre className="code mt-3 p-3 rounded-lg bg-royal-900 text-parchment-50 border-2 border-bark-900 text-sm whitespace-pre-wrap">
                  {q.brokenCode}
                </pre>
              )}

              <div className="mt-4 grid gap-2">
                {q.choices.map((choice, i) => (
                  <ChoiceButton
                    key={i}
                    choice={choice}
                    i={i}
                    correctIndex={q.correctIndex}
                    picked={picked}
                    revealed={revealed}
                    onPick={lockAnswer}
                  />
                ))}
              </div>

              {revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "mt-4 p-3 rounded-lg border-2 font-body",
                    picked === q.correctIndex
                      ? "bg-moss-500/20 border-moss-500 text-parchment-50"
                      : "bg-ember-500/20 border-ember-500 text-parchment-50",
                  )}
                >
                  <div className="font-display text-lg mb-1">
                    {picked === q.correctIndex ? "Correct!" : "Not quite."}
                  </div>
                  <div className="text-sm">{q.explanation}</div>
                </motion.div>
              )}

              {revealed && (
                <div className="mt-4 flex justify-end">
                  <button onClick={nextQ} className="btn-gold">
                    {idx === activeModule.quiz.length - 1 ? (
                      <>
                        Finish trial <Sword size={18} />
                      </>
                    ) : (
                      <>
                        Next question <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <ResultScreen
          correct={correctCount}
          total={activeModule.quiz.length}
          xp={xpEarned + (correctCount / activeModule.quiz.length >= 0.6 ? mod.rewardXp : 0)}
          moduleId={activeModule.id}
        />
      )}
    </ClientShell>
  );
}

function ChoiceButton({
  choice,
  i,
  correctIndex,
  picked,
  revealed,
  onPick,
}: {
  choice: string;
  i: number;
  correctIndex: number;
  picked: number | null;
  revealed: boolean;
  onPick: (i: number) => void;
}) {
  const isCorrect = i === correctIndex;
  const isPicked = picked === i;
  return (
    <button
      onClick={() => onPick(i)}
      disabled={revealed}
      className={cn(
        "w-full text-left p-3 rounded-lg border-2 transition flex items-center gap-3",
        !revealed && "panel-stone hover:scale-[1.01] cursor-pointer",
        revealed && isCorrect && "bg-moss-500/30 border-moss-500",
        revealed && !isCorrect && isPicked && "bg-ember-500/30 border-ember-500 animate-shake",
        revealed && !isCorrect && !isPicked && "bg-bark-900/40 border-bark-900 opacity-60",
      )}
    >
      <div
        className={cn(
          "w-7 h-7 rounded-full font-display flex items-center justify-center border-2",
          revealed && isCorrect
            ? "bg-moss-500 border-moss-500 text-bark-900"
            : revealed && isPicked
              ? "bg-ember-500 border-ember-500 text-parchment-50"
              : "bg-bark-900 border-gold-600 text-gold-400",
        )}
      >
        {revealed && isCorrect ? (
          <Check size={16} />
        ) : revealed && isPicked ? (
          <X size={16} />
        ) : (
          String.fromCharCode(65 + i)
        )}
      </div>
      <span className="code text-sm text-parchment-50 whitespace-pre-wrap break-all">
        {choice}
      </span>
    </button>
  );
}

function ResultScreen({
  correct,
  total,
  xp,
  moduleId,
}: {
  correct: number;
  total: number;
  xp: number;
  moduleId: string;
}) {
  const pct = correct / total;
  const tier =
    pct >= 1 ? "Flawless" : pct >= 0.8 ? "Triumph" : pct >= 0.6 ? "Victory" : "Defeat";
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 16 }}
      className="panel-wood p-6 text-center"
    >
      <div className="text-6xl mb-2 animate-bob">
        {pct >= 1 ? "🏆" : pct >= 0.6 ? "🛡️" : "💀"}
      </div>
      <h1 className="font-display text-4xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
        {tier}
      </h1>
      <p className="font-display text-2xl text-parchment-50 mt-2">
        {correct} / {total} correct
      </p>
      <p className="font-body text-parchment-100 mt-2">+{xp} XP earned</p>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Link href="/dashboard" className="btn-gold">
          <Home size={18} /> To the kingdom
        </Link>
        <Link href={"/quiz/" + moduleId} className="btn-stone">
          Retry trial
        </Link>
      </div>
    </motion.div>
  );
}
