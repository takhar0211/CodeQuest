"use client";

import { useEffect, useMemo } from "react";
import { ClientShell } from "@/components/ClientShell";
import { useGameStore } from "@/lib/game/store";
import { levelForXp } from "@/lib/game/engine";
import { cn } from "@/lib/utils";

interface Row {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  flag: string;
  isYou?: boolean;
}

const FAKE_PLAYERS: Omit<Row, "rank">[] = [
  { name: "Lyra", xp: 12_840, level: 16, streak: 28, flag: "🦋" },
  { name: "Caelum", xp: 9_320, level: 13, streak: 14, flag: "🦅" },
  { name: "Mira", xp: 7_810, level: 12, streak: 19, flag: "🦊" },
  { name: "Oden", xp: 5_640, level: 10, streak: 7, flag: "🐺" },
  { name: "Riku", xp: 4_205, level: 9, streak: 11, flag: "🐯" },
  { name: "Vex", xp: 3_120, level: 7, streak: 3, flag: "🐍" },
  { name: "Kai", xp: 2_500, level: 7, streak: 2, flag: "🐢" },
  { name: "Nox", xp: 1_900, level: 6, streak: 5, flag: "🦉" },
  { name: "Saga", xp: 1_220, level: 4, streak: 6, flag: "🐉" },
  { name: "Eira", xp: 740, level: 3, streak: 4, flag: "🐾" },
];

export default function Leaderboard() {
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  const rows = useMemo<Row[]>(() => {
    const players = [
      ...FAKE_PLAYERS,
      {
        name: profile.name + " (you)",
        xp: profile.xp,
        level: levelForXp(profile.xp),
        streak: profile.streakDays,
        flag: "⭐",
        isYou: true,
      },
    ]
      .sort((a, b) => b.xp - a.xp)
      .map((p, i) => ({ ...p, rank: i + 1 }));
    return players;
  }, [profile.name, profile.xp, profile.streakDays]);

  return (
    <ClientShell>
      <h1 className="font-display text-4xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
        📜 Hall of Champions
      </h1>
      <p className="font-body text-parchment-100 mt-1 mb-5">
        Top clans this season (sample roster — wire to your backend in production).
      </p>

      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.name + r.rank}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border-2 transition",
              r.isYou
                ? "panel-parchment border-gold-600 shadow-glow"
                : "panel-stone",
            )}
          >
            <div
              className={cn(
                "w-10 font-display text-2xl text-center",
                r.rank === 1
                  ? "text-gold-400"
                  : r.rank === 2
                    ? "text-parchment-100"
                    : r.rank === 3
                      ? "text-ember-400"
                      : r.isYou
                        ? "text-bark-900"
                        : "text-parchment-100",
              )}
            >
              #{r.rank}
            </div>
            <div className="text-3xl">{r.flag}</div>
            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "font-display text-lg",
                  r.isYou ? "text-bark-900" : "text-parchment-50",
                )}
              >
                {r.name}
              </div>
              <div
                className={cn(
                  "text-xs",
                  r.isYou ? "text-bark-800" : "text-parchment-100/80",
                )}
              >
                Level {r.level} · 🔥 {r.streak}-day streak
              </div>
            </div>
            <div
              className={cn(
                "font-display text-xl",
                r.isYou ? "text-bark-900" : "text-gold-400",
              )}
            >
              {r.xp.toLocaleString()} XP
            </div>
          </div>
        ))}
      </div>
    </ClientShell>
  );
}
