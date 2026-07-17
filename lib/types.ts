export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type LanguageId =
  | "python"
  | "javascript"
  | "typescript"
  | "java"
  | "csharp"
  | "go"
  | "rust"
  | "cpp"
  | "ruby"
  | "kotlin"
  | "swift";

export interface Language {
  id: LanguageId;
  name: string;
  emoji: string;
  blurb: string;
}

export interface SyntaxComparison {
  concept: string;
  knownCode: string;
  targetCode: string;
  note?: string;
}

export interface Exercise {
  id: string;
  prompt: string;
  starterCode: string;
  solution: string;
  /** Substring/snippet that must appear in the solution for it to count. */
  expectedOutputIncludes?: string;
  /** Optional stdin for simple single-testcase evaluation. */
  stdin?: string;
  /** Optional multiple testcases to run instead of a single check. */
  testcases?: { stdin: string; expectedOutputIncludes: string }[];
  /** Optional: a JS predicate string-compiled at runtime, given { output, code } */
  successHint?: string;
  xp: number;
}

export type QuizQuestion =
  | {
      kind: "mcq";
      id: string;
      prompt: string;
      choices: string[];
      correctIndex: number;
      explanation: string;
      xp: number;
    }
  | {
      kind: "debug";
      id: string;
      prompt: string;
      brokenCode: string;
      choices: string[];
      correctIndex: number;
      explanation: string;
      xp: number;
    };

export interface Lesson {
  id: string;
  title: string;
  intro: string;
  comparisons: SyntaxComparison[];
  realWorld: string;
  exercise: Exercise;
}

export interface Module {
  id: string;
  title: string;
  tagline: string;
  icon: string; // emoji
  level: SkillLevel;
  /** Order on the kingdom map. */
  order: number;
  /** Modules that must be completed before this unlocks. */
  requires: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  rewardXp: number;
}

export interface Course {
  id: string;
  knownLang: LanguageId;
  targetLang: LanguageId;
  title: string;
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  /** Check function name in lib/game/achievements.ts. */
  check: AchievementCheckId;
}

export type AchievementCheckId =
  | "firstLesson"
  | "fiveLessons"
  | "perfectQuiz"
  | "threeDayStreak"
  | "sevenDayStreak"
  | "level5"
  | "moduleMaster"
  | "debugger";

export interface ModuleProgress {
  moduleId: string;
  completedLessonIds: string[];
  quizBestScore: number; // 0..1
  completed: boolean;
}

export interface UserProfile {
  name: string;
  knownLang: LanguageId | null;
  targetLang: LanguageId | null;
  level: SkillLevel;
  xp: number;
  streakDays: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  unlockedAchievements: string[];
  progress: Record<string, ModuleProgress>;
  totalSecondsLearned: number;
  quizAccuracyHistory: { date: string; correct: number; total: number }[];
  weakTopics: string[];
  onboarded: boolean;
}
