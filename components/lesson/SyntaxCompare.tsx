"use client";

import { Sparkles } from "lucide-react";
import { LANG_BY_ID } from "@/lib/content/languages";
import type { LanguageId, SyntaxComparison } from "@/lib/types";

export function SyntaxCompare({
  knownLang,
  targetLang,
  comparison,
  onExplain,
}: {
  knownLang: LanguageId;
  targetLang: LanguageId;
  comparison: SyntaxComparison;
  onExplain?: () => void;
}) {
  return (
    <div className="panel-parchment p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="font-display text-lg text-bark-900">
          {comparison.concept}
        </div>
        {onExplain && (
          <button
            onClick={onExplain}
            className="btn-ember text-xs px-3 py-1.5 shrink-0"
            title="Ask Gemini to explain this conversion"
          >
            <Sparkles size={14} /> View explanation
          </button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <CodeBlock
          lang={knownLang}
          code={comparison.knownCode}
          tone="known"
        />
        <CodeBlock
          lang={targetLang}
          code={comparison.targetCode}
          tone="target"
        />
      </div>
      {comparison.note && (
        <div className="mt-3 text-sm text-bark-800 italic">
          ⚠ {comparison.note}
        </div>
      )}
    </div>
  );
}

function CodeBlock({
  lang,
  code,
  tone,
}: {
  lang: LanguageId;
  code: string;
  tone: "known" | "target";
}) {
  const meta = LANG_BY_ID[lang];
  return (
    <div className="rounded-lg overflow-hidden border-2 border-bark-900">
      <div
        className={
          "px-3 py-1.5 font-display text-sm flex items-center gap-2 " +
          (tone === "known"
            ? "bg-bark-800 text-parchment-50"
            : "bg-gold-600 text-bark-900")
        }
      >
        <span>{meta?.emoji}</span>
        <span>{meta?.name}</span>
        <span className="ml-auto text-[10px] opacity-80">
          {tone === "known" ? "you know" : "you'll learn"}
        </span>
      </div>
      <pre className="code bg-royal-900 text-parchment-50 p-3 text-sm whitespace-pre-wrap leading-relaxed">
        {code}
      </pre>
    </div>
  );
}
