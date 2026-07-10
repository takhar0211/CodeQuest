"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/lib/game/store";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { Sparkles, Trophy, Flag, Crown } from "lucide-react";

export function RewardOverlay() {
  const queue = useGameStore((s) => s.rewardQueue);
  const dismiss = useGameStore((s) => s.dismissReward);
  const head = queue[0];

  return (
    <AnimatePresence>
      {head && (
        <motion.div
          key={head.id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark-900/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dismiss(head.id)}
        >
          <motion.div
            className="panel-wood px-8 py-7 text-center max-w-sm"
            initial={{ scale: 0.5, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <RewardIcon kind={head.kind} icon={head.icon} />
            <div className="font-display text-3xl text-gold-400 mt-2 drop-shadow-[0_2px_0_#241407]">
              {head.title}
            </div>
            {head.kind === "achievement" && head.icon && (
              <AchievementBody id={head.icon} />
            )}
            {head.kind === "module" && (
              <p className="font-body text-parchment-100 mt-2">
                Onward to the next territory.
              </p>
            )}
            {head.kind === "levelup" && (
              <p className="font-body text-parchment-100 mt-2">
                New defenses, new powers.
              </p>
            )}
            <button
              className="btn-gold mt-5"
              onClick={() => dismiss(head.id)}
            >
              Claim
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RewardIcon({ kind, icon }: { kind: string; icon?: string }) {
  if (kind === "levelup")
    return (
      <Crown size={56} className="mx-auto text-gold-400 animate-bob" />
    );
  if (kind === "module")
    return <Flag size={56} className="mx-auto text-ember-400 animate-bob" />;
  if (kind === "achievement") {
    const ach = ACHIEVEMENTS.find((a) => a.id === icon);
    return (
      <div className="text-6xl animate-bob">
        {ach?.icon ?? <Trophy />}
      </div>
    );
  }
  return (
    <Sparkles size={56} className="mx-auto text-gold-400 animate-pulseGold rounded-full" />
  );
}

function AchievementBody({ id }: { id: string }) {
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return null;
  return (
    <div className="mt-1">
      <div className="font-display text-xl text-parchment-50">{ach.title}</div>
      <div className="font-body text-sm text-parchment-100 mt-1">
        {ach.description}
      </div>
    </div>
  );
}
