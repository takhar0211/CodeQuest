"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn, Loader2 } from "lucide-react";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/browser";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) {
        setError(err.message);
      } else {
        router.replace(next);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="panel-wood p-6 w-full max-w-md"
      >
        <div className="text-center mb-4">
          <div className="text-5xl mb-1">⚔</div>
          <h1 className="font-display text-3xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
            Return to the keep
          </h1>
          <p className="font-body text-parchment-100 mt-1">
            Sign in to keep your kingdom in sync.
          </p>
        </div>

        {!configured && (
          <div className="p-3 mb-3 rounded-lg border-2 border-ember-500 bg-ember-500/20 text-parchment-50 text-sm">
            Supabase isn't configured. Set <code className="text-gold-400">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
            <code className="text-gold-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in{" "}
            <code className="text-gold-400">.env.local</code>, then restart the dev server.
          </div>
        )}

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="font-display text-sm text-parchment-100 block mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full panel-parchment px-3 py-2 outline-none text-bark-900"
              placeholder="you@example.com"
              autoComplete="email"
              disabled={!configured || loading}
            />
          </div>
          <div>
            <label className="font-display text-sm text-parchment-100 block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full panel-parchment px-3 py-2 outline-none text-bark-900"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={!configured || loading}
            />
          </div>

          {error && (
            <div className="p-2 rounded-lg border-2 border-ember-500 bg-ember-500/20 text-parchment-50 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!configured || loading}
            className="btn-gold w-full"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-parchment-100">
          No account yet?{" "}
          <Link
            href={"/signup" + (search.get("next") ? "?next=" + search.get("next") : "")}
            className="text-gold-400 font-display"
          >
            Forge one
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
