"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  LanguageId,
  ModuleProgress,
  SkillLevel,
  UserProfile,
} from "@/lib/types";
import { bumpStreak } from "./engine";
import { evaluateAchievements } from "./achievements";
import { getSyncBridge } from "@/lib/sync/bridge";
import {
  appendQuizHistory,
  saveModuleProgressToSupabase,
  saveProfileToSupabase,
} from "@/lib/sync/profile";

// Fire-and-forget helpers — never throw, never block the UI.
function syncProfile(profile: UserProfile) {
  const b = getSyncBridge();
  if (!b) return;
  void saveProfileToSupabase(b.supabase, b.user.id, profile);
}
function syncModule(profile: UserProfile, moduleId: string) {
  const b = getSyncBridge();
  if (!b) return;
  const mp = profile.progress[moduleId];
  if (mp) void saveModuleProgressToSupabase(b.supabase, b.user.id, mp);
}
function syncQuizAttempt(moduleId: string, correct: number, total: number) {
  const b = getSyncBridge();
  if (!b) return;
  void appendQuizHistory(b.supabase, b.user.id, moduleId, correct, total);
}

const initialProfile: UserProfile = {
  name: "Chieftain",
  knownLang: null,
  targetLang: null,
  level: "beginner",
  xp: 0,
  streakDays: 0,
  lastActiveDate: null,
  unlockedAchievements: [],
  progress: {},
  totalSecondsLearned: 0,
  quizAccuracyHistory: [],
  weakTopics: [],
  onboarded: false,
};

interface RewardEvent {
  id: number;
  kind: "xp" | "achievement" | "module" | "levelup";
  title: string;
  amount?: number;
  icon?: string;
}

interface State {
  profile: UserProfile;
  rewardQueue: RewardEvent[];
  /** Hydration flag — true on the client once localStorage has been read. */
  hydrated: boolean;
}

interface Actions {
  setHydrated(v: boolean): void;
  reset(): void;
  setOnboarding(opts: {
    name: string;
    knownLang: LanguageId;
    targetLang: LanguageId;
    level: SkillLevel;
  }): void;
  ensureModuleProgress(moduleId: string): ModuleProgress;
  completeLesson(moduleId: string, lessonId: string, xp: number): void;
  recordQuizResult(
    moduleId: string,
    score: number,
    rewardXp: number,
    totalQs: number,
    correctQs: number,
    completedModule: boolean,
    debugCorrect: boolean,
  ): void;
  addSeconds(seconds: number): void;
  dismissReward(id: number): void;
}

let rewardIdCounter = 1;

export const useGameStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      profile: initialProfile,
      rewardQueue: [],
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      reset: () => set({ profile: initialProfile, rewardQueue: [] }),
      setOnboarding: ({ name, knownLang, targetLang, level }) => {
        set((s) => ({
          profile: {
            ...s.profile,
            name: name || "Chieftain",
            knownLang,
            targetLang,
            level,
            onboarded: true,
          },
        }));
        syncProfile(get().profile);
      },
      ensureModuleProgress: (moduleId) => {
        const existing = get().profile.progress[moduleId];
        if (existing) return existing;
        const fresh: ModuleProgress = {
          moduleId,
          completedLessonIds: [],
          quizBestScore: 0,
          completed: false,
        };
        set((s) => ({
          profile: {
            ...s.profile,
            progress: { ...s.profile.progress, [moduleId]: fresh },
          },
        }));
        return fresh;
      },
      completeLesson: (moduleId, lessonId, xp) => {
        const prev = get().profile;
        const prevLevel = Math.floor(prev.xp / 100); // rough — replaced below
        const mp =
          prev.progress[moduleId] ?? {
            moduleId,
            completedLessonIds: [],
            quizBestScore: 0,
            completed: false,
          };
        if (mp.completedLessonIds.includes(lessonId)) return;
        const next: UserProfile = {
          ...prev,
          xp: prev.xp + xp,
          progress: {
            ...prev.progress,
            [moduleId]: {
              ...mp,
              completedLessonIds: [...mp.completedLessonIds, lessonId],
            },
          },
          ...bumpStreak(prev),
        };
        next.unlockedAchievements = evaluateAchievements(next);
        const newlyUnlocked = next.unlockedAchievements.filter(
          (a) => !prev.unlockedAchievements.includes(a),
        );

        const queue: RewardEvent[] = [
          {
            id: rewardIdCounter++,
            kind: "xp",
            title: "+" + xp + " XP",
            amount: xp,
          },
          ...newlyUnlocked.map<RewardEvent>((id) => ({
            id: rewardIdCounter++,
            kind: "achievement",
            title: "Achievement unlocked!",
            icon: id,
          })),
        ];
        // Level-up check using stricter math from engine
        // We import lazily here to avoid a top-level cycle.
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { levelForXp } = require("./engine") as typeof import("./engine");
        const oldLvl = levelForXp(prev.xp);
        const newLvl = levelForXp(next.xp);
        if (newLvl > oldLvl) {
          queue.push({
            id: rewardIdCounter++,
            kind: "levelup",
            title: "Level " + newLvl + "!",
          });
        }
        void prevLevel;

        set((s) => ({
          profile: next,
          rewardQueue: [...s.rewardQueue, ...queue],
        }));
        syncProfile(next);
        syncModule(next, moduleId);
      },
      recordQuizResult: (
        moduleId,
        score,
        rewardXp,
        totalQs,
        correctQs,
        completedModule,
        debugCorrect,
      ) => {
        const prev = get().profile;
        const mp =
          prev.progress[moduleId] ?? {
            moduleId,
            completedLessonIds: [],
            quizBestScore: 0,
            completed: false,
          };
        const newBest = Math.max(mp.quizBestScore, score);
        const next: UserProfile = {
          ...prev,
          xp: prev.xp + rewardXp,
          progress: {
            ...prev.progress,
            [moduleId]: {
              ...mp,
              quizBestScore: newBest,
              completed: mp.completed || completedModule,
            },
          },
          quizAccuracyHistory: [
            ...prev.quizAccuracyHistory,
            {
              date: new Date().toISOString().slice(0, 10),
              correct: correctQs,
              total: totalQs,
            },
          ],
          ...bumpStreak(prev),
        };
        // Seed "debugger" achievement check
        if (debugCorrect && !next.unlockedAchievements.includes("__debugger_seed__")) {
          next.unlockedAchievements = [
            ...next.unlockedAchievements,
            "__debugger_seed__",
          ];
        }
        next.unlockedAchievements = evaluateAchievements(next);
        const newlyUnlocked = next.unlockedAchievements.filter(
          (a) => !prev.unlockedAchievements.includes(a) && !a.startsWith("__"),
        );
        const queue: RewardEvent[] = [
          {
            id: rewardIdCounter++,
            kind: "xp",
            title: "+" + rewardXp + " XP",
            amount: rewardXp,
          },
          ...newlyUnlocked.map<RewardEvent>((id) => ({
            id: rewardIdCounter++,
            kind: "achievement",
            title: "Achievement unlocked!",
            icon: id,
          })),
        ];
        if (completedModule && !mp.completed) {
          queue.push({
            id: rewardIdCounter++,
            kind: "module",
            title: "Module conquered!",
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { levelForXp } = require("./engine") as typeof import("./engine");
        const oldLvl = levelForXp(prev.xp);
        const newLvl = levelForXp(next.xp);
        if (newLvl > oldLvl) {
          queue.push({
            id: rewardIdCounter++,
            kind: "levelup",
            title: "Level " + newLvl + "!",
          });
        }
        set((s) => ({
          profile: next,
          rewardQueue: [...s.rewardQueue, ...queue],
        }));
        syncProfile(next);
        syncModule(next, moduleId);
        syncQuizAttempt(moduleId, correctQs, totalQs);
      },
      addSeconds: (seconds) =>
        set((s) => ({
          profile: {
            ...s.profile,
            totalSecondsLearned: s.profile.totalSecondsLearned + seconds,
          },
        })),
      dismissReward: (id) =>
        set((s) => ({
          rewardQueue: s.rewardQueue.filter((r) => r.id !== id),
        })),
    }),
    {
      name: "codequest-profile-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ profile: s.profile }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
