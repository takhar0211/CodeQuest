# Detailed User Journey

## Journey 1: First-Time User (Full Flow)

### Step 1: User opens website → Landing page

```
Files touched:
  middleware.ts        → Refreshes session (no-op for anon)
  app/layout.tsx       → Renders <html>, loads fonts, wraps with AuthProvider
  app/page.tsx         → Landing page renders
  lib/game/store.ts    → profile.onboarded is false, so no redirect
```

User sees the CodeQuest landing with the sword emoji, tagline, and "Begin your saga" button.

### Step 2: User clicks "Begin your saga" → Onboarding

```
Files touched:
  app/onboarding/page.tsx  → 4-step wizard renders
  lib/content/languages.ts → Languages shown in picker
  lib/content/courses.ts   → Supported pairs checked
  lib/game/store.ts        → setOnboarding() called on "Enter the realm"
```

User picks name "Ada", known language "Python", target language "JavaScript", level "Beginner".

### Step 3: Onboarding completes → Dashboard

```
Files touched:
  app/dashboard/page.tsx    → Kingdom map renders
  lib/content/courses.ts    → findCourse("python", "javascript") returns the course
  lib/game/engine.ts        → isModuleUnlocked() checks prereqs for each module
  components/ClientShell.tsx → Wraps with HUD + RewardOverlay
  components/hud/Hud.tsx     → Shows XP bar, streak, navigation
```

User sees 7 modules: "Variables & Types" is unlocked (green), rest are locked (grey).

### Step 4: User clicks "Variables & Types" → Lesson view

```
Files touched:
  app/learn/[moduleId]/page.tsx       → Lesson renders
  components/lesson/SyntaxCompare.tsx  → 3 comparison panels render
  components/lesson/CodeRunner.tsx     → Exercise textarea renders
```

User sees side-by-side Python vs JavaScript code comparisons.

### Step 5: User writes code and clicks "Run code"

```
Files touched:
  components/lesson/CodeRunner.tsx  → handleRun() called
  lib/runner/javascript.ts          → runJavaScript(code) creates iframe, executes
  
  On success:
  lib/game/store.ts                 → completeLesson("py-js-variables", "lesson-variables", 20)
  lib/game/engine.ts                → bumpStreak(), xpProgressInLevel()
  lib/game/achievements.ts          → evaluateAchievements() → "First Stone Laid" unlocked!
  
  Reward queue gets: ["+20 XP", "Achievement unlocked!"]
  components/hud/RewardOverlay.tsx  → Shows "+20 XP" popup
```

### Step 6: User completes all lessons → Takes quiz

```
Files touched:
  app/quiz/[moduleId]/page.tsx  → Quiz renders
  lib/game/store.ts             → recordQuizResult() on finish
  
  If score ≥ 60%:
    Module marked completed
    Next module unlocked
    "+90 XP" and "Module conquered!" rewards queued
```
