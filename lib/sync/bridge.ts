import type { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Tiny module-local bridge so non-React code (the zustand store) can talk
 * to Supabase without depending on the AuthProvider tree. The provider sets
 * this when a session is active; store actions read it before firing
 * fire-and-forget upserts.
 */

interface Bridge {
  supabase: SupabaseClient;
  user: User;
}

let current: Bridge | null = null;

export function setSyncBridge(next: Bridge | null) {
  current = next;
}

export function getSyncBridge(): Bridge | null {
  return current;
}
