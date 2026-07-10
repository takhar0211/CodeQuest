import type { Language } from "@/lib/types";

export const LANGUAGES: Language[] = [
  { id: "python", name: "Python", emoji: "🐍", blurb: "Friendly, readable, batteries included." },
  { id: "javascript", name: "JavaScript", emoji: "🟨", blurb: "Runs everywhere, from browsers to servers." },
  { id: "typescript", name: "TypeScript", emoji: "🟦", blurb: "JavaScript with a real type system." },
  { id: "java", name: "Java", emoji: "☕", blurb: "Verbose, enterprise, JVM-powered." },
  { id: "csharp", name: "C#", emoji: "🎯", blurb: "Polished, expressive, .NET native." },
  { id: "go", name: "Go", emoji: "🐹", blurb: "Simple, fast, built for concurrency." },
  { id: "rust", name: "Rust", emoji: "🦀", blurb: "Safe, fast, zero-cost abstractions." },
  { id: "cpp", name: "C++", emoji: "⚙️", blurb: "Power and control, with sharp edges." },
  { id: "ruby", name: "Ruby", emoji: "💎", blurb: "Optimized for developer happiness." },
  { id: "kotlin", name: "Kotlin", emoji: "🅺", blurb: "Modern JVM language, Android favorite." },
  { id: "swift", name: "Swift", emoji: "🕊️", blurb: "Apple's modern systems & app language." },
];

export const LANG_BY_ID = Object.fromEntries(
  LANGUAGES.map((l) => [l.id, l]),
) as Record<string, Language>;
