import type { Achievement, AchievementCheckId, UserProfile } from "@/lib/types";
import { levelForXp } from "./engine";

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-first-lesson",
    title: "First Stone Laid",
    description: "Complete your very first lesson.",
    icon: "🏗️",
    check: "firstLesson",
  },
  {
    id: "ach-five-lessons",
    title: "Stonemason",
    description: "Complete 5 lessons.",
    icon: "🪨",
    check: "fiveLessons",
  },
  {
    id: "ach-perfect-quiz",
    title: "Flawless Victory",
    description: "Ace a quiz with 100% accuracy.",
    icon: "🏆",
    check: "perfectQuiz",
  },
  {
    id: "ach-streak-3",
    title: "Spark Keeper",
    description: "Maintain a 3-day streak.",
    icon: "🔥",
    check: "threeDayStreak",
  },
  {
    id: "ach-streak-7",
    title: "Eternal Flame",
    description: "Maintain a 7-day streak.",
    icon: "🌋",
    check: "sevenDayStreak",
  },
  {
    id: "ach-level-5",
    title: "Chieftain",
    description: "Reach level 5.",
    icon: "👑",
    check: "level5",
  },
  {
    id: "ach-module-master",
    title: "Module Master",
    description: "Fully complete any module.",
    icon: "🛡️",
    check: "moduleMaster",
  },
  {
    id: "ach-debugger",
    title: "Bug Squasher",
    description: "Correctly answer a debugging question.",
    icon: "🐛",
    check: "debugger",
  },
];

const checks: Record<AchievementCheckId, (p: UserProfile) => boolean> = {
  firstLesson: (p) =>
    Object.values(p.progress).some((m) => m.completedLessonIds.length >= 1),
  fiveLessons: (p) =>
    Object.values(p.progress).reduce(
      (n, m) => n + m.completedLessonIds.length,
      0,
    ) >= 5,
  perfectQuiz: (p) =>
    Object.values(p.progress).some((m) => m.quizBestScore >= 1),
  threeDayStreak: (p) => p.streakDays >= 3,
  sevenDayStreak: (p) => p.streakDays >= 7,
  level5: (p) => levelForXp(p.xp) >= 5,
  moduleMaster: (p) => Object.values(p.progress).some((m) => m.completed),
  debugger: (p) => p.unlockedAchievements.includes("__debugger_seed__") /* set on debug answer */,
};

export function evaluateAchievements(profile: UserProfile): string[] {
  const unlocked = new Set(profile.unlockedAchievements);
  for (const ach of ACHIEVEMENTS) {
    if (unlocked.has(ach.id)) continue;
    if (checks[ach.check](profile)) unlocked.add(ach.id);
  }
  return Array.from(unlocked);
}
