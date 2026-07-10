"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/lib/game/store";
import { useAuth } from "@/components/auth/AuthProvider";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const profile = useGameStore((s) => s.profile);
  const hydrated = useGameStore((s) => s.hydrated);
  const setHydrated = useGameStore((s) => s.setHydrated);
  const auth = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);

  useEffect(() => {
    if (auth.loading) return;
    if (hydrated && profile.onboarded) router.replace("/dashboard");
  }, [hydrated, profile.onboarded, auth.loading, router]);

  const showAuth = auth.configured && !auth.user;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        className="text-center"
      >
        <div className="text-7xl sm:text-8xl mb-2 animate-bob">⚔</div>
        <h1 className="font-display text-5xl sm:text-7xl text-gold-400 drop-shadow-[0_4px_0_#241407]">
          CodeQuest
        </h1>
        <p className="font-display text-xl sm:text-2xl text-parchment-50 mt-3">
          Conquer a new language, one stronghold at a time.
        </p>
        <p className="font-body text-parchment-100/90 mt-4 max-w-xl mx-auto">
          A gamified path that maps the language you know to the one you're learning —
          built for builders who already shipped code.
        </p>
      </motion.div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        {showAuth ? (
          <>
            <Link href="/signup" className="btn-gold text-2xl px-8 py-4">
              Forge your kingdom
            </Link>
            <Link href="/login" className="btn-stone text-lg">
              Sign in
            </Link>
          </>
        ) : (
          <Link href="/onboarding" className="btn-gold text-2xl px-8 py-4">
            Begin your saga
          </Link>
        )}
        {hydrated && profile.onboarded && (
          <Link href="/dashboard" className="btn-stone text-lg">
            Continue
          </Link>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl w-full">
        <FeatureCard icon="🗺️" title="Kingdom map" body="Modules unlock like a strategy game — see exactly what's next." />
        <FeatureCard icon="⚡" title="Compare, don't restart" body="Lessons teach by analogy to what you already know." />
        <FeatureCard icon="🏆" title="XP, streaks, badges" body="Daily streaks, achievements, and a leaderboard keep you coming back." />
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="panel-wood p-4">
      <div className="text-3xl">{icon}</div>
      <div className="font-display text-lg text-gold-400 mt-1">{title}</div>
      <div className="font-body text-sm text-parchment-100/90 mt-1">{body}</div>
    </div>
  );
}
