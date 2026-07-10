"use client";

import { useEffect } from "react";
import { ClientShell } from "@/components/ClientShell";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { useGameStore } from "@/lib/game/store";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { xpProgressInLevel } from "@/lib/game/engine";
import { formatDuration } from "@/lib/utils";

export default function AchievementsPage() {
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  const { level } = xpProgressInLevel(profile.xp);
  const unlocked = new Set(profile.unlockedAchievements);
  const accuracy =
    profile.quizAccuracyHistory.length === 0
      ? 0
      : profile.quizAccuracyHistory.reduce(
          (acc, h) => acc + h.correct / Math.max(1, h.total),
          0,
        ) / profile.quizAccuracyHistory.length;

  return (
    <ClientShell>
      <h1 className="font-display text-4xl text-gold-400 drop-shadow-[0_2px_0_#241407] mb-2">
        🏆 Trophy hall
      </h1>
      <p className="font-body text-parchment-100 mb-6">
        Earn badges by completing lessons, quizzes, and keeping your streak alive.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Stat label="Level" value={level} icon="👑" />
        <Stat label="Total XP" value={profile.xp} icon="✨" />
        <Stat label="Streak" value={profile.streakDays} icon="🔥" />
        <Stat
          label="Quiz accuracy"
          value={Math.round(accuracy * 100) + "%"}
          icon="🎯"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <Stat
          label="Lessons done"
          value={Object.values(profile.progress).reduce(
            (n, p) => n + p.completedLessonIds.length,
            0,
          )}
          icon="📜"
        />
        <Stat
          label="Modules conquered"
          value={Object.values(profile.progress).filter((p) => p.completed).length}
          icon="🛡️"
        />
        <Stat
          label="Time spent"
          value={formatDuration(profile.totalSecondsLearned)}
          icon="⏳"
        />
        <Stat
          label="Badges unlocked"
          value={
            profile.unlockedAchievements.filter((a) => !a.startsWith("__"))
              .length
          }
          icon="🏅"
        />
      </div>

      <h2 className="font-display text-2xl text-gold-400 mb-3">Badges</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const got = unlocked.has(a.id);
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "panel-wood p-4 flex items-center gap-3 relative",
                !got && "opacity-60 grayscale",
              )}
            >
              <div
                className={cn(
                  "shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl border-2",
                  got
                    ? "bg-gold-500 border-bark-900 shadow-glow"
                    : "bg-bark-800 border-bark-900",
                )}
              >
                {a.icon}
              </div>
              <div className="min-w-0">
                <div className="font-display text-lg text-gold-400 truncate">
                  {a.title}
                </div>
                <div className="text-sm text-parchment-100/90">
                  {a.description}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ClientShell>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div className="panel-wood p-3 flex items-center gap-2">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="font-display text-2xl text-gold-400 leading-none">
          {value}
        </div>
        <div className="text-xs text-parchment-100/90 mt-1">{label}</div>
      </div>
    </div>
  );
}
