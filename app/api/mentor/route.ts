import { NextResponse } from "next/server";
import { getSupabaseServerClient as createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

interface ChatMsg {
  role: "user" | "model";
  text: string;
}

interface Body {
  messages: ChatMsg[];
  context: {
    name?: string;
    knownLang: string;
    targetLang: string;
    level?: string;
  };
}

const DEFAULT_MODEL = "gemini-2.5-flash";

function systemPrompt(ctx: Body["context"]): string {
  return [
    `You are **Brogan the Bard**, an AI mentor inside a gamified language-learning app called CodeQuest.`,
    `The user${ctx.name ? ' (named "' + ctx.name + '")' : ""} already knows **${ctx.knownLang}** and is learning **${ctx.targetLang}**.`,
    ctx.level
      ? `Their self-reported skill rank is **${ctx.level}** — calibrate explanation depth accordingly.`
      : ``,
    ``,
    `Persona & voice:`,
    `- You speak warmly but concisely, with the occasional bardic flourish — but **never** sacrifice clarity for theme.`,
    `- You are an experienced engineer first, a character second. Most messages should sound like a senior dev pair-programming, not a Renaissance fair.`,
    ``,
    `Your job:`,
    `- Help the learner translate concepts from ${ctx.knownLang} into ${ctx.targetLang} (and vice-versa when asked).`,
    `- Diagnose code they paste. Point out the bug, then explain *why* it bites in ${ctx.targetLang} specifically (mutability, scoping, equality, typing, etc.).`,
    `- Prefer **short, concrete answers with tiny code snippets** over long lectures. 3–6 sentences is usually right.`,
    `- Use Markdown. Use fenced code blocks with a language tag (e.g. \`\`\`${ctx.targetLang.toLowerCase()}).`,
    `- When the user asks something off-topic from learning ${ctx.targetLang}, gently steer back ("That's outside my keep — want to bring it back to ${ctx.targetLang}?"). Do NOT refuse pleasantries, jokes, or motivation — be a real mentor.`,
    `- Never invent APIs. If you're unsure, say so and suggest where they'd verify (official docs, REPL).`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { success } = rateLimit(`mentor_${user.id}`, 20, 60000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "Missing GEMINI_API_KEY. Copy .env.example to .env.local and set the key, then restart the dev server.",
      },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body?.context || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: "Body must include `context` and `messages`." },
      { status: 400 },
    );
  }

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const contents = body.messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const geminiBody = {
    systemInstruction: { parts: [{ text: systemPrompt(body.context) }] },
    contents,
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 1024,
    },
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify(geminiBody),
    });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "Gemini fetch failed: " + (e instanceof Error ? e.message : String(e)) },
      { status: 502 },
    );
  }

  if (!res.ok) {
    const errText = await res.text();
    return NextResponse.json(
      { error: `Gemini returned ${res.status}: ${errText.slice(0, 500)}` },
      { status: res.status },
    );
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("") ?? "";

  if (!text) {
    return NextResponse.json(
      {
        error:
          "Gemini returned no text. This usually means the response was blocked by safety filters.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ text });
}
