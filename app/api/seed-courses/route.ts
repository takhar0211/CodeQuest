import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { COURSES } from "@/lib/content/courses";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      return NextResponse.json({ error: "Missing Supabase env vars" }, { status: 500 });
    }

    const supabase = createClient(url, key, { auth: { persistSession: false } });

    // 1. Bulk Upsert Courses
    const coursesToInsert = COURSES.map(c => ({
      known_lang: c.knownLang,
      target_lang: c.targetLang,
      title: c.title,
    }));
    
    const { data: coursesData, error: coursesErr } = await supabase
      .from("courses")
      .upsert(coursesToInsert, { onConflict: "known_lang,target_lang" })
      .select("id, known_lang, target_lang");
      
    if (coursesErr || !coursesData) {
      return NextResponse.json({ error: "Failed to upsert courses", details: coursesErr }, { status: 500 });
    }

    const courseIdMap = new Map<string, string>();
    for (const c of coursesData) {
      courseIdMap.set(`${c.known_lang}-${c.target_lang}`, c.id);
    }

    // 2. Bulk Upsert Modules
    const modulesToInsert = [];
    for (const c of COURSES) {
      const courseId = courseIdMap.get(`${c.knownLang}-${c.targetLang}`);
      for (const m of c.modules) {
        modulesToInsert.push({
          id: m.id,
          course_id: courseId,
          title: m.title,
          tagline: m.tagline,
          icon: m.icon,
          level: m.level,
          order_index: m.order,
          requires: m.requires,
          reward_xp: m.rewardXp,
        });
      }
    }

    const { error: modulesErr } = await supabase
      .from("modules")
      .upsert(modulesToInsert, { onConflict: "id" });

    if (modulesErr) {
      return NextResponse.json({ error: "Failed to upsert modules", details: modulesErr }, { status: 500 });
    }

    // 3. Bulk Upsert Lessons
    const lessonsToInsert = [];
    for (const c of COURSES) {
      for (const m of c.modules) {
        for (let i = 0; i < m.lessons.length; i++) {
          const l = m.lessons[i];
          lessonsToInsert.push({
            id: l.id,
            module_id: m.id,
            title: l.title,
            intro: l.intro,
            real_world: l.realWorld || null,
            exercise: l.exercise,
            order_index: i,
          });
        }
      }
    }

    const { error: lessonsErr } = await supabase
      .from("lessons")
      .upsert(lessonsToInsert, { onConflict: "id" });

    if (lessonsErr) {
      return NextResponse.json({ error: "Failed to upsert lessons", details: lessonsErr }, { status: 500 });
    }

    // 4. Bulk Insert Comparisons & Quizzes
    // Delete all existing to prevent duplicates on re-run
    await supabase.from("lesson_comparisons").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase.from("quiz_questions").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const compsToInsert = [];
    const quizzesToInsert = [];

    for (const c of COURSES) {
      for (const m of c.modules) {
        for (const l of m.lessons) {
          for (let i = 0; i < l.comparisons.length; i++) {
            const comp = l.comparisons[i];
            compsToInsert.push({
              lesson_id: l.id,
              concept: comp.concept,
              known_code: comp.knownCode,
              target_code: comp.targetCode,
              note: comp.note || null,
              order_index: i,
            });
          }
        }
        
        if (m.quiz) {
          for (let i = 0; i < m.quiz.length; i++) {
            const q = m.quiz[i];
            quizzesToInsert.push({
              module_id: m.id,
              kind: q.kind,
              prompt: q.prompt,
              choices: q.choices,
              broken_code: q.kind === "debug" ? q.brokenCode : null,
              correct_index: q.correctIndex,
              explanation: q.explanation,
              xp: q.xp,
              order_index: i,
            });
          }
        }
      }
    }

    // Insert chunks to avoid payload size limits
    const CHUNK_SIZE = 500;
    
    for (let i = 0; i < compsToInsert.length; i += CHUNK_SIZE) {
      const chunk = compsToInsert.slice(i, i + CHUNK_SIZE);
      const { error: compErr } = await supabase.from("lesson_comparisons").insert(chunk);
      if (compErr) return NextResponse.json({ error: "Failed to insert comparisons", details: compErr }, { status: 500 });
    }

    for (let i = 0; i < quizzesToInsert.length; i += CHUNK_SIZE) {
      const chunk = quizzesToInsert.slice(i, i + CHUNK_SIZE);
      const { error: quizErr } = await supabase.from("quiz_questions").insert(chunk);
      if (quizErr) return NextResponse.json({ error: "Failed to insert quizzes", details: quizErr }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      stats: {
        coursesAdded: coursesToInsert.length,
        modulesAdded: modulesToInsert.length,
        lessonsAdded: lessonsToInsert.length,
        comparisonsAdded: compsToInsert.length,
        quizzesAdded: quizzesToInsert.length,
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
