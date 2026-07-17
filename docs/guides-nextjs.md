# Learn Next.js Using Your React Knowledge

Since you know React, let me teach you Next.js by **comparing the two** — exactly like CodeQuest teaches programming languages.

## How React Works (What You Already Know)

```
You write React components → They get bundled into one big JS file
→ Browser downloads a blank HTML page → Downloads the JS bundle
→ JavaScript runs and renders the UI → User sees the app
```

This is called **CSR (Client-Side Rendering)**. The problem: the user sees a blank page until all the JavaScript downloads and executes.

## Why Next.js Was Created

Next.js solves several React limitations:

| Problem with Plain React | Next.js Solution |
|---|---|
| Blank page until JS loads | Server-Side Rendering (SSR) |
| No built-in routing | File-based routing |
| No backend/API | API Routes |
| Manual code splitting | Automatic per-route splitting |
| SEO is poor | Server-rendered HTML |
| No image optimization | `next/image` component |

## Key Concepts Compared

### Rendering Strategies

**Think of it like a restaurant:**
- **CSR** = You order food, kitchen starts cooking when you sit down, you wait.
- **SSR** = Kitchen pre-cooks your meal before you arrive, served instantly.
- **SSG** = The restaurant pre-makes all meals before it even opens — fastest, but can't customize.
- **ISR** = The restaurant pre-makes meals, but re-cooks them every N minutes to keep them fresh.

| Strategy | What It Means | When to Use |
|---|---|---|
| CSR | Browser renders | Interactive pages, dashboards |
| SSR | Server renders on each request | Personalized pages, fresh data |
| SSG | Server renders at build time | Marketing pages, blog posts |
| ISR | Server renders at build, refreshes periodically | Product pages, docs |

**In CodeQuest:** Almost all pages use CSR (`"use client"` at the top of every page). This is because the entire app depends on client-side state (the Zustand store with `localStorage`). The server has no way to know the user's profile during rendering.

### App Router vs Pages Router

**Pages Router (old way, pre Next.js 13):**
```
pages/
  index.tsx        → /
  about.tsx        → /about
  blog/[slug].tsx  → /blog/my-post
```

**App Router (new way, used in this project):**
```
app/
  page.tsx           → /
  layout.tsx         → Wraps all pages
  dashboard/
    page.tsx         → /dashboard
  learn/
    [moduleId]/
      page.tsx       → /learn/py-js-variables
```

The big difference: App Router has **layouts** (persistent UI that wraps child pages), **Server Components** (the default), and **nested routing**.

**In CodeQuest:** The file `app/layout.tsx` is the root layout. It wraps every page with the `<html>`, `<body>`, Google Fonts, and the `AuthProvider`.

### Server Components vs Client Components

**Server Components** (default in App Router):
- Run ONLY on the server
- Can directly access databases, file system
- Cannot use `useState`, `useEffect`, or browser APIs
- Send zero JavaScript to the browser

**Client Components** (opt-in with `"use client"`):
- Run in the browser (and on the server during SSR)
- Can use React hooks, browser APIs, event handlers
- Send JavaScript to the browser

**Analogy:** Server Components are like a chef preparing food in the kitchen (the server) — the customer (browser) only gets the finished plate (HTML). Client Components are like a DIY cooking kit — the customer gets ingredients and instructions (JavaScript) and cooks at their table (browser).

**In CodeQuest:** Every page file starts with `"use client"` because they all use Zustand hooks (`useGameStore`), `useEffect`, `useRouter`, etc. The root `layout.tsx` is a Server Component (no `"use client"` — it just defines HTML structure and metadata).

### Routing

**React (with React Router):**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/learn/:moduleId" element={<Learn />} />
</Routes>
```

**Next.js App Router (file-based — no code needed!):**
```
app/page.tsx              → /
app/dashboard/page.tsx    → /dashboard
app/learn/[moduleId]/page.tsx → /learn/anything-here
```

**Dynamic segments** use square brackets: `[moduleId]` matches any value. In the component, you access it via `params`:

```tsx
// From app/learn/[moduleId]/page.tsx (actual project code)
export default function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = use(params);
  // moduleId = "py-js-variables" when URL is /learn/py-js-variables
```

### API Routes

**React:** No built-in backend. You'd need a separate Express/Django server.

**Next.js:** Put a `route.ts` file in the `app/api/` directory and it becomes an API endpoint.

```
app/api/explain/route.ts  →  POST /api/explain
app/api/mentor/route.ts   →  POST /api/mentor
```

**In CodeQuest:** The explain and mentor API routes proxy requests to Google Gemini. The frontend calls `fetch("/api/explain", ...)` and the API route handles the Gemini API key securely (it's never exposed to the browser).

### Middleware

**What is it?** Code that runs BEFORE every request, before any page or API route. It can redirect, rewrite URLs, set cookies, or block requests.

**Analogy:** Middleware is like a bouncer at a club door. Before you enter any room (page), the bouncer checks your ID (session cookie) and may turn you away or stamp your hand.

**In CodeQuest:** `middleware.ts` refreshes the Supabase session cookie if it's near expiry. This keeps the user logged in across page navigations.
