# CodeQuest

A Clash-of-Clans-inspired, gamified path for learning a new programming language by leveraging the one you already know.

This repo ships a working Next.js 15 MVP plus the architecture, schema, and roadmap below so you can grow it into a real product.

---

## Run it locally

```bash
npm install
cp .env.example .env.local   # fill in GEMINI_API_KEY + Supabase vars (see below)
npm run dev
# open http://localhost:3000
```

The build is verified with `npm run build` — all routes type-check and produce static/dynamic bundles.

### Supabase setup (auth + database)

1. Create a free project at https://supabase.com.
2. **Project Settings → API**: copy the **Project URL** and **anon public** key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```
3. Open the **SQL Editor** and run the contents of `supabase/schema.sql` once. It creates the `profiles`, `module_progress`, and `quiz_history` tables, an `auth.users` → `profiles` trigger, and row-level-security policies so each user only sees their own rows.
4. **Authentication → Providers → Email**: leave the defaults (email + password). For faster local testing, uncheck **"Confirm email"** so you can sign up and sign in immediately.
5. Restart `npm run dev`. The HUD will show a **Sign in** chip; visit `/signup` to create your first user.

Without these vars set, the app still works as a guest (localStorage-only) — login/signup pages show a clear warning instead of crashing.

---

## What's in the MVP

- **Onboarding flow** — name, known language, target language, skill level. Choices persist to `localStorage`.
- **Kingdom dashboard** — winding map of modules with locked/unlocked/conquered states, animated progression, XP bar in the HUD.
- **Lesson view** — side-by-side syntax comparisons (known vs target), real-world notes, and a live in-browser code runner.
  - **JavaScript** runs in a sandboxed iframe (timeouts after 2 s).
  - **Python** runs via Pyodide loaded lazily from a CDN.
- **Quiz screen** — MCQ + debug-the-code questions with instant feedback, animated reward modal.
- **Gamification** — XP curve, levels, daily streaks, 8 achievements, mocked leaderboard.
- **AI mentor** (`/mentor`) — stubbed canned-reply chat with the swap-in point clearly marked.
- **Course content** — full Python → JavaScript course (7 modules, 7 lessons, 15 quiz questions, 7 exercises). JS → Python is seeded as a stub.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router, RSC)** | Single deploy, file-based routing, edge-ready API routes for v2. |
| Language | **TypeScript** | Catches the long-tail of content-shape bugs. |
| Styling | **Tailwind CSS** + custom CSS panels | Fast iteration on the CoC-style "wood/parchment/stone" theme. |
| Animation | **Framer Motion** | Reward popups, page transitions, map reveals. |
| State (client) | **Zustand** + `persist` | Tiny, no boilerplate, free localStorage hydration. |
| Code execution | **Pyodide** (Python WASM) + sandboxed `<iframe>` for JS | Zero infra, free to run, instant feedback. |
| Icons | **lucide-react** | Clean, consistent, tree-shakable. |

For v2 (backend), see the **Scalable backend design** section.

---

## Folder structure

```
.
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing
│   ├── onboarding/page.tsx   # 4-step flow
│   ├── dashboard/page.tsx    # Kingdom map
│   ├── learn/[moduleId]/     # Lesson view + code runner
│   ├── quiz/[moduleId]/      # Quiz + reward screen
│   ├── achievements/page.tsx
│   ├── leaderboard/page.tsx
│   ├── mentor/page.tsx       # Stubbed AI chat
│   └── globals.css           # Theme + panel styles
├── components/
│   ├── ClientShell.tsx       # HUD + reward overlay wrapper
│   ├── hud/                  # Hud, RewardOverlay
│   └── lesson/               # CodeRunner, SyntaxCompare
├── lib/
│   ├── types.ts              # Course/Module/Lesson/Quiz/UserProfile shapes
│   ├── utils.ts              # cn(), formatDuration()
│   ├── content/
│   │   ├── languages.ts      # Language metadata
│   │   └── courses.ts        # Seed course content
│   ├── game/
│   │   ├── engine.ts         # XP curve, streak, unlock logic
│   │   ├── achievements.ts   # Badge definitions + checkers
│   │   └── store.ts          # Zustand store w/ persist
│   └── runner/
│       ├── javascript.ts     # iframe sandbox JS runner
│       └── python.ts         # Pyodide loader
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

## Gamification engine

Defined in `lib/game/engine.ts`.

- **XP curve:** `xpRequiredForLevel(n) = 100 * n * (n+1) / 2` (triangular). Level 1 = 100 XP, Level 5 = 1500 XP, Level 10 = 5500 XP.
- **Streak:** `bumpStreak()` increments when the user is active on consecutive days, resets otherwise.
- **Unlock rules:** Module `m` is unlocked iff every module ID in `m.requires` is `completed`.
- **Module progress %:** `0.7 * (lessons_done / total) + 0.3 * quiz_best_score`.
- **Module completion:** quiz score ≥ 0.6 marks the module conquered and awards `module.rewardXp`.
- **Achievements:** defined in `lib/game/achievements.ts` with pure-function checkers evaluated after every progress event. Easy to extend.

All rewards (XP, level-ups, badges, module conquests) push into a `rewardQueue` that the `<RewardOverlay/>` consumes one at a time with a spring-animated modal.

---

## Adding a new course or language

1. Add the language to `lib/content/languages.ts`.
2. Add a new `Course` object to `COURSES` in `lib/content/courses.ts` with `knownLang`, `targetLang`, and a list of modules.
3. Each module needs: `id`, `title`, `icon`, `order`, `requires` (prereq module ids), `lessons[]`, `quiz[]`, `rewardXp`.
4. Each lesson needs: `comparisons` (known/target code pairs), `realWorld` note, and a single `exercise` (starter code + expected-output substring).
5. If the target language needs a runner that isn't Python or JavaScript, add one in `lib/runner/<lang>.ts` and dispatch from `CodeRunner.tsx`.

No code changes are needed in the engine, dashboard, or quiz screens — the data shape is the contract.

---

## Scalable backend design (v2)

The MVP is client-only with `localStorage`. The v2 architecture is designed to be a straightforward upgrade.

### High-level

```
[Next.js (Vercel)]
   │
   ├─ /api/* (App Router route handlers)
   │     ├─ /api/me               GET   profile
   │     ├─ /api/progress         POST  lesson / quiz events
   │     ├─ /api/mentor           POST  chat (Anthropic, streaming)
   │     ├─ /api/leaderboard      GET   top N + my rank
   │     ├─ /api/courses          GET   list
   │     ├─ /api/courses/:id      GET   modules + lessons
   │     └─ /api/run              POST  optional server-side exec for langs w/o WASM
   │
   ├─ Auth: NextAuth / Clerk (email-link or OAuth)
   ├─ DB: Postgres (Neon/Supabase) via Prisma
   ├─ Cache/queue: Redis (Upstash) for leaderboards + rate limits
   ├─ Code exec: client first (Pyodide/QuickJS), Judge0 or self-hosted Piston for others
   └─ AI: Anthropic Claude Sonnet 4.6 w/ prompt caching
```

### Database schema (Prisma sketch)

```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  displayName   String
  knownLang     String
  targetLang    String
  level         String   // beginner | intermediate | advanced
  xp            Int      @default(0)
  streakDays    Int      @default(0)
  lastActiveOn  DateTime?
  createdAt     DateTime @default(now())

  progress      ModuleProgress[]
  events        Event[]
  achievements  AchievementGrant[]
}

model Course {
  id          String   @id
  knownLang   String
  targetLang  String
  title       String
  modules     Module[]
  @@unique([knownLang, targetLang])
}

model Module {
  id         String   @id
  courseId   String
  title      String
  tagline    String
  icon       String
  level      String
  order      Int
  rewardXp   Int
  requires   String[] // module ids
  lessons    Lesson[]
  quizzes    QuizQuestion[]
  course     Course   @relation(fields: [courseId], references: [id])
}

model Lesson {
  id          String   @id
  moduleId    String
  title       String
  intro       String
  comparisons Json     // SyntaxComparison[]
  realWorld   String
  exercise    Json     // Exercise
  module      Module   @relation(fields: [moduleId], references: [id])
}

model QuizQuestion {
  id            String   @id
  moduleId      String
  kind          String   // "mcq" | "debug"
  prompt        String
  brokenCode    String?
  choices       String[]
  correctIndex  Int
  explanation   String
  xp            Int
  module        Module   @relation(fields: [moduleId], references: [id])
}

model ModuleProgress {
  id                 String   @id @default(cuid())
  userId             String
  moduleId           String
  completedLessons   String[] // lesson ids
  quizBestScore      Float    @default(0)
  completed          Boolean  @default(false)
  updatedAt          DateTime @updatedAt
  user               User     @relation(fields: [userId], references: [id])
  @@unique([userId, moduleId])
}

model Achievement {
  id           String  @id            // ach-first-lesson
  title        String
  description  String
  icon         String
}

model AchievementGrant {
  id            String   @id @default(cuid())
  userId        String
  achievementId String
  grantedAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id])
  @@unique([userId, achievementId])
}

model Event {
  id        String   @id @default(cuid())
  userId    String
  kind      String   // lesson_complete | quiz_complete | login
  payload   Json
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  @@index([userId, createdAt])
}
```

### API contract

| Method | Path | Body | Returns |
|---|---|---|---|
| GET | `/api/me` | — | `UserProfile` |
| PATCH | `/api/me` | `{ displayName?, knownLang?, targetLang?, level? }` | updated profile |
| GET | `/api/courses` | — | `Course[]` (metadata only) |
| GET | `/api/courses/:id` | — | full course tree |
| POST | `/api/progress/lesson` | `{ moduleId, lessonId }` | `{ xp, newlyUnlocked[] }` |
| POST | `/api/progress/quiz` | `{ moduleId, answers[] }` | `{ score, xp, completedModule, newlyUnlocked[] }` |
| GET | `/api/leaderboard?scope=global|friends` | — | top 50 + your rank |
| POST | `/api/mentor` | `{ messages[], context }` | streamed text |
| POST | `/api/run` | `{ language, code, stdin? }` | `{ output, error, runtimeMs }` |

Auth happens at the middleware layer (`/middleware.ts`) — anonymous users get a guest session cookie that can be merged into a real account on sign-up.

### Code execution sandbox

- **Tier 1 (client):** Pyodide for Python, QuickJS / iframe for JavaScript, TS via SWC + iframe. Free, instant.
- **Tier 2 (server):** Judge0 hosted API or self-hosted Piston for Java, C#, Go, Rust, C++, Ruby, Kotlin, Swift. Run inside Docker with hard limits: 2 s CPU, 256 MB RAM, no network.
- **Idempotency:** `POST /api/run` keyed by SHA-256 of `(language, code)` cached in Redis for 1 hour.

### AI features (production wiring)

- **Mentor chat:** `POST /api/mentor` proxies to Anthropic's Claude Sonnet 4.6 with **prompt caching** keyed on the system prompt + the user's known/target/level context. Stream tokens via SSE.
- **Smart hints:** When a learner has failed an exercise N≥2 times, generate a Socratic hint (not the answer).
- **Quiz generation (offline):** Batch-generate fresh questions per module nightly, store as `QuizQuestion` rows, gate on human review with a `published` flag.
- **Weak-topic detection:** Aggregate quiz-question tags by accuracy; surface "you keep tripping on closures" recommendations.

---

## UI/UX flow

```
Landing
  │
  ▼
Onboarding ─ name ─► known ─► target ─► level ─┐
                                                ▼
                                          Dashboard (Kingdom map)
                                            │            │
                          ┌─ pick module ───┘            │
                          ▼                               │
                    Lesson view ──► (next lesson) ──┐     │
                          │                          │   │
                          └─ all lessons done ──► Quiz   │
                                                     │   │
                                            Reward modal │
                                                     │   │
                                                     ▼   │
                                                  Dashboard ◄
```

Side panels accessible from the HUD: Trophy Hall (`/achievements`), Hall of Champions (`/leaderboard`), Brogan the Bard (`/mentor`).

---

## Development roadmap

### Phase 0 — MVP (this repo)
- Local-only, client-rendered, seeded content.
- Verifies the loop: onboarding → map → lesson → exercise → quiz → reward → unlock.

### Phase 1 — Backend & accounts
- Postgres + Prisma schema, NextAuth (email magic link), profile sync.
- Move courses from `lib/content` into the DB; build an admin importer that reads the same TS shapes from JSON.
- Server-authoritative progress (anti-cheat: XP can only increase server-side; quiz answers validated on POST).

### Phase 2 — Real code execution
- Wire `/api/run` to Piston self-hosted, or Judge0 for an out-of-the-box option.
- Adopt server-side test runners per exercise (input/output cases, not just substring match).

### Phase 3 — AI mentor & adaptive learning
- Anthropic Claude integration with streaming + prompt caching.
- Adaptive quiz selection — re-surface questions on weak topics.
- AI-generated hints triggered by repeated failure.

### Phase 4 — Social & retention
- Friends, clans, weekly tournaments, push notifications for streak saves.
- Public profile pages, sharable progress cards.

### Phase 5 — Scale & polish
- Mobile app via React Native + Expo, sharing the API.
- Internationalization, localized course content.
- Course authoring tools for community contributors.

---

## Notes / known limitations

- Client-side persistence only: clear your browser storage and you lose progress. Phase 1 fixes this.
- The JS iframe sandbox is **not a security boundary** — it's a learning sandbox. Don't load untrusted code from third parties.
- Pyodide first load is ~5–10 MB and ~2–3 s; we lazy-load it on the first run, not on app boot.
- React 19 + Next 15 are intentionally pinned; bump them when your team is ready to test.

---
