import type { Module, UserProfile } from "@/lib/types";

/**
 * XP curve: level n requires 100 * n * (n + 1) / 2 total XP (triangular).
 * Level 1 = 100xp, Level 2 = 300xp, Level 3 = 600xp, Level 4 = 1000xp, ...
 */
export function levelForXp(xp: number): number {
  let lvl = 0;
  while (xpRequiredForLevel(lvl + 1) <= xp) lvl++;
  return Math.max(1, lvl);
}

export function xpRequiredForLevel(level: number): number {
  return (100 * level * (level + 1)) / 2;
}

export function xpProgressInLevel(xp: number) {
  const lvl = levelForXp(xp);
  const base = xpRequiredForLevel(lvl);
  const next = xpRequiredForLevel(lvl + 1);
  const into = xp - base;
  const span = next - base;
  return { level: lvl, into, span, pct: Math.min(1, into / span) };
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function bumpStreak(profile: UserProfile): Partial<UserProfile> {
  const today = todayISO();
  if (profile.lastActiveDate === today)
    return { lastActiveDate: today };
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const newStreak =
    profile.lastActiveDate === yesterday ? profile.streakDays + 1 : 1;
  return { lastActiveDate: today, streakDays: newStreak };
}

export function isModuleUnlocked(
  module: Module,
  profile: UserProfile,
): boolean {
  if (module.requires.length === 0) return true;
  return module.requires.every((req) => profile.progress[req]?.completed);
}

export function moduleProgressPct(
  module: Module,
  profile: UserProfile,
): number {
  const prog = profile.progress[module.id];
  if (!prog) return 0;
  const lessons = module.lessons.length || 1;
  const lessonPart = prog.completedLessonIds.length / lessons;
  const quizPart = prog.quizBestScore;
  return Math.min(1, 0.7 * lessonPart + 0.3 * quizPart);
}
