"use client";

import Link from "next/link";
import { Flame, Trophy, ScrollText, Crown, MessageCircle, LogIn, LogOut, User } from "lucide-react";
import { useGameStore } from "@/lib/game/store";
import { xpProgressInLevel } from "@/lib/game/engine";
import { useAuth } from "@/components/auth/AuthProvider";

export function Hud() {
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const auth = useAuth();
  if (!hydrated) return <div className="h-20" />;

  const { level, into, span, pct } = xpProgressInLevel(profile.xp);

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-royal-900/60 border-b-2 border-bark-900">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 sm:gap-5">
        <Link
          href="/dashboard"
          className="font-display text-2xl sm:text-3xl text-gold-400 drop-shadow-[0_2px_0_#241407] hover:scale-105 transition"
        >
          ⚔ CodeQuest
        </Link>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-3">
          <Link href="/achievements" title="Achievements">
            <Trophy className="text-gold-400 hover:scale-110 transition" size={22} />
          </Link>
          <Link href="/leaderboard" title="Leaderboard">
            <ScrollText className="text-gold-400 hover:scale-110 transition" size={22} />
          </Link>
          <Link href="/mentor" title="AI Mentor">
            <MessageCircle className="text-gold-400 hover:scale-110 transition" size={22} />
          </Link>
        </div>

        {/* Level + XP bar */}
        <div className="flex items-center gap-2 panel-stone px-2 py-1.5 min-w-[170px]">
          <div className="relative">
            <Crown className="text-gold-400" size={22} />
            <span className="absolute -bottom-1 -right-2 font-display text-xs bg-bark-900 text-gold-400 rounded-full px-1.5 border border-gold-600">
              {level}
            </span>
          </div>
          <div className="flex-1">
            <div className="h-2 rounded-full bg-bark-900 overflow-hidden border border-bark-900">
              <div
                className="h-full bg-gradient-to-r from-moss-400 to-gold-400 transition-all"
                style={{ width: pct * 100 + "%" }}
              />
            </div>
            <div className="text-[10px] font-bold text-parchment-100 leading-3 mt-0.5">
              {into}/{span} XP
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 panel-stone px-2 py-1.5">
          <Flame className="text-ember-400" size={20} />
          <span className="font-display text-parchment-50">
            {profile.streakDays}
          </span>
        </div>

        {/* Gold (XP as coins) */}
        <div className="hidden sm:flex items-center gap-1 panel-stone px-2 py-1.5">
          <span className="coin w-5 h-5 rounded-full" />
          <span className="font-display text-parchment-50">{profile.xp}</span>
        </div>

        {/* Auth */}
        {auth.configured && (
          auth.user ? (
            <div className="flex items-center gap-1 panel-stone px-2 py-1.5 max-w-[180px]">
              <User size={16} className="text-gold-400 shrink-0" />
              <span
                className="font-body text-parchment-50 text-xs truncate hidden sm:inline"
                title={auth.user.email ?? ""}
              >
                {profile.name || auth.user.email}
              </span>
              <button
                onClick={() => auth.signOut()}
                className="text-parchment-100 hover:text-ember-400 transition shrink-0"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 panel-stone px-3 py-1.5 hover:scale-105 transition"
              title="Sign in"
            >
              <LogIn size={16} className="text-gold-400" />
              <span className="font-display text-parchment-50 text-sm hidden sm:inline">
                Sign in
              </span>
            </Link>
          )
        )}
      </div>
    </header>
  );
}
