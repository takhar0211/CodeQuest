# Complete Revision Notes

## 5-Minute Revision

**What:** CodeQuest — gamified language learning via side-by-side comparisons
**Tech:** Next.js 15, TypeScript, Tailwind, Zustand, Supabase, Gemini, Pyodide
**Architecture:** Client-rendered SPA with API routes for AI, optional Supabase auth + DB
**State:** Zustand → localStorage → fire-and-forget Supabase sync
**Code execution:** Browser-only (JS iframe, Python Pyodide WASM)
**Gamification:** Triangular XP curve, streaks, prerequisites, 8 achievements
**Database:** 3 tables (profiles, module_progress, quiz_history) with RLS
**AI:** 2 API routes proxying to Gemini (explain + mentor)
**Key pattern:** Data-driven content — add courses by adding data objects, zero code changes

## 15-Minute Revision

**Add to above:**

**Folder structure:** `app/` (pages+API), `components/` (UI), `lib/` (logic)
**Key files:**
- `lib/types.ts` — All data shapes (the contract)
- `lib/game/store.ts` — Zustand store with persist + sync
- `lib/game/engine.ts` — Pure functions for XP, streak, unlock
- `middleware.ts` — Session cookie refresh
- `components/auth/AuthProvider.tsx` — React Context for auth
- `lib/sync/bridge.ts` — Module-level bridge for store→Supabase

**User flow:** Landing → Onboarding (4 steps) → Dashboard (kingdom map) → Lesson (comparisons + exercise) → Quiz (MCQ + debug) → Reward → Next module unlocks

**Design decisions:**
- Next.js over React: routing + API routes + single deploy
- Zustand over Redux: less boilerplate, persist middleware
- Supabase over Firebase: PostgreSQL + RLS + open source
- Client code execution: zero infra cost

**Database:** auth.users → profiles (1:1), → module_progress (1:N), → quiz_history (1:N). RLS ensures user isolation. Trigger auto-create profile on signup.

## 30-Minute Revision

**Add to above:**

**Code runner detail:** JS iframe uses `postMessage` channel pattern. Python uses Pyodide lazy-loaded from CDN. Both have timeouts. Output compared via `normalize(output).includes(normalize(expected))`.

**Gamification detail:** XP curve: `100 * n * (n+1) / 2`. Module progress: `0.7 * lessons_done + 0.3 * quiz_best`. Module completion: quiz ≥ 60%. Achievements: pure-function checkers evaluated after every progress event.

**Hydration detail:** SSR renders default state → localStorage has real state → mismatch → `hydrated` flag pattern. Zustand's `onRehydrateStorage` + fallback `setTimeout(50ms)`.

**Auth detail:** Supabase email/password. Middleware refreshes cookies. AuthProvider listens to `onAuthStateChange`. SyncBridge pattern lets non-React code (Zustand store) access Supabase. Guest mode works fully without auth.

**API route detail:** Both routes follow same pattern: validate API key → parse body → build system prompt with context → call Gemini REST API → extract text from response → return JSON. Temperature 0.4 for explain (precise), 0.6 for mentor (creative).

**Security:** RLS on all tables, API key server-side, sandboxed execution, session refresh. Missing: rate limiting, input validation, anti-cheat.

**Scaling:** Need Redis leaderboard, server-authoritative XP, streaming AI, database for content, CDN for assets, monitoring.

## One-Page Cheat Sheet

```
PROJECT: CodeQuest — gamified language-to-language learning platform
STACK: Next.js 15 | TypeScript | Tailwind CSS | Zustand | Supabase | Gemini | Pyodide
ARCHITECTURE: Client-rendered SPA + 2 API routes + optional Supabase backend

PAGES: / → /onboarding → /dashboard → /learn/[id] → /quiz/[id] → /achievements, /leaderboard, /mentor, /login, /signup
APIS: POST /api/explain (lesson chat), POST /api/mentor (free chat) — both proxy to Gemini

STATE: Zustand → localStorage (persist) → Supabase (fire-and-forget sync via SyncBridge)
AUTH: Supabase email/password. AuthProvider (Context). Middleware refreshes cookies. Guest mode works.

DATABASE (3 tables):
  profiles:        id(FK auth.users), display_name, xp, streak, achievements[], onboarded
  module_progress: user_id, module_id, completed_lesson_ids[], quiz_best_score, completed
  quiz_history:    user_id, module_id, taken_on, correct, total
  RLS: user can only see own rows. Trigger: auto-create profile on signup.

GAMIFICATION:
  XP curve: 100*n*(n+1)/2 (triangular)
  Streak: consecutive-day tracking
  Module unlock: requires[] prerequisites
  Progress: 0.7*lessons + 0.3*quiz
  Completion: quiz ≥ 60%
  8 achievements with pure-function checkers

CODE RUNNERS:
  JS: hidden iframe + sandbox + postMessage (2s timeout)
  Python: Pyodide WASM lazy-loaded from CDN (8s timeout)

KEY DESIGN DECISIONS:
  Next.js: routing + API routes + single deploy
  Zustand: tiny, persist, efficient selectors (vs Redux/Context)
  Supabase: PostgreSQL + RLS + open source (vs Firebase)
  Client execution: zero infra, instant feedback
  Data-driven content: add courses = add data objects

INTERVIEW TIPS:
  30s: "Gamified platform teaching new language via side-by-side comparisons"
  2min: Add tech stack, state management, AI integration, code runners
  5min: Add database design, auth flow, scalability considerations
  Senior: Discuss trade-offs, scaling to 1M users, anti-cheat, streaming AI
```

---

# Improvements & Future Roadmap

## What Can Be Improved Now

| Area | Issue | Improvement |
|------|-------|-------------|
| **Testing** | No tests at all | Add Jest/Vitest unit tests for engine.ts, achievements.ts; Playwright E2E for critical flows |
| **Error boundaries** | No React error boundaries | Add `error.tsx` files per route segment |
| **Loading states** | Minimal loading UI | Add `loading.tsx` files per route segment |
| **Accessibility** | No ARIA labels, no keyboard nav for quiz | Add proper a11y attributes |
| **SEO** | Pages are client-rendered | Add metadata to each page |
| **Code editor** | Plain textarea | Integrate Monaco Editor or CodeMirror |
| **Offline support** | None | Add service worker for PWA |

## What Should Be Refactored

1. **Course content in code** → Move to database (Prisma + PostgreSQL)
2. **Hardcoded leaderboard** → Real-time from database or Redis
3. **No input validation on API routes** → Add Zod schemas
4. **Magic strings** → Use enums for achievement IDs, language IDs
5. **`require("./engine")` in store** → Use top-level import (circular dependency workaround can be eliminated with a restructure)

## Production-Grade Additions

- **Rate limiting** on `/api/explain` and `/api/mentor` (Redis)
- **Streaming AI responses** (SSE/ReadableStream) instead of waiting for full response
- **Server-side progress validation** (XP can only increase server-side)
- **Admin panel** for content management
- **Analytics** (PostHog, Mixpanel) for tracking conversion funnel
- **Mobile app** via React Native + Expo sharing the API

## Technical Debt Identified

1. **Every page has the same hydration boilerplate** — Could be extracted to a custom hook `useHydration()`
2. **Fire-and-forget sync errors are silently swallowed** — Should queue for retry
3. **`let rewardIdCounter = 1`** is module-level mutable state — Works but not idiomatic
4. **SimpleMarkdown is hand-rolled** — Fine for now, but `react-markdown` would handle edge cases better
5. **No environment variable validation** — Should use a library like `t3-env` for build-time validation
