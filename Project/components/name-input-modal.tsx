"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePlayer } from "./player-context";

export function NameInputModal() {
  const { isNameSet, setPlayerName } = usePlayer();
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");

  if (isNameSet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = inputName.trim();

    if (trimmedName.length < 2) {
      setError("Tên phải có ít nhất 2 ký tự");
      return;
    }
    if (trimmedName.length > 20) {
      setError("Tên không được quá 20 ký tự");
      return;
    }

    setPlayerName(trimmedName);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-8 max-w-md w-full border border-border shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Chào mừng bạn!
          </h2>
          <p className="text-muted-foreground">
            Nhập tên của bạn để bắt đầu trải nghiệm và ghi điểm
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                setError("");
              }}
              placeholder="Nhập tên của bạn..."
              className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-lg"
          >
            🚀 Bắt Đầu Khám Phá!
          </motion.button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-4">
          Điểm của bạn sẽ được lưu trên thiết bị này
        </p>
      </motion.div>
    </motion.div>
  );
}
