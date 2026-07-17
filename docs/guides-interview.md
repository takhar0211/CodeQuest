# Interview Preparation

## A. Beginner Questions

**Q: What is CodeQuest?**
A: A gamified platform that teaches developers a new programming language by mapping concepts to the one they already know, using side-by-side comparisons, quizzes, and XP-based progression.

**Q: What technologies did you use?**
A: Next.js 15 (App Router), TypeScript, Tailwind CSS, Zustand (state), Supabase (auth + PostgreSQL), Framer Motion (animations), Google Gemini (AI), Pyodide (Python in browser).

**Q: Why TypeScript over JavaScript?**
A: TypeScript catches bugs at compile time. In this project, the deeply nested content types (Course → Module → Lesson → Comparison) would be error-prone without static typing. It also gives better IDE autocomplete.

**Q: How does the routing work?**
A: Next.js file-based routing. Each page is a `page.tsx` file inside the `app/` directory. Dynamic routes use `[brackets]` — e.g., `app/learn/[moduleId]/page.tsx` matches `/learn/any-id-here`.

## B. Intermediate Questions

**Q: How does state management work?**
A: Zustand store holds the user profile (XP, streak, progress, achievements). It's persisted to localStorage via Zustand's `persist` middleware. When authenticated, changes are also synced to Supabase via fire-and-forget upserts.

**Q: How does the code runner work?**
A: JavaScript runs in a hidden iframe with `sandbox="allow-scripts"`. The user's code is injected into an inline script that intercepts `console.log`, captures output, and sends it back via `postMessage`. Python uses Pyodide — a WebAssembly build of CPython loaded from a CDN.

**Q: How does authentication work?**
A: Supabase handles email/password auth. An `AuthProvider` context wraps the app and listens for auth state changes. A middleware refreshes session cookies on every request. When a user logs in, their server-side profile is loaded and injected into the Zustand store.

**Q: What is the hydration problem and how did you solve it?**
A: SSR renders with default state, but the browser has persisted state in localStorage. This mismatch causes a React hydration error. Solution: a `hydrated` flag that starts false — components show a loading state until localStorage is read and the flag becomes true.

## C. Advanced Questions

**Q: How does the Zustand store communicate with Supabase?**
A: Through a "sync bridge" pattern. The AuthProvider sets a module-level variable (`SyncBridge`) with the Supabase client and user. The Zustand store (which isn't a React component and can't use Context) reads this variable before each sync operation. If null, sync is a no-op.

**Q: Why is `"use client"` on every page?**
A: Every page depends on the Zustand store for user profile data, which requires React hooks (`useGameStore`). Server Components can't use hooks. The root `layout.tsx` is a Server Component (no `"use client"`) — it handles HTML structure and metadata without any JavaScript.

**Q: How would you add a new language pair (e.g., Java → Python)?**
A: Add the language to `languages.ts` if missing, then add a new `Course` object to `courses.ts` with modules, lessons, comparisons, and quizzes. No code changes needed — the data shape is the contract.

## D. Architecture Questions

**Q: How does data flow when a user completes a lesson?**
A: CodeRunner detects output match → calls `onSuccess()` → `completeLesson()` in Zustand → updates XP, streak, progress, achievements → pushes rewards to queue → persists to localStorage → fire-and-forget sync to Supabase → RewardOverlay consumes the queue and shows animated popups.

**Q: Why are API routes necessary? Can't the frontend call Gemini directly?**
A: The Gemini API key must stay secret. If the frontend called Gemini directly, the API key would be visible in the browser's network tab. API routes run on the server, keeping the key secure.

## E. System Design Questions

**Q: Design the leaderboard for 1 million users.**
A: Use a Redis sorted set keyed by `xp`. On each XP update, `ZADD leaderboard XP userId`. For top-N: `ZREVRANGE leaderboard 0 49 WITHSCORES`. For "my rank": `ZREVRANK leaderboard userId`. Redis handles millions of entries with sub-millisecond latency. Cache the top-50 in memory with a 1-minute TTL.

**Q: How would you make this a real-time multiplayer experience?**
A: Supabase Realtime for presence (who's online). WebSocket channel for live leaderboard updates. Server-sent events for streak-save notifications. Weekly tournament brackets stored in PostgreSQL with a cron job to compute rankings.

## F. HR + Project Questions

**Q: What was the most challenging part?**
A: "The state synchronization between localStorage (offline), Zustand (in-memory), and Supabase (server). The challenge was ensuring consistency without blocking the UI — fire-and-forget writes with eventual consistency was the pragmatic solution."

**Q: What would you improve?**
A: "Server-authoritative XP to prevent cheating, real-time leaderboard with Redis, streaming AI responses instead of waiting for full completion, unit tests for the game engine, and E2E tests for the critical path."

**Q: Why did you choose this project?**
A: "I wanted to demonstrate full-stack skills: React/Next.js frontend, database design with PostgreSQL, third-party API integration (Gemini, Supabase), state management, and gamification logic. It shows I can build a complete product, not just isolated features."
