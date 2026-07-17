# Design Decisions

## Why Next.js Over Plain React?

**Decision:** Use Next.js 15 with App Router

**Why:**
- File-based routing eliminates routing configuration
- API routes (for Gemini proxy) in the same project — single deploy
- Built-in code splitting per route — smaller bundles
- Server Components for the root layout — minimal JS shipped

**Why not plain React (CRA/Vite)?** Would need a separate backend for API routes, manual routing setup, and no SSR capability.

**Interview answer:** "I chose Next.js because it gives me file-based routing, API routes for the Gemini integration, and the ability to deploy frontend and backend together. Since the course content is static and the interactivity is client-side, the App Router's Server Component default pairs well — the layout is a zero-JS Server Component, while pages are client-rendered."

## Why Zustand Over Redux or Context?

**Decision:** Zustand for global state

**Why:**
- < 1KB bundle size
- No boilerplate (no actions, reducers, selectors file)
- Built-in `persist` middleware → free localStorage sync
- Selector-based subscriptions → efficient re-renders

**Why not Redux?** Overkill for this scale. Redux requires actions, reducers, middleware, and a lot of ceremony.

**Why not Context API?** Context re-renders ALL consumers when ANY value changes. With 20+ components reading the profile, that's a performance problem.

## Why Supabase Over Firebase?

**Decision:** Supabase for auth + database

**Why:**
- PostgreSQL (relational) — better for structured data like profiles and progress
- Row Level Security — built into Postgres, no cloud functions needed
- SQL access — you can write raw SQL, not limited to a proprietary query language
- Open source — can self-host if needed

## Why Client-Side Code Execution?

**Decision:** Run code in the browser, not on a server

**Why:**
- Zero infrastructure cost
- Instant feedback (no network latency)
- Works offline
- No security concerns about server-side code execution

**Trade-off:** Only supports JavaScript and Python. Other languages would need server-side execution (Judge0/Piston).

## Why Tailwind CSS Over Vanilla CSS or CSS Modules?

**Decision:** Tailwind CSS with custom theme

**Why:**
- Rapid iteration — styles are inline, no switching between files
- Consistent design tokens via theme configuration
- Tree-shaking — unused styles are purged from the build
- The CoC "wood/parchment/stone" theme is defined as custom Tailwind colors

---

# Performance & Scalability

## Current Performance Characteristics

| Aspect | Current State | Concern? |
|--------|--------------|----------|
| Bundle size | Small (no heavy dependencies) | ✅ Fine |
| Code splitting | Automatic per-route (Next.js) | ✅ Fine |
| Pyodide first load | ~5-10 MB, ~2-3 seconds | ⚠️ Heavy, but lazy-loaded |
| State persistence | localStorage (synchronous) | ✅ Fine for MVP |
| API latency | Gemini calls take 1-3 seconds | ⚠️ Acceptable for AI |
| Database queries | Simple key lookups with RLS | ✅ Fine |

## If This Project Had 1 Million Users

### What Would Break

1. **localStorage can't sync across devices** → Need server-authoritative state
2. **Mocked leaderboard** → Need real-time aggregation query
3. **No rate limiting on API routes** → Gemini costs would explode
4. **Course content is hardcoded** → Need CMS/database for content
5. **No CDN** → Static assets served from origin server

### Required Changes

| Area | Change | Technology |
|------|--------|-----------|
| **State** | Server-authoritative progress (anti-cheat) | Postgres + API validation |
| **Leaderboard** | Redis sorted set for real-time rankings | Redis (Upstash) |
| **Rate limiting** | Per-user request limits on API routes | Redis + middleware |
| **Content** | Move courses to database | Prisma ORM + admin panel |
| **Code execution** | Server-side for non-JS/Python languages | Judge0 / Piston |
| **AI** | Prompt caching, streaming, cost controls | Anthropic/OpenAI with caching |
| **Deployment** | CDN for static assets, edge functions | Vercel Edge, Cloudflare |
| **Monitoring** | Error tracking, analytics, A/B testing | Sentry, PostHog |

## Current Optimizations Already in Place

1. **Lazy-loading Pyodide:** Only loaded on first code run, not on app boot
2. **Selector-based Zustand:** Components only re-render when their selected data changes
3. **Font preconnect:** Google Fonts preconnect links in the root layout
4. **Tailwind purging:** Unused CSS classes removed at build time
5. **Fire-and-forget sync:** Supabase writes don't block the UI

---

# Security Analysis

## Security Measures Implemented

| Measure | Implementation | Location |
|---------|---------------|----------|
| **Row Level Security** | Users can only access their own data | `schema.sql` |
| **API key server-side** | Gemini API key never exposed to browser | API routes (`process.env.GEMINI_API_KEY`) |
| **Sandboxed code execution** | JS runs in `sandbox="allow-scripts"` iframe | `javascript.ts` |
| **Code execution timeout** | 2-second timeout for JS, 8-second for Python | Runner files |
| **Password minimum length** | 6 characters enforced client-side | `signup/page.tsx` |
| **Session cookie refresh** | Middleware refreshes near-expiry tokens | `middleware.ts` |

## Vulnerabilities & Missing Protections

| Vulnerability | Status | Impact | Fix |
|---|---|---|---|
| **XSS via code output** | ⚠️ Partial — output is in `pre` tag | Low (self-contained) | Sanitize output |
| **CSRF** | ✅ Mitigated — Supabase uses cookie-based auth with SameSite | Low | - |
| **SQL Injection** | ✅ Mitigated — Supabase client uses parameterized queries | Low | - |
| **Rate limiting** | ❌ Missing on API routes | High (cost exploitation) | Add Redis-based rate limiting |
| **Input validation** | ❌ Minimal on API routes | Medium | Add Zod schema validation |
| **Code sandbox escape** | ⚠️ iframe sandbox is NOT a security boundary | Low (single-user) | Don't run untrusted third-party code |
| **Client-side anti-cheat** | ❌ Missing — XP can be modified in localStorage | Medium (integrity) | Server-authoritative XP |
| **HTTPS enforcement** | ✅ Handled by deployment platform (Vercel) | Low | - |

## Security Interview Answer

> "The app uses Row Level Security in PostgreSQL so users can only access their own data. API keys are kept server-side — the browser never sees the Gemini key. Code execution is sandboxed in an iframe with restricted permissions. For production, I'd add rate limiting on API routes (Redis), server-authoritative XP validation, input validation with Zod, and a WAF/CDN for DDoS protection."
