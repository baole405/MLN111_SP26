"use client";

import { motion } from "framer-motion";
import { usePlayer } from "./player-context";

export function ScoreDisplay() {
  const { playerName, totalScore, isNameSet, resetScore } = usePlayer();

  if (!isNameSet) return null;

  const candyCount = Math.floor(totalScore / 10);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
        <span className="font-medium text-foreground">{playerName}</span>
        <span className="text-primary">•</span>
        <span className="text-primary font-bold">{totalScore} điểm</span>
        {candyCount > 0 && (
          <>
            <span className="text-muted-foreground">→</span>
            <span className="font-bold">{candyCount} 🍬</span>
          </>
        )}
      </div>

      <button
        onClick={() => {
          if (confirm("Bạn có muốn reset điểm về 0?")) {
            resetScore();
          }
        }}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        title="Reset điểm"
      >
        🔄
      </button>
    </motion.div>
  );
}
