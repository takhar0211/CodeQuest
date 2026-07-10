"use client";

import { useEffect } from "react";
import { useGameStore } from "@/lib/game/store";
import { Hud } from "@/components/hud/Hud";
import { RewardOverlay } from "@/components/hud/RewardOverlay";

/** Wraps client pages with HUD + reward overlay and ensures store is ready. */
export function ClientShell({
  children,
  hideHud,
}: {
  children: React.ReactNode;
  hideHud?: boolean;
}) {
  const setHydrated = useGameStore((s) => s.setHydrated);
  useEffect(() => {
    // Persist middleware sets hydrated via onRehydrateStorage, but cover the
    // case where storage is empty (no rehydrate event fires).
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, [setHydrated]);
  return (
    <>
      {!hideHud && <Hud />}
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      <RewardOverlay />
    </>
  );
}
