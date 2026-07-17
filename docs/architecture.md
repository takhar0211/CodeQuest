# High-Level Architecture

## Complete System Diagram

```
┌──────────────────────────────────────────────────────────┐
│                        USER BROWSER                      │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  React UI   │  │   Zustand   │  │  localStorage   │  │
│  │  (pages,    │◄─┤   Store     │◄─┤  (persisted     │  │
│  │  components)│  │  (profile,  │  │  profile data)  │  │
│  └──────┬──────┘  │  rewards)   │  └─────────────────┘  │
│         │         └──────┬──────┘                        │
│         │                │                               │
│         │    ┌───────────┴────────────┐                  │
│         │    │   Code Runners         │                  │
│         │    │ ┌─────────┐ ┌────────┐ │                  │
│         │    │ │ iframe   │ │Pyodide │ │                  │
│         │    │ │(JS exec) │ │(Python)│ │                  │
│         │    │ └─────────┘ └────────┘ │                  │
│         │    └────────────────────────┘                  │
└─────────┼───────────────────────────────────────────────┘
          │ fetch()
          ▼
┌─────────────────────────────────────────────────────────┐
│                   NEXT.JS SERVER                         │
│                                                          │
│  ┌──────────────┐                                        │
│  │ middleware.ts │ ← Runs before every request            │
│  │ (cookie      │   Refreshes Supabase session            │
│  │  refresh)    │                                        │
│  └──────┬───────┘                                        │
│         │                                                │
│  ┌──────┴───────┐  ┌────────────────┐                    │
│  │ API Routes   │  │ Static Pages   │                    │
│  │ /api/explain │  │ (served from   │                    │
│  │ /api/mentor  │  │  .next build)  │                    │
│  └──────┬───────┘  └────────────────┘                    │
│         │                                                │
└─────────┼────────────────────────────────────────────────┘
          │ HTTPS
          ▼
┌──────────────────┐     ┌──────────────────────────────┐
│   Google Gemini  │     │         Supabase              │
│   (AI/LLM API)  │     │  ┌─────────┐  ┌───────────┐  │
│                  │     │  │  Auth   │  │ PostgreSQL│  │
│  - /api/explain  │     │  │ (email/ │  │ (profiles,│  │
│    calls Gemini  │     │  │  pass)  │  │  progress,│  │
│  - /api/mentor   │     │  └─────────┘  │  quiz_hist)│  │
│    calls Gemini  │     │               └───────────┘  │
└──────────────────┘     └──────────────────────────────┘
```

## Request Flow (Example: User completes a lesson exercise)

```
1. User writes code in CodeRunner textarea
2. User clicks "Run code"
3. CodeRunner component calls runJavaScript() or runPython()
4. Code executes IN THE BROWSER (iframe or Pyodide)
5. Output compared against expectedOutputIncludes
6. If matched → onSuccess() called
7. onSuccess triggers store.completeLesson(moduleId, lessonId, xp)
8. Zustand store:
   a. Updates XP
   b. Marks lesson as completed
   c. Bumps streak
   d. Evaluates achievements
   e. Pushes rewards to rewardQueue
   f. Persists to localStorage
   g. Fire-and-forget sync to Supabase (if authenticated)
9. RewardOverlay component pops up showing "+20 XP"
10. User clicks "Claim" → reward dismissed from queue
```

## Authentication Flow

```
User clicks "Sign up"
        │
        ▼
  /signup page
  (form: name, email, password)
        │
        ▼
  supabase.auth.signUp()
        │
   ┌────┴────┐
   │ Email   │ No email confirmation
   │ confirm │ needed (dev mode)
   │ enabled?│
   └────┬────┘
        │
        ▼
  Session created → AuthProvider receives onAuthStateChange
        │
        ▼
  applyUser(user):
    1. Sets SyncBridge (supabase client + user)
    2. Loads profile from Supabase DB
    3. Merges into Zustand store
        │
        ▼
  User redirected to /onboarding or /dashboard
```

## State Management Flow

```
                    ┌─────────────────────┐
                    │   Zustand Store      │
                    │   (useGameStore)     │
                    │                     │
  Components ──────►│  profile: {         │──► localStorage
  (read via         │    xp, streak,      │    (persist middleware)
   selectors)       │    progress, etc.   │
                    │  }                  │──► Supabase
  Actions ─────────►│  rewardQueue: []    │    (fire-and-forget
  (completeLesson,  │  hydrated: bool     │     via SyncBridge)
   recordQuiz, etc.)│                     │
                    └─────────────────────┘
```

---

# Project Folder Structure

```
codequest/
├── app/                          # Next.js App Router — all pages live here
│   ├── layout.tsx                # Root layout (HTML, fonts, AuthProvider)
│   ├── page.tsx                  # Landing page (/)
│   ├── globals.css               # Global styles + CoC theme panels
│   ├── onboarding/
│   │   └── page.tsx              # 4-step onboarding wizard
│   ├── dashboard/
│   │   └── page.tsx              # Kingdom map with module cards
│   ├── learn/
│   │   └── [moduleId]/
│   │       └── page.tsx          # Lesson view with comparisons + code runner
│   ├── quiz/
│   │   └── [moduleId]/
│   │       └── page.tsx          # Quiz screen with MCQ + debug questions
│   ├── achievements/
│   │   └── page.tsx              # Trophy hall with stats and badges
│   ├── leaderboard/
│   │   └── page.tsx              # Hall of Champions (mocked data)
│   ├── mentor/
│   │   └── page.tsx              # AI mentor chat (Brogan the Bard)
│   ├── login/
│   │   └── page.tsx              # Sign in form
│   ├── signup/
│   │   └── page.tsx              # Sign up form
│   └── api/                      # Server-side API routes
│       ├── explain/
│       │   └── route.ts          # POST /api/explain → Gemini (lesson chat)
│       └── mentor/
│           └── route.ts          # POST /api/mentor → Gemini (free chat)
│
├── components/                   # Reusable React components
│   ├── ClientShell.tsx           # Wraps pages with HUD + reward overlay
│   ├── auth/
│   │   └── AuthProvider.tsx      # React Context for Supabase auth state
│   ├── hud/
│   │   ├── Hud.tsx               # Sticky top bar (logo, XP, streak, nav)
│   │   └── RewardOverlay.tsx     # Full-screen animated reward modal
│   └── lesson/
│       ├── CodeRunner.tsx        # Code editor + execution + success check
│       ├── SyntaxCompare.tsx     # Side-by-side known/target code panels
│       ├── ExplanationChat.tsx   # AI explanation modal for comparisons
│       └── SimpleMarkdown.tsx    # Lightweight markdown renderer for chat
│
├── lib/                          # Core logic (non-React, importable anywhere)
│   ├── types.ts                  # All TypeScript interfaces and type definitions
│   ├── utils.ts                  # cn() helper, formatDuration()
│   ├── content/
│   │   ├── languages.ts          # Language definitions (id, name, emoji)
│   │   └── courses.ts            # All course content (3 courses, ~1340 lines)
│   ├── game/
│   │   ├── engine.ts             # XP curve, streak logic, unlock rules
│   │   ├── achievements.ts       # 8 achievement definitions + checkers
│   │   └── store.ts              # Zustand store (profile, actions, persistence)
│   ├── runner/
│   │   ├── javascript.ts         # Sandboxed iframe JS executor
│   │   └── python.ts             # Pyodide (WASM) Python executor
│   ├── supabase/
│   │   ├── browser.ts            # Browser-side Supabase client (singleton)
│   │   └── server.ts             # Server-side Supabase client (for API routes)
│   └── sync/
│       ├── bridge.ts             # Module-local bridge for non-React→Supabase
│       └── profile.ts            # Load/save profile, progress, quiz history
│
├── supabase/
│   └── schema.sql                # Database schema (tables, triggers, RLS)
│
├── middleware.ts                  # Next.js middleware (session cookie refresh)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS custom theme
├── tsconfig.json                 # TypeScript compiler options
├── postcss.config.mjs            # PostCSS plugins (Tailwind, Autoprefixer)
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variables template
└── .env.local                    # Actual environment variables (gitignored)
```

### Folder Responsibilities

| Folder | Responsibility | Connects To |
|--------|---------------|-------------|
| `app/` | Defines URL routes and page components | `components/`, `lib/` |
| `app/api/` | Server-side endpoints (Gemini proxy) | External APIs (Gemini) |
| `components/` | Reusable UI pieces | `lib/game/`, `lib/content/` |
| `lib/types.ts` | The "contract" — all data shapes | Everything imports from here |
| `lib/content/` | Course curriculum data | Read by pages and components |
| `lib/game/` | Game mechanics and state | Read/written by store, pages |
| `lib/runner/` | Code execution engines | Used by `CodeRunner` component |
| `lib/supabase/` | Database client creation | Used by auth, sync |
| `lib/sync/` | Bridge between Zustand ↔ Supabase | Connects store to database |
| `supabase/` | Database schema definition | Run once in Supabase SQL editor |

---

# Database Design

## Tables (from `schema.sql`)

### profiles
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | References auth.users(id), cascades on delete |
| email | TEXT | User's email |
| display_name | TEXT | "Chieftain" by default |
| known_lang | TEXT | e.g., "python" |
| target_lang | TEXT | e.g., "javascript" |
| skill_level | TEXT | "beginner" / "intermediate" / "advanced" (CHECK constraint) |
| xp | INT | Total XP |
| streak_days | INT | Current streak |
| last_active_date | DATE | For streak calculation |
| total_seconds_learned | INT | Time tracking |
| unlocked_achievements | TEXT[] | Array of achievement IDs |
| weak_topics | TEXT[] | Array of topic strings |
| onboarded | BOOLEAN | Has completed onboarding? |
| created_at | TIMESTAMPTZ | Row creation time |
| updated_at | TIMESTAMPTZ | Auto-updated by trigger |

### module_progress
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK) | References auth.users |
| module_id | TEXT | e.g., "py-js-variables" |
| completed_lesson_ids | TEXT[] | Array of lesson IDs |
| quiz_best_score | REAL | 0.0 to 1.0 |
| completed | BOOLEAN | Module conquered? |
| updated_at | TIMESTAMPTZ | Auto-updated |
| **UNIQUE** | (user_id, module_id) | One row per user per module |

### quiz_history
| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK) | References auth.users |
| module_id | TEXT | Which module quiz |
| taken_on | DATE | Date of attempt |
| correct | INT | Number correct |
| total | INT | Total questions |
| created_at | TIMESTAMPTZ | Row creation time |

## ER Diagram

```
┌─────────────────┐       ┌─────────────────────┐
│   auth.users    │       │     profiles         │
│─────────────────│       │─────────────────────│
│ id (PK)         │◄──────│ id (PK, FK)          │
│ email           │  1:1  │ display_name         │
│ ...             │       │ known_lang           │
└────────┬────────┘       │ target_lang          │
         │                │ xp, streak_days, ... │
         │                └─────────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────────┐
│  module_progress    │
│─────────────────────│
│ id (PK)             │
│ user_id (FK)        │
│ module_id           │
│ completed_lesson_ids│
│ quiz_best_score     │
│ completed           │
│ UNIQUE(user_id,     │
│        module_id)   │
└─────────────────────┘
         │
         │ 1:N (same user_id FK)
         ▼
┌─────────────────────┐
│   quiz_history      │
│─────────────────────│
│ id (PK)             │
│ user_id (FK)        │
│ module_id           │
│ taken_on, correct,  │
│ total               │
└─────────────────────┘
```

## Relationships
- **auth.users ↔ profiles:** One-to-One. Auto-created by a trigger when a user signs up.
- **auth.users ↔ module_progress:** One-to-Many. A user has many module progress records.
- **auth.users ↔ quiz_history:** One-to-Many. A user has many quiz attempt records.

## Key Database Features

1. **Trigger: `handle_new_user()`** — Automatically creates a `profiles` row when a user signs up via Supabase Auth.
2. **Trigger: `touch_updated_at()`** — Auto-updates the `updated_at` column on any UPDATE.
3. **Row Level Security (RLS)** — Every table has policies ensuring `auth.uid() = id` or `auth.uid() = user_id`. Users can only see/modify their own data.
4. **Leaderboard View** — A SQL `VIEW` that selects `display_name, xp, streak_days` from profiles where `onboarded = true`, ordered by XP descending, limited to 100.
