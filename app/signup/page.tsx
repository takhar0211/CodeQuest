"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { UserPlus, Loader2 } from "lucide-react";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/browser";
import { loadProfileFromSupabase } from "@/lib/sync/profile";
import { useGameStore } from "@/lib/game/store";
import { setSyncBridge } from "@/lib/sync/bridge";

export default function SignupPage() {
  return (
    <Suspense fallback={<main className="min-h-screen" />}>
      <SignupForm />
    </Suspense>
  );
}

function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/onboarding";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsConfirm, setNeedsConfirm] = useState(false);

  const configured = isSupabaseConfigured();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: err } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { display_name: name.trim() || "Chieftain" } },
      });
      if (err) {
        setError(err.message);
      } else if (!data.session) {
        // Email confirmation enabled — user must verify before signing in.
        setNeedsConfirm(true);
      } else {
        if (data.user) {
          const serverProfile = await loadProfileFromSupabase(supabase, data.user.id);
          if (serverProfile) {
            useGameStore.setState({ profile: serverProfile, hydrated: true });
          }
          setSyncBridge({ supabase, user: data.user });
        }
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
          <div className="text-5xl mb-1">🛡️</div>
          <h1 className="font-display text-3xl text-gold-400 drop-shadow-[0_2px_0_#241407]">
            Found a new kingdom
          </h1>
          <p className="font-body text-parchment-100 mt-1">
            Sign up to save your progress across devices.
          </p>
        </div>

        {!configured && (
          <div className="p-3 mb-3 rounded-lg border-2 border-ember-500 bg-ember-500/20 text-parchment-50 text-sm">
            Supabase isn't configured. Set the env vars in{" "}
            <code className="text-gold-400">.env.local</code> and restart the dev server.
          </div>
        )}

        {needsConfirm ? (
          <div className="p-3 rounded-lg border-2 border-moss-500 bg-moss-500/20 text-parchment-50 text-sm">
            <div className="font-display text-lg mb-1">📨 Check your email</div>
            We sent a confirmation link to <strong>{email}</strong>. Click it, then{" "}
            <Link href="/login" className="text-gold-400 underline">
              sign in
            </Link>
            .
            <div className="mt-2 text-xs text-parchment-100/80">
              Tip: to skip this in local dev, disable email confirmation in your
              Supabase project: Authentication → Providers → Email → uncheck
              "Confirm email".
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label className="font-display text-sm text-parchment-100 block mb-1">
                Chieftain name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full panel-parchment px-3 py-2 outline-none text-bark-900"
                placeholder="Ada"
                autoComplete="nickname"
                disabled={!configured || loading}
              />
            </div>
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
                Password (6+ chars)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full panel-parchment px-3 py-2 outline-none text-bark-900"
                placeholder="••••••••"
                autoComplete="new-password"
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
              {loading ? <Loader2 size={18} className="animate-spin" /> : <UserPlus size={18} />}
              {loading ? "Forging…" : "Sign up"}
            </button>
          </form>
        )}

        <div className="mt-4 text-center text-sm text-parchment-100">
          Already a chieftain?{" "}
          <Link
            href={"/login" + (search.get("next") ? "?next=" + search.get("next") : "")}
            className="text-gold-400 font-display"
          >
            Sign in
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
