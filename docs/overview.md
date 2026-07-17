# Project Overview

## What Problem Does This Project Solve?

**The problem:** When a developer already knows one programming language (say, Python) and wants to learn another (say, JavaScript), most courses force them to start from scratch — "This is a variable. This is a loop." It's boring, slow, and insulting to someone who has already shipped code.

**The solution:** CodeQuest teaches a new language by **mapping every concept back to the language you already know**. Instead of "here's how a loop works," it says "your Python `for x in xs` becomes JavaScript's `for (const x of xs)`." It's like a bilingual dictionary for programmers.

On top of that, it wraps the learning in a **Clash of Clans-style game**:
- You have a kingdom map with "territories" (modules) that you conquer
- You earn XP, level up, maintain daily streaks
- You unlock achievements like "First Stone Laid" and "Flawless Victory"
- There's a leaderboard (currently mocked) to compete against others
- An AI mentor ("Brogan the Bard") helps when you're stuck

## Who Are the Users?

- **Primary:** Developers who know one language and want to learn another quickly
- **Secondary:** Boot camp graduates wanting to add a second language to their resume
- **Tertiary:** CS students preparing for interviews in a language different from what they learned in college

## Main Features

| Feature | Description |
|---------|-------------|
| **Onboarding** | 4-step flow: Name → Known Language → Target Language → Skill Level |
| **Kingdom Dashboard** | Winding map of modules with locked/unlocked/conquered states |
| **Lessons** | Side-by-side syntax comparisons with "you know / you'll learn" panels |
| **Code Runner** | Live in-browser code execution (JavaScript via iframe, Python via Pyodide WASM) |
| **Quizzes** | MCQ + debug-the-code questions with instant feedback |
| **AI Explanations** | Gemini-powered deeper explanations for any comparison in a lesson |
| **AI Mentor Chat** | Free-form chat with "Brogan the Bard" powered by Gemini |
| **Gamification** | XP, levels (triangular curve), streaks, 8 achievements |
| **Leaderboard** | Hall of Champions (sample data + your real rank) |
| **Auth** | Email/password via Supabase (optional — works as guest too) |
| **Cloud Sync** | When authenticated, progress syncs to Supabase PostgreSQL |

## Business Use Case

Think of it as **"Duolingo for programming languages"** — but instead of teaching humans English or Spanish, it teaches developers JavaScript or Python. The gamification keeps users coming back (retention), and the side-by-side comparison makes learning efficient (value prop).

## Real-World Workflow

```
Day 1:  User opens CodeQuest → completes onboarding → starts "Variables & Types" module
Day 2:  User opens app → streak bumped → finishes lesson → runs exercise → earns XP
Day 3:  User completes all lessons in a module → takes the quiz
        Score ≥ 60%? Module conquered! Next module unlocks.
        Score < 60%? Retry. Best score is saved.
Day 7:  User has a 7-day streak → "Eternal Flame" achievement unlocked!
```

## Elevator Pitch (30 seconds)

> "CodeQuest is a gamified platform that teaches developers a new programming language by leveraging the one they already know. Instead of starting from scratch, every concept is taught through side-by-side syntax comparisons — like a bilingual dictionary. The learning is wrapped in a Clash of Clans-style game with XP, levels, streaks, and achievements. It has an AI mentor powered by Gemini for deeper explanations. Built with Next.js 15, TypeScript, Tailwind CSS, Zustand, and Supabase."

## 2-Minute Interview Explanation

> "I built CodeQuest to solve a real problem I noticed: when experienced developers learn a new language, existing courses force them to start from zero. CodeQuest maps every concept from the language they know to the one they're learning.
>
> On the technical side, it's a Next.js 15 app using the App Router, TypeScript, and Tailwind CSS. The state management is handled by Zustand with localStorage persistence, so progress survives page reloads. For authentication, I integrated Supabase — it gives us email/password auth with Row Level Security on PostgreSQL, so every user only sees their own data.
>
> The app has two AI features powered by Google Gemini: an inline explanation chat that digs deeper into any syntax comparison, and a free-form mentor chat. Both hit a Next.js API route that proxies to the Gemini REST API.
>
> Code execution happens entirely in the browser — JavaScript runs in a sandboxed iframe with a 2-second timeout, and Python runs via Pyodide (a WebAssembly port of CPython). This means zero backend infrastructure for code execution.
>
> The gamification engine is pure TypeScript functions: a triangular XP curve for leveling, streak tracking based on date comparison, prerequisite-based module unlocking, and 8 achievements with pure-function checkers. Rewards are pushed into a queue and consumed by a spring-animated Framer Motion overlay."

## Detailed Project Explanation

CodeQuest is structured as a **single Next.js deployment** that covers:

1. **Content Layer:** Course data is hardcoded as TypeScript objects in `courses.ts`. Each `Course` has modules, each module has lessons and quiz questions, each lesson has side-by-side comparisons and an exercise.

2. **Game Layer:** A Zustand store (`store.ts`) holds the entire `UserProfile` including XP, streak, progress, achievements. This store is persisted to `localStorage` and optionally synced to Supabase.

3. **Presentation Layer:** React components render everything — pages use Next.js App Router file-based routing, animations use Framer Motion, styling uses Tailwind CSS with a custom "medieval/CoC" theme.

4. **AI Layer:** Two API routes (`/api/explain`, `/api/mentor`) proxy to Google Gemini for chat features.

5. **Auth Layer:** Supabase handles authentication. A `middleware.ts` refreshes session cookies, and an `AuthProvider` React context exposes the current user.

---

# Tech Stack Overview

## Complete Technology Table

| Technology | Purpose | Why Used | Alternatives |
|---|---|---|---|
| **Next.js 15** | Full-stack React framework | File-based routing, API routes, SSR/SSG, single deployment | Create React App, Vite, Remix, Gatsby |
| **React 19** | UI component library | Declarative, component-based UI | Vue.js, Svelte, Angular |
| **TypeScript** | Typed superset of JavaScript | Catches bugs at compile time, better IDE support | Plain JavaScript |
| **Tailwind CSS 3** | Utility-first CSS framework | Rapid iteration, consistent design, small bundle | CSS Modules, Styled Components, Sass |
| **Zustand 5** | Client-side state management | Tiny, zero boilerplate, built-in localStorage | Redux, Jotai, Context API, MobX |
| **Framer Motion 11** | Animation library | Spring animations, exit animations, gesture support | GSAP, React Spring, CSS animations |
| **Supabase** | Backend-as-a-Service (auth + database) | Free PostgreSQL + auth + RLS, quick setup | Firebase, Auth0, AWS Cognito |
| **Google Gemini** | AI/LLM for chat features | Fast, cheap, good at code explanations | OpenAI GPT, Anthropic Claude |
| **Pyodide 0.26** | Python WASM runtime | Run Python in the browser, zero server infra | Server-side execution, Judge0 |
| **lucide-react** | Icon library | Clean, tree-shakable, consistent style | React Icons, Heroicons, Phosphor |
| **clsx** | Conditional class name builder | Clean conditional class composition | classnames library |
| **tailwind-merge** | Tailwind class conflict resolver | Resolves conflicting Tailwind classes intelligently | Manual ordering |
| **PostCSS** | CSS transformer | Required by Tailwind for processing | None (required) |
| **Autoprefixer** | CSS vendor prefix adder | Cross-browser compatibility | Manual prefixes |
| **Node.js** | JavaScript runtime | Runs the Next.js dev server and API routes | Deno, Bun |

## Detailed Technology Explanations

### Next.js 15

**What is it?** A React framework that adds server-side rendering, file-based routing, API routes, and optimized builds on top of React.

**Why it exists:** Plain React (Create React App) gives you only client-side rendering — the browser downloads a blank HTML page, then JavaScript runs and builds the UI. This is slow for initial load and bad for SEO. Next.js solves this by rendering HTML on the server first.

**Why used in this project:** CodeQuest needs:
- File-based routing (each page is just a file in the `app/` directory)
- API routes (the `/api/explain` and `/api/mentor` endpoints for Gemini)
- Single deployment (frontend + backend in one project)

**Interview questions:**
- "What is the difference between SSR and CSR?" → SSR renders HTML on the server; CSR renders in the browser
- "Why use Next.js over plain React?" → Routing, SSR, API routes, image optimization, built-in code splitting
- "What is the App Router?" → Next.js 13+ routing system using the `app/` directory with nested layouts, server components by default

### Zustand

**What is it?** A tiny (< 1KB) state management library for React. Think of it as Redux without the boilerplate.

**Why it exists:** React's built-in state (`useState`) is local to a component. When many components need the same data, you either "lift state up" (messy) or use a state management library. Redux is powerful but requires actions, reducers, and lots of ceremony. Zustand gives you a simple `create()` function that returns a hook.

**Why used here:** The user's profile (XP, streak, achievements, progress) needs to be accessible from every page. Zustand's `persist` middleware gives free `localStorage` hydration — meaning the profile survives page reloads without any extra code.

**Interview questions:**
- "Why Zustand over Redux?" → Less boilerplate, smaller bundle, simpler API
- "Why Zustand over Context API?" → Context re-renders all consumers on any change; Zustand uses selectors for targeted re-renders

### Supabase

**What is it?** An open-source Firebase alternative. It gives you a PostgreSQL database, authentication (email, OAuth, magic links), real-time subscriptions, and storage — all with a dashboard and client libraries.

**Why used here:** CodeQuest needs user accounts (to save progress) and a database (to store profiles and quiz history). Supabase gives both for free on the starter plan, with Row Level Security (RLS) so users can only read/write their own data.

**Interview questions:**
- "What is Row Level Security?" → A PostgreSQL feature where you define policies (rules) that control which rows a user can see or modify
- "Why Supabase over Firebase?" → PostgreSQL (relational, SQL) vs Firestore (NoSQL, document), open-source, direct SQL access
