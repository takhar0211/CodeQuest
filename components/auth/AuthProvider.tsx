"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "@/lib/supabase/browser";
import { setSyncBridge } from "@/lib/sync/bridge";
import { loadProfileFromSupabase } from "@/lib/sync/profile";
import { useGameStore } from "@/lib/game/store";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  signOut: () => Promise<void>;
  /** Re-pull profile from DB (e.g. after onboarding writes server-side). */
  refreshProfile: () => Promise<void>;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(configured);

  // Apply server profile to the local zustand store, or reset to defaults.
  const applyUser = useCallback(async (u: User | null) => {
    if (!u) {
      setSyncBridge(null);
      return;
    }
    try {
      const supabase = getSupabaseBrowserClient();
      setSyncBridge({ supabase, user: u });
      const serverProfile = await loadProfileFromSupabase(supabase, u.id);
      if (serverProfile) {
        useGameStore.setState({ profile: serverProfile, hydrated: true });
      } else {
        // Fresh user: keep zustand defaults but stamp the email-derived name.
        useGameStore.setState((s) => ({
          profile: {
            ...s.profile,
            name: u.user_metadata?.display_name || u.email?.split("@")[0] || "Chieftain",
          },
          hydrated: true,
        }));
      }
    } catch (e) {
      console.warn("applyUser failed", e);
    }
  }, []);

  useEffect(() => {
    if (!configured) return;
    const supabase = getSupabaseBrowserClient();
    let cancelled = false;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      await applyUser(data.session?.user ?? null);
      setLoading(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      void applyUser(sess?.user ?? null);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [configured, applyUser]);

  const signOut = useCallback(async () => {
    if (!configured) return;
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    setSyncBridge(null);
    // Wipe local profile so the next user doesn't inherit it.
    useGameStore.getState().reset();
  }, [configured]);

  const refreshProfile = useCallback(async () => {
    if (user) await applyUser(user);
  }, [user, applyUser]);

  return (
    <Ctx.Provider
      value={{ user, session, loading, configured, signOut, refreshProfile }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(Ctx);
  if (!ctx)
    return {
      user: null,
      session: null,
      loading: false,
      configured: false,
      signOut: async () => {},
      refreshProfile: async () => {},
    };
  return ctx;
}
