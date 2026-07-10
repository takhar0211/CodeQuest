"use client";

import { Fragment } from "react";

/**
 * Tiny markdown renderer for chat bubbles. Handles:
 * - fenced code blocks ```lang
 * - inline `code`
 * - **bold** and *italic*
 * - newlines → <br/>
 * Anything fancier and we'd pull in react-markdown; this stays dependency-free.
 */
export function SimpleMarkdown({ text }: { text: string }) {
  const parts = splitFencedCode(text);
  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {parts.map((p, i) =>
        p.kind === "code" ? (
          <pre
            key={i}
            className="code bg-bark-900 text-parchment-50 p-3 rounded-lg overflow-x-auto text-xs"
          >
            {p.lang && (
              <div className="text-gold-400 text-[10px] mb-1 font-display">
                {p.lang}
              </div>
            )}
            <code>{p.text}</code>
          </pre>
        ) : (
          <p key={i} className="whitespace-pre-wrap">
            {renderInline(p.text)}
          </p>
        ),
      )}
    </div>
  );
}

type Part = { kind: "text"; text: string } | { kind: "code"; lang: string; text: string };

function splitFencedCode(input: string): Part[] {
  const out: Part[] = [];
  const re = /```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input)) !== null) {
    if (m.index > last) out.push({ kind: "text", text: input.slice(last, m.index) });
    out.push({ kind: "code", lang: m[1] || "", text: m[2] });
    last = m.index + m[0].length;
  }
  if (last < input.length) out.push({ kind: "text", text: input.slice(last) });
  return out;
}

function renderInline(text: string) {
  // Split on inline code first, then handle bold/italic in the text spans.
  const codeRe = /`([^`]+)`/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = codeRe.exec(text)) !== null) {
    if (m.index > last)
      nodes.push(
        <Fragment key={key++}>{renderBoldItalic(text.slice(last, m.index), key++)}</Fragment>,
      );
    nodes.push(
      <code
        key={key++}
        className="code text-gold-400 bg-bark-900/70 px-1 rounded"
      >
        {m[1]}
      </code>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length)
    nodes.push(<Fragment key={key++}>{renderBoldItalic(text.slice(last), key++)}</Fragment>);
  return nodes;
}

function renderBoldItalic(text: string, baseKey: number) {
  // Replace **bold** then *italic*.
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = baseKey * 1000;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={key++}>{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<em key={key++}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
