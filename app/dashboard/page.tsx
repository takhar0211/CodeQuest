"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, CheckCircle2, ChevronRight, Star } from "lucide-react";
import { ClientShell } from "@/components/ClientShell";
import { useGameStore } from "@/lib/game/store";
import { findCourse } from "@/lib/content/courses";
import { LANG_BY_ID } from "@/lib/content/languages";
import {
  isModuleUnlocked,
  moduleProgressPct,
} from "@/lib/game/engine";
import { cn } from "@/lib/utils";
import type { Module } from "@/lib/types";

export default function Dashboard() {
  const router = useRouter();
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);

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

  return (
    <ClientShell>
      {!course ? (
        <NoCourseFallback known={profile.knownLang} target={profile.targetLang} />
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
            <div>
              <div className="text-parchment-100 font-display">
                Welcome back, {profile.name}.
              </div>
              <h1 className="font-display text-4xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
                {LANG_BY_ID[course.knownLang].emoji} → {LANG_BY_ID[course.targetLang].emoji}{" "}
                <span className="text-parchment-50">
                  {course.title}
                </span>
              </h1>
              <div className="font-body text-parchment-100/90 text-sm mt-1">
                Rank: <span className="text-gold-400 capitalize">{profile.level}</span>
                {" · "}
                {Object.values(profile.progress).filter((p) => p.completed).length}
                /{course.modules.length} modules conquered
              </div>
            </div>
            <Link href="/onboarding" className="btn-stone text-sm">
              Change path
            </Link>
          </div>

          <KingdomMap modules={course.modules} />
        </div>
      )}
    </ClientShell>
  );
}

function NoCourseFallback({
  known,
  target,
}: {
  known: string | null;
  target: string | null;
}) {
  return (
    <div className="panel-wood p-6 text-center">
      <div className="text-5xl mb-2">🏗️</div>
      <h2 className="font-display text-2xl text-gold-400">
        That stronghold is still under construction
      </h2>
      <p className="font-body text-parchment-100 mt-2">
        We don't yet have a full course for{" "}
        <span className="text-gold-400">{known}</span> →{" "}
        <span className="text-gold-400">{target}</span>.
      </p>
      <p className="font-body text-parchment-100/80 text-sm mt-1">
        Pick a different combination — the Python → JavaScript course is fully stocked.
      </p>
      <Link href="/onboarding" className="btn-gold mt-4 inline-block">
        Change path
      </Link>
    </div>
  );
}

function KingdomMap({ modules }: { modules: Module[] }) {
  const profile = useGameStore((s) => s.profile);
  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-bark-800 via-bark-900 to-bark-800 rounded-full opacity-40" />
      <ul className="relative space-y-6">
        {modules.map((m, i) => {
          const unlocked = isModuleUnlocked(m, profile);
          const pct = moduleProgressPct(m, profile);
          const done = profile.progress[m.id]?.completed;
          const left = i % 2 === 0;
          return (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, x: left ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={cn(
                "flex",
                left ? "justify-start" : "justify-end",
              )}
            >
              <div
                className={cn(
                  "w-full sm:w-[46%] relative",
                  !unlocked && "opacity-60",
                )}
              >
                <ModuleCard
                  module={m}
                  unlocked={unlocked}
                  pct={pct}
                  done={!!done}
                />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function ModuleCard({
  module,
  unlocked,
  pct,
  done,
}: {
  module: Module;
  unlocked: boolean;
  pct: number;
  done: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "panel-wood p-4 flex items-center gap-4 relative",
        unlocked && !done && "animate-pulseGold",
      )}
    >
      <div
        className={cn(
          "shrink-0 w-16 h-16 rounded-xl flex items-center justify-center text-4xl border-2",
          done
            ? "bg-moss-500 border-bark-900 shadow-glow"
            : unlocked
              ? "bg-gold-500 border-bark-900 shadow-stamp"
              : "bg-bark-800 border-bark-900",
        )}
      >
        {unlocked ? module.icon : <Lock className="text-parchment-100" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="font-display text-xl text-gold-400 truncate">
            {module.title}
          </div>
          {done && <CheckCircle2 className="text-moss-400" size={20} />}
        </div>
        <div className="font-body text-sm text-parchment-100/90 truncate">
          {module.tagline}
        </div>
        <div className="mt-2 h-2 rounded-full bg-bark-900 overflow-hidden border border-bark-900">
          <div
            className={cn(
              "h-full transition-all",
              done
                ? "bg-moss-400"
                : "bg-gradient-to-r from-ember-400 to-gold-400",
            )}
            style={{ width: pct * 100 + "%" }}
          />
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-parchment-100">
          <span className="pill bg-bark-900 text-gold-400">
            <Star size={12} /> {module.rewardXp} XP
          </span>
          <span className="pill bg-bark-900 capitalize text-parchment-50">
            {module.level}
          </span>
          <span className="pill bg-bark-900 text-parchment-50">
            {module.lessons.length} lesson{module.lessons.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <ChevronRight className="text-gold-400 shrink-0" />
    </div>
  );

  return unlocked ? (
    <Link href={"/learn/" + module.id} className="block">
      {inner}
    </Link>
  ) : (
    <div className="cursor-not-allowed">{inner}</div>
  );
}
