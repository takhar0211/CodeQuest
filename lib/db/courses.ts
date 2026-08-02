import { getSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Course, Module, Lesson, QuizQuestion, LanguageId } from "@/lib/types";

/**
 * Fetches a full course tree (Course -> Modules -> Lessons + Quizzes) from Supabase.
 */
export async function fetchCourseFromSupabase(
  known: LanguageId,
  target: LanguageId
): Promise<Course | undefined> {
  const supabase = getSupabaseBrowserClient();
  
  const { data, error } = await supabase
    .from("courses")
    .select(`
      id,
      known_lang,
      target_lang,
      title,
      description,
      modules (
        id,
        title,
        description,
        level,
        order_index,
        lessons (
          id,
          title,
          intro,
          real_world,
          order_index,
          lesson_comparisons (
            concept,
            known_code,
            target_code,
            explanation,
            order_index
          )
        ),
        quiz_questions (
          question,
          code_snippet,
          options,
          correct_index,
          explanation,
          order_index
        )
      )
    `)
    .eq("known_lang", known)
    .eq("target_lang", target)
    .maybeSingle();

  if (error) {
    console.error("fetchCourse error:", error);
    return undefined;
  }
  if (!data) return undefined;

  // Map the raw Postgres JSON shape back to our TS types.
  
  const modules: Module[] = (data.modules as any[] || [])
    .sort((a, b) => a.order_index - b.order_index)
    .map(mod => ({
      id: mod.id,
      title: mod.title,
      tagline: mod.tagline,
      icon: mod.icon,
      level: mod.level,
      order: mod.order_index,
      requires: mod.requires,
      rewardXp: mod.reward_xp,
      lessons: (mod.lessons as any[] || [])
        .sort((a, b) => a.order_index - b.order_index)
        .map(les => ({
          id: les.id,
          title: les.title,
          intro: les.intro,
          realWorld: les.real_world,
          exercise: les.exercise,
          order: les.order_index,
          comparisons: (les.lesson_comparisons as any[] || [])
            .sort((a, b) => a.order_index - b.order_index)
            .map(c => ({
              concept: c.concept,
              knownCode: c.known_code,
              targetCode: c.target_code,
              note: c.note
            }))
        })),
      quiz: (mod.quiz_questions as any[] || [])
        .sort((a, b) => a.order_index - b.order_index)
        .map(q => ({
          kind: q.kind,
          id: q.id,
          prompt: q.prompt,
          brokenCode: q.broken_code,
          choices: q.choices,
          correctIndex: q.correct_index,
          explanation: q.explanation,
          xp: q.xp
        }))
    }));

  return {
    id: data.id,
    knownLang: data.known_lang as LanguageId,
    targetLang: data.target_lang as LanguageId,
    title: data.title,
    modules
  };
}

/**
 * Fetch all available language pairs (e.g. for the onboarding screen).
 */
export async function fetchAvailablePairs(): Promise<{knownLang: LanguageId, targetLang: LanguageId}[]> {
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase.from("courses").select("known_lang, target_lang");
  if (!data) return [];
  return data.map(d => ({
    knownLang: d.known_lang as LanguageId,
    targetLang: d.target_lang as LanguageId
  }));
}
