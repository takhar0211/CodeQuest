import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  LanguageId,
  ModuleProgress,
  SkillLevel,
  UserProfile,
} from "@/lib/types";

/**
 * Translate between the zustand UserProfile (camelCase, in-memory) and the
 * Postgres row shape (snake_case, server of truth).
 */

interface ProfileRow {
  id: string;
  email: string | null;
  display_name: string;
  known_lang: string | null;
  target_lang: string | null;
  skill_level: SkillLevel;
  xp: number;
  streak_days: number;
  last_active_date: string | null;
  total_seconds_learned: number;
  unlocked_achievements: string[];
  weak_topics: string[];
  onboarded: boolean;
}

interface ModuleProgressRow {
  user_id: string;
  module_id: string;
  completed_lesson_ids: string[];
  quiz_best_score: number;
  completed: boolean;
}

interface QuizHistoryRow {
  user_id: string;
  module_id: string | null;
  taken_on: string;
  correct: number;
  total: number;
}

export async function loadProfileFromSupabase(
  supabase: SupabaseClient,
  userId: string,
): Promise<UserProfile | null> {
  const [{ data: row, error: profileErr }, { data: progressRows }, { data: quizRows }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select(
          "id,email,display_name,known_lang,target_lang,skill_level,xp,streak_days,last_active_date,total_seconds_learned,unlocked_achievements,weak_topics,onboarded",
        )
        .eq("id", userId)
        .maybeSingle<ProfileRow>(),
      supabase
        .from("module_progress")
        .select("module_id,completed_lesson_ids,quiz_best_score,completed")
        .eq("user_id", userId),
      supabase
        .from("quiz_history")
        .select("taken_on,correct,total")
        .eq("user_id", userId)
        .order("taken_on", { ascending: true })
        .limit(100),
    ]);

  if (profileErr) {
    console.warn("loadProfile error", profileErr);
    return null;
  }
  if (!row) return null;

  const progress: Record<string, ModuleProgress> = {};
  for (const r of progressRows ?? []) {
    const typed = r as Pick<
      ModuleProgressRow,
      "module_id" | "completed_lesson_ids" | "quiz_best_score" | "completed"
    >;
    progress[typed.module_id] = {
      moduleId: typed.module_id,
      completedLessonIds: typed.completed_lesson_ids ?? [],
      quizBestScore: typed.quiz_best_score ?? 0,
      completed: typed.completed ?? false,
    };
  }

  return {
    name: row.display_name,
    knownLang: (row.known_lang as LanguageId) ?? null,
    targetLang: (row.target_lang as LanguageId) ?? null,
    level: row.skill_level,
    xp: row.xp,
    streakDays: row.streak_days,
    lastActiveDate: row.last_active_date,
    unlockedAchievements: row.unlocked_achievements ?? [],
    progress,
    totalSecondsLearned: row.total_seconds_learned,
    quizAccuracyHistory: (quizRows ?? []).map((q) => ({
      date: (q as { taken_on: string }).taken_on,
      correct: (q as { correct: number }).correct,
      total: (q as { total: number }).total,
    })),
    weakTopics: row.weak_topics ?? [],
    onboarded: row.onboarded,
  };
}

export async function saveProfileToSupabase(
  supabase: SupabaseClient,
  userId: string,
  profile: UserProfile,
): Promise<void> {
  const row: Partial<ProfileRow> = {
    id: userId,
    display_name: profile.name,
    known_lang: profile.knownLang,
    target_lang: profile.targetLang,
    skill_level: profile.level,
    xp: profile.xp,
    streak_days: profile.streakDays,
    last_active_date: profile.lastActiveDate,
    total_seconds_learned: profile.totalSecondsLearned,
    unlocked_achievements: profile.unlockedAchievements.filter(
      (a) => !a.startsWith("__"),
    ),
    weak_topics: profile.weakTopics,
    onboarded: profile.onboarded,
  };
  const { error } = await supabase.from("profiles").upsert(row, { onConflict: "id" });
  if (error) console.warn("saveProfile error", error);
}

export async function saveModuleProgressToSupabase(
  supabase: SupabaseClient,
  userId: string,
  mp: ModuleProgress,
): Promise<void> {
  const row: ModuleProgressRow = {
    user_id: userId,
    module_id: mp.moduleId,
    completed_lesson_ids: mp.completedLessonIds,
    quiz_best_score: mp.quizBestScore,
    completed: mp.completed,
  };
  const { error } = await supabase
    .from("module_progress")
    .upsert(row, { onConflict: "user_id,module_id" });
  if (error) console.warn("saveModuleProgress error", error);
}

export async function appendQuizHistory(
  supabase: SupabaseClient,
  userId: string,
  moduleId: string,
  correct: number,
  total: number,
): Promise<void> {
  const row: QuizHistoryRow = {
    user_id: userId,
    module_id: moduleId,
    taken_on: new Date().toISOString().slice(0, 10),
    correct,
    total,
  };
  const { error } = await supabase.from("quiz_history").insert(row);
  if (error) console.warn("appendQuizHistory error", error);
}
