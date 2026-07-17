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

export function LeaderboardClient({ data }: { data: any[] }) {
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  const rows = useMemo<Row[]>(() => {
    // If the backend has no data yet, provide an empty array
    if (!data || data.length === 0) return [];

    const players = data
      .map((p, i) => {
        // Fallback matching since view lacks ID
        const isYou = p.display_name === profile.name && p.xp === profile.xp;
        return {
          name: p.display_name + (isYou ? " (you)" : ""),
          xp: p.xp,
          level: levelForXp(p.xp),
          streak: p.streak_days,
          flag: isYou ? "⭐" : "🛡️", // Using a generic flag for now, could be dynamic
          isYou,
          rank: i + 1,
        };
      });
      
    // If the current user isn't in the top 100 yet but has XP, append them at the bottom
    const youFound = players.some(p => p.isYou);
    if (!youFound && profile.xp > 0) {
      players.push({
        name: profile.name + " (you)",
        xp: profile.xp,
        level: levelForXp(profile.xp),
        streak: profile.streakDays,
        flag: "⭐",
        isYou: true,
        rank: players.length + 1, // approximate
      });
    }

    return players.sort((a, b) => b.xp - a.xp).map((p, i) => ({ ...p, rank: i + 1 }));
  }, [data, profile.name, profile.xp, profile.streakDays]);

  return (
    <ClientShell>
      <h1 className="font-display text-4xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
        📜 Hall of Champions
      </h1>
      <p className="font-body text-parchment-100 mt-1 mb-5">
        Top clans this season.
      </p>

      {rows.length === 0 ? (
        <div className="panel-stone p-6 text-center text-parchment-100">
          No leaderboard data available yet.
        </div>
      ) : (
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
      )}
    </ClientShell>
  );
}
