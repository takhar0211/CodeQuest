"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sword } from "lucide-react";
import { ClientShell } from "@/components/ClientShell";
import { SyntaxCompare } from "@/components/lesson/SyntaxCompare";
import { CodeRunner } from "@/components/lesson/CodeRunner";
import { ExplanationChat } from "@/components/lesson/ExplanationChat";
import { useGameStore } from "@/lib/game/store";
import { findCourse } from "@/lib/content/courses";
import { isModuleUnlocked } from "@/lib/game/engine";

export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  const router = useRouter();
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);
  const completeLesson = useGameStore((s) => s.completeLesson);
  const ensureModule = useGameStore((s) => s.ensureModuleProgress);

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

  const mod = course?.modules.find((m) => m.id === moduleId);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [explainIdx, setExplainIdx] = useState<number | null>(null);

  useEffect(() => {
    if (mod) ensureModule(mod.id);
  }, [mod, ensureModule]);

  useEffect(() => {
    setExplainIdx(null);
  }, [lessonIdx, moduleId]);

  if (!course || !mod) {
    return (
      <ClientShell>
        <NotFoundCard />
      </ClientShell>
    );
  }

  if (!isModuleUnlocked(mod, profile)) {
    return (
      <ClientShell>
        <LockedCard moduleTitle={mod.title} />
      </ClientShell>
    );
  }

  const lesson = mod.lessons[lessonIdx];
  const progress = profile.progress[mod.id];
  const lessonDone =
    progress?.completedLessonIds.includes(lesson.id) ?? false;
  const allLessonsDone =
    mod.lessons.every((l) =>
      progress?.completedLessonIds.includes(l.id),
    ) ?? false;

  return (
    <ClientShell>
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link href="/dashboard" className="btn-stone text-sm">
          <ArrowLeft size={16} /> Map
        </Link>
        <div className="text-right">
          <div className="font-display text-2xl sm:text-3xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
            {mod.icon} {mod.title}
          </div>
          <div className="text-sm text-parchment-100/90 font-body">
            Lesson {lessonIdx + 1} of {mod.lessons.length}
          </div>
        </div>
      </div>

      <article className="panel-wood p-5 space-y-4">
        <header>
          <h1 className="font-display text-3xl text-gold-400">
            {lesson.title}
          </h1>
          <p className="font-body text-parchment-50 mt-2 leading-relaxed">
            {lesson.intro}
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-display text-xl text-gold-400">
            Side-by-side
          </h2>
          {lesson.comparisons.map((c, i) => (
            <SyntaxCompare
              key={i}
              knownLang={course.knownLang}
              targetLang={course.targetLang}
              comparison={c}
              onExplain={() => setExplainIdx(i)}
            />
          ))}
        </section>

        <section>
          <h2 className="font-display text-xl text-gold-400">
            In the wild
          </h2>
          <div className="panel-parchment p-3 mt-2 text-bark-900 text-sm">
            {lesson.realWorld}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl text-gold-400">
            Forge it yourself
          </h2>
          <CodeRunner
            language={course.targetLang}
            exercise={lesson.exercise}
            alreadyCompleted={lessonDone}
            onSuccess={() => completeLesson(mod.id, lesson.id, lesson.exercise.xp)}
          />
        </section>
      </article>

      <nav className="mt-5 flex items-center justify-between">
        <button
          onClick={() => setLessonIdx((i) => Math.max(0, i - 1))}
          disabled={lessonIdx === 0}
          className="btn-stone disabled:opacity-40"
        >
          <ArrowLeft size={16} /> Previous
        </button>

        {lessonIdx < mod.lessons.length - 1 ? (
          <button
            onClick={() => setLessonIdx((i) => i + 1)}
            className="btn-gold"
          >
            Next lesson <ArrowRight size={18} />
          </button>
        ) : (
          <Link
            href={"/quiz/" + mod.id}
            className={"btn-ember " + (!allLessonsDone ? "opacity-80" : "")}
            aria-disabled={!allLessonsDone}
          >
            <Sword size={18} /> Take the trial
          </Link>
        )}
      </nav>

      <ExplanationChat
        open={explainIdx !== null}
        onClose={() => setExplainIdx(null)}
        lesson={lesson}
        knownLang={course.knownLang}
        targetLang={course.targetLang}
        focusComparisonIndex={explainIdx}
      />
    </ClientShell>
  );
}

function NotFoundCard() {
  return (
    <div className="panel-wood p-6 text-center">
      <div className="text-5xl mb-2">🗺️</div>
      <h2 className="font-display text-2xl text-gold-400">
        That territory isn't on our map.
      </h2>
      <Link href="/dashboard" className="btn-gold mt-4 inline-block">
        Back to the kingdom
      </Link>
    </div>
  );
}

function LockedCard({ moduleTitle }: { moduleTitle: string }) {
  return (
    <div className="panel-wood p-6 text-center">
      <div className="text-5xl mb-2">🔒</div>
      <h2 className="font-display text-2xl text-gold-400">
        {moduleTitle} is still sealed.
      </h2>
      <p className="text-parchment-100 mt-2">
        Conquer the previous module first.
      </p>
      <Link href="/dashboard" className="btn-gold mt-4 inline-block">
        Back to the map
      </Link>
    </div>
  );
}
