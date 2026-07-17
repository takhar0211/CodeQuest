# File-by-File Explanation

## Core Type Definitions

### `lib/types.ts`
**Purpose:** Defines every data shape used across the project. This is the "contract" — if you understand these types, you understand what data flows through the system.

**Key types:**
- `UserProfile` — The player's entire state: name, XP, streak, progress map, achievements
- `Course` → `Module[]` → `Lesson[]` + `QuizQuestion[]` — The content hierarchy
- `SyntaxComparison` — A single "known code vs target code" pair
- `Exercise` — A coding challenge with starter code, solution, and expected output
- `ModuleProgress` — Per-module: which lessons done, best quiz score, completed?

**Interview explanation:** "I designed the type system as a strict hierarchy: Course → Module → Lesson → Comparison/Exercise. This flat-but-nested structure means adding new content requires zero code changes — you just add data objects that match the types."

## Game Engine

### `lib/game/engine.ts`
**Purpose:** Pure functions for game math — XP leveling, streak calculation, module unlocking.

**Key functions:**
- `xpRequiredForLevel(n)` — Returns cumulative XP needed: `100 * n * (n+1) / 2` (triangular numbers)
- `levelForXp(xp)` — Iteratively finds what level the player is at
- `xpProgressInLevel(xp)` — Returns `{ level, into, span, pct }` for the XP bar
- `bumpStreak(profile)` — Increments streak if active on consecutive days, resets otherwise
- `isModuleUnlocked(module, profile)` — Checks if all prerequisite modules are completed
- `moduleProgressPct(module, profile)` — `0.7 × lesson_completion + 0.3 × quiz_score`

**Interview explanation:** "All game logic is pure functions — given the same input, they always return the same output. This makes them easy to test, easy to move to a server later, and they don't depend on any UI framework."

### `lib/game/achievements.ts`
**Purpose:** Defines 8 achievements and their checker functions.

**How it works:** Each achievement has a `check` function ID. The `evaluateAchievements(profile)` function loops through all achievements, skips already-unlocked ones, and runs each checker against the current profile. New unlocks are added to the set.

### `lib/game/store.ts`
**Purpose:** THE central state store. Holds the user profile, reward queue, and all mutation actions.

**Key actions:**
- `setOnboarding()` — Sets name, languages, level, marks as onboarded
- `completeLesson()` — Adds XP, marks lesson done, bumps streak, evaluates achievements, queues rewards
- `recordQuizResult()` — Records quiz score, adds XP, potentially marks module as conquered
- `dismissReward()` — Removes a reward from the popup queue

**Persistence:** Uses Zustand's `persist` middleware with `localStorage`. Only the `profile` object is persisted (not the reward queue).

**Supabase sync:** After each mutation, fire-and-forget functions (`syncProfile`, `syncModule`, `syncQuizAttempt`) call Supabase upserts. If the user isn't authenticated, these no-op silently.

## Code Runners

### `lib/runner/javascript.ts`
**Purpose:** Runs JavaScript code in a sandboxed iframe.

**How:** Creates a hidden `<iframe>` with `sandbox="allow-scripts"`, injects the user's code into an inline `<script>` tag, intercepts `console.log` calls to capture output, and uses `postMessage` to send results back. Times out after 2 seconds.

### `lib/runner/python.ts`
**Purpose:** Runs Python code using Pyodide (CPython compiled to WebAssembly).

**How:** Lazy-loads the Pyodide library (~5-10 MB) from a CDN on first use, then runs `py.runPython(code)` synchronously. Captures stdout/stderr via callback functions.

## Authentication

### `components/auth/AuthProvider.tsx`
**Purpose:** React Context that wraps the entire app, providing `{ user, session, loading, configured, signOut, refreshProfile }` to any component.

**How it works:**
1. On mount, checks if Supabase env vars are configured
2. If yes, calls `supabase.auth.getSession()` to get the current session
3. Sets up `onAuthStateChange` listener for login/logout events
4. When a user is found, calls `applyUser()` which loads their profile from Supabase and injects it into the Zustand store

### `lib/sync/bridge.ts`
**Purpose:** Solves the problem of "how does the Zustand store (which isn't a React component) talk to Supabase?"

**Solution:** A module-level variable (`current: Bridge | null`) that holds the Supabase client and user. The AuthProvider sets this when a session is active. The Zustand store reads it before doing fire-and-forget upserts.

---

# Code Walkthrough

## XP Curve Calculation (engine.ts)

```typescript
export function xpRequiredForLevel(level: number): number {
  return (100 * level * (level + 1)) / 2;
}
```

**Line-by-line:**
- `100` is the base XP per level
- `level * (level + 1) / 2` is the formula for the nth triangular number
- Level 1 = 100 XP, Level 2 = 300 XP, Level 5 = 1500 XP, Level 10 = 5500 XP

**Why triangular?** Each level requires progressively more XP. This is the same curve Duolingo and many RPGs use — easy to start, harder to advance, which keeps early users engaged while giving long-term players a challenge.

**Alternative:** Linear (`100 * level`) — too easy. Exponential (`2^level * 100`) — too punishing. Triangular is the sweet spot.

## Streak Logic (engine.ts)

```typescript
export function bumpStreak(profile: UserProfile): Partial<UserProfile> {
  const today = todayISO();
  if (profile.lastActiveDate === today)
    return { lastActiveDate: today };
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const newStreak =
    profile.lastActiveDate === yesterday ? profile.streakDays + 1 : 1;
  return { lastActiveDate: today, streakDays: newStreak };
}
```

**Line-by-line:**
- Line 1: Get today's date as "YYYY-MM-DD"
- Line 2-3: If already active today, no change
- Line 4: Calculate yesterday's date by subtracting 86,400,000 milliseconds (1 day)
- Line 5-6: If last active was yesterday, increment streak; otherwise reset to 1
- Line 7: Return the updated fields

**Why `Partial<UserProfile>`?** The function only changes 1-2 fields. By returning a partial, the caller can spread it into the full profile: `{ ...profile, ...bumpStreak(profile) }`.

## JavaScript Sandbox (javascript.ts)

```typescript
const iframe = document.createElement("iframe");
iframe.style.display = "none";
iframe.sandbox.add("allow-scripts");
document.body.appendChild(iframe);
```

**Why iframe?** An iframe creates an isolated JavaScript execution context. The `sandbox="allow-scripts"` attribute allows JS execution but blocks access to the parent page's cookies, storage, and DOM. If the user's code throws an error or goes into an infinite loop, it only affects the hidden iframe — the main app continues working.

**Why not `eval()`?** `eval()` runs in the same context as the app — it could access and modify the app's state, read cookies, or crash the page. The iframe provides a security boundary.

## Zustand Store Persistence

```typescript
export const useGameStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      // ... store definition
    }),
    {
      name: "codequest-profile-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ profile: s.profile }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
```

**Key parts:**
- `name: "codequest-profile-v1"` — The localStorage key. The `v1` suffix lets you create a `v2` later if the shape changes.
- `partialize: (s) => ({ profile: s.profile })` — Only persist the profile, not the reward queue or hydrated flag.
- `onRehydrateStorage` — Called when localStorage data is loaded back. Sets `hydrated = true` so the UI knows data is ready.
