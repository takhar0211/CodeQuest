# API Documentation

## POST /api/explain

**Purpose:** Get an AI explanation for a lesson's syntax comparisons.

| Field | Value |
|-------|-------|
| **Method** | POST |
| **Route** | `/api/explain` |
| **File** | `app/api/explain/route.ts` |
| **Auth** | None (API key is server-side) |
| **Used by** | `ExplanationChat` component |

**Request:**
```json
{
  "messages": [{ "role": "user", "text": "Explain this conversion" }],
  "context": {
    "lessonTitle": "Declaring variables",
    "lessonIntro": "In Python you just assign...",
    "knownLang": "Python",
    "targetLang": "JavaScript",
    "comparisons": [{ "concept": "...", "knownCode": "...", "targetCode": "..." }],
    "realWorld": "...",
    "focusComparisonIndex": 0
  }
}
```

**Response (success):** `{ "text": "Here's the deeper explanation..." }`

**Response (error):** `{ "error": "Missing GEMINI_API_KEY..." }` with status 500

**Flow:**
1. Validates `GEMINI_API_KEY` env var
2. Builds a system prompt from context (lesson info, comparisons)
3. Calls Gemini REST API (`generativelanguage.googleapis.com`)
4. Returns the generated text

## POST /api/mentor

**Purpose:** Free-form AI mentor chat.

| Field | Value |
|-------|-------|
| **Method** | POST |
| **Route** | `/api/mentor` |
| **File** | `app/api/mentor/route.ts` |
| **Auth** | None |
| **Used by** | `Mentor` page |

**Request:**
```json
{
  "messages": [{ "role": "user", "text": "How do closures work in JS?" }],
  "context": {
    "name": "Ada",
    "knownLang": "Python",
    "targetLang": "JavaScript",
    "level": "beginner"
  }
}
```

**Response:** `{ "text": "Great question! In JavaScript, closures..." }`

---

# Authentication & Authorization

## Login Flow

```
User on /login page
        │
        ▼
  Fills email + password → clicks "Sign in"
        │
        ▼
  supabase.auth.signInWithPassword({ email, password })
        │
   ┌────┴────┐
   │ Error?  │──Yes──► Show error message
   └────┬────┘
        │ No
        ▼
  Supabase sets session cookie
        │
        ▼
  AuthProvider.onAuthStateChange fires
        │
        ▼
  applyUser(user):
    1. getSupabaseBrowserClient()
    2. setSyncBridge({ supabase, user })
    3. loadProfileFromSupabase(supabase, user.id)
    4. Inject profile into Zustand store
        │
        ▼
  router.replace("/dashboard")
```

## Signup Flow

Same as login, but uses `supabase.auth.signUp()` with an additional `display_name` in user metadata. If email confirmation is enabled, shows a "check your email" message instead of redirecting.

The `handle_new_user()` database trigger auto-creates a `profiles` row with the user's ID, email, and display name.

## Session Management

- **Middleware** (`middleware.ts`): Runs on every request. Creates a Supabase server client, calls `getUser()` to refresh the session cookie if near expiry. This is the recommended Supabase SSR pattern.
- **Cookies:** Supabase stores JWT tokens in HTTP-only cookies. The middleware reads/writes these cookies on every request.
- **Matcher:** The middleware skips static assets (`_next/static`, images, etc.) via the matcher regex.

## Protected Routes

**There are none enforced server-side.** Protection is client-side only:
- Pages check `profile.onboarded` and redirect to `/onboarding` if false
- The HUD shows "Sign in" when not authenticated
- Guest mode works fully — progress just stays in localStorage

## Row Level Security (Authorization)

In the database, RLS policies ensure:
- `profiles_self_select`: Can only SELECT where `auth.uid() = id`
- `profiles_self_upsert`: Can only INSERT where `auth.uid() = id`
- `profiles_self_update`: Can only UPDATE where `auth.uid() = id`
- `module_progress_self_all`: All operations where `auth.uid() = user_id`
- `quiz_history_self_all`: All operations where `auth.uid() = user_id`

---

# State Management

## Architecture

```
┌─────────────────────────────────────────┐
│              Zustand Store              │
│            (useGameStore)               │
│                                         │
│  ┌─────────┐  ┌──────────────────────┐  │
│  │ State   │  │ Actions              │  │
│  │─────────│  │──────────────────────│  │
│  │ profile │  │ setOnboarding()      │  │
│  │ reward  │  │ completeLesson()     │  │
│  │ Queue   │  │ recordQuizResult()   │  │
│  │ hydrated│  │ ensureModuleProgress()│ │
│  └─────────┘  │ addSeconds()         │  │
│               │ dismissReward()      │  │
│               │ reset()              │  │
│               └──────────────────────┘  │
│                                         │
│  Middleware: persist → localStorage     │
│  Side-effects: syncProfile → Supabase   │
└─────────────────────────────────────────┘
```

## How Components Access State

Components use **selectors** to subscribe to only the data they need:

```tsx
// Only re-renders when profile changes
const profile = useGameStore((s) => s.profile);

// Only re-renders when hydrated changes
const hydrated = useGameStore((s) => s.hydrated);

// Only re-renders when rewardQueue changes
const queue = useGameStore((s) => s.rewardQueue);
```

This is different from React Context, which re-renders ALL consumers whenever ANY value changes. Zustand selectors are more efficient.

## Hydration Problem & Solution

**Problem:** When using `localStorage` persistence with SSR, the server renders with the initial state (no profile), but the browser has the persisted state. This mismatch causes a React hydration error.

**Solution:** A `hydrated` flag that starts `false`. Components show a loading state until `hydrated` becomes `true`. This happens either via Zustand's `onRehydrateStorage` callback or via a fallback `setTimeout(..., 50)`.

## Local State vs Global State

| Type | Used For | Example |
|------|----------|---------|
| **Global (Zustand)** | User profile, XP, progress, achievements | `useGameStore` |
| **Local (useState)** | Form inputs, UI toggles, animation state | `const [code, setCode] = useState(...)` |
| **Context (React)** | Auth state (user, session) | `useAuth()` |

**Why not put auth in Zustand?** Auth state comes from Supabase's `onAuthStateChange` listener, which is an async subscription. Context is the natural React way to share this. Zustand is better for synchronous, persistable state.
