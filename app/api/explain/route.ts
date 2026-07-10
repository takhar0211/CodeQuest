import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMsg {
  role: "user" | "model";
  text: string;
}

interface Body {
  messages: ChatMsg[];
  context: {
    lessonTitle: string;
    lessonIntro: string;
    knownLang: string;
    targetLang: string;
    comparisons: { concept: string; knownCode: string; targetCode: string; note?: string }[];
    realWorld?: string;
    focusComparisonIndex?: number;
  };
}

const DEFAULT_MODEL = "gemini-2.5-flash";

function systemPrompt(ctx: Body["context"]): string {
  const focusIdx = ctx.focusComparisonIndex;
  const hasFocus =
    typeof focusIdx === "number" &&
    focusIdx >= 0 &&
    focusIdx < ctx.comparisons.length;
  const focused = hasFocus ? ctx.comparisons[focusIdx!] : null;

  const compBlocks = ctx.comparisons
    .map(
      (c, i) =>
        `### Comparison ${i + 1}: ${c.concept}` +
        (hasFocus && i === focusIdx ? "  ← FOCUS" : "") +
        `\n\n[${ctx.knownLang}]\n\`\`\`\n${c.knownCode}\n\`\`\`\n\n` +
        `[${ctx.targetLang}]\n\`\`\`\n${c.targetCode}\n\`\`\`` +
        (c.note ? `\n\nNote: ${c.note}` : ""),
    )
    .join("\n\n");

  return [
    `You are an expert programming tutor inside a gamified language-learning app called CodeQuest.`,
    `The learner already knows **${ctx.knownLang}** and is learning **${ctx.targetLang}**.`,
    `They are on the lesson "${ctx.lessonTitle}".`,
    ``,
    `Lesson framing (already shown in the UI):`,
    `> ${ctx.lessonIntro}`,
    ``,
    `Side-by-side examples in this lesson:`,
    ``,
    compBlocks,
    ctx.realWorld ? `\nReal-world note already shown:\n> ${ctx.realWorld}` : "",
    focused
      ? `\n**The learner specifically clicked on "${focused.concept}".** Center your opening explanation on that single conversion. Use the other comparisons only as supporting context if directly relevant.`
      : "",
    ``,
    `Your job:`,
    focused
      ? `- Open with a concise (3–6 sentence) deeper explanation of the "${focused.concept}" conversion, focused tightly on what a ${ctx.knownLang} dev would actually trip on in ${ctx.targetLang} for this specific concept.`
      : `- Open with a concise (3–6 sentence) deeper explanation of the conversion shown above, focusing on differences a ${ctx.knownLang} dev would actually trip on in ${ctx.targetLang}.`,
    `- Mention idioms and gotchas, not just syntax.`,
    `- After the opening, answer the learner's follow-up questions naturally — short, concrete, with tiny code snippets when helpful.`,
    `- Use Markdown. Use fenced code blocks with the language tag.`,
    `- Do NOT repeat the comparison table verbatim — they can already see it.`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: Request) {
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
      temperature: 0.4,
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
