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
      
      const localProfile = useGameStore.getState().profile;
      
      if (serverProfile) {
        // If the local profile has completed onboarding but the server profile hasn't,
        // it means we have local guest progress that we need to push UP to the server.
        if (localProfile.onboarded && !serverProfile.onboarded) {
          console.log("⬆️ Up-syncing local guest progress to server...");
          
          // Ensure the name is set if it was left as default
          const mergedProfile = {
            ...localProfile,
            name: localProfile.name !== "Chieftain" ? localProfile.name : (u.user_metadata?.display_name || u.email?.split("@")[0] || "Chieftain")
          };
          
          useGameStore.setState({ profile: mergedProfile, hydrated: true });
          // Push everything to Supabase async
          const { syncAllToSupabase } = await import("@/lib/sync/profile");
          void syncAllToSupabase(supabase, u.id, mergedProfile);
        } else {
          // Trust the server profile (down-sync)
          useGameStore.setState({ profile: serverProfile, hydrated: true });
        }
      } else {
        // Fresh user without a DB row yet: keep zustand defaults (with guest progress if any)
        // but stamp the email-derived name.
        const mergedProfile = {
          ...localProfile,
          name: u.user_metadata?.display_name || u.email?.split("@")[0] || "Chieftain",
        };
        useGameStore.setState({ profile: mergedProfile, hydrated: true });
        
        // If they already finished onboarding locally, sync it up now
        if (mergedProfile.onboarded) {
          const { syncAllToSupabase } = await import("@/lib/sync/profile");
          void syncAllToSupabase(supabase, u.id, mergedProfile);
        }
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
