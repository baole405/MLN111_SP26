"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { laws, matchItems, shuffleArray, type MatchItem } from "./matcher-data";

type GameState = "idle" | "playing" | "finished";

interface DroppedItem {
  item: MatchItem;
  isCorrect: boolean;
}

export function DragDropGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [availableItems, setAvailableItems] = useState<MatchItem[]>([]);
  const [droppedItems, setDroppedItems] = useState<
    Record<string, DroppedItem[]>
  >({});
  const [score, setScore] = useState(0);
  const [draggedItem, setDraggedItem] = useState<MatchItem | null>(null);
  const [showFeedback, setShowFeedback] = useState<{
    lawId: string;
    isCorrect: boolean;
  } | null>(null);

  const totalItems = 8; // Chơi 8 items mỗi game

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(matchItems).slice(0, totalItems);
    setAvailableItems(shuffled);
    setDroppedItems({});
    setScore(0);
    setGameState("playing");
  }, []);

  const handleDragStart = (item: MatchItem) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (lawId: string) => {
    if (!draggedItem) return;

    const isCorrect = draggedItem.lawId === lawId;

    // Add to dropped items
    setDroppedItems((prev) => ({
      ...prev,
      [lawId]: [...(prev[lawId] || []), { item: draggedItem, isCorrect }],
    }));

    // Remove from available
    setAvailableItems((prev) =>
      prev.filter((item) => item.id !== draggedItem.id),
    );

    // Update score
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // Show feedback
    setShowFeedback({ lawId, isCorrect });
    setTimeout(() => setShowFeedback(null), 1000);

    // Check if finished
    if (availableItems.length <= 1) {
      setTimeout(() => setGameState("finished"), 500);
    }

    setDraggedItem(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / totalItems) * 100;
    if (percentage >= 90)
      return { emoji: "🏆", text: "Xuất sắc! Bạn là bậc thầy triết học!" };
    if (percentage >= 70)
      return { emoji: "🎉", text: "Tuyệt vời! Hiểu rất tốt!" };
    if (percentage >= 50) return { emoji: "👍", text: "Khá tốt! Cần ôn thêm!" };
    return { emoji: "📚", text: "Cần cố gắng hơn!" };
  };

  // IDLE STATE
  if (gameState === "idle") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-6">🎯</div>
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Nối Đúng Quy Luật
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Kéo các tình huống vào đúng quy luật triết học tương ứng!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg"
        >
          🚀 Bắt Đầu!
        </motion.button>
      </motion.div>
    );
  }

  // FINISHED STATE
  if (gameState === "finished") {
    const result = getScoreMessage();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-8xl mb-6">{result.emoji}</div>
        <h3 className="text-3xl font-bold text-foreground mb-4">
          {result.text}
        </h3>
        <div className="text-6xl font-bold text-primary mb-6">
          {score}/{totalItems}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg"
        >
          🔄 Chơi Lại
        </motion.button>
      </motion.div>
    );
  }

  // PLAYING STATE
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-muted-foreground">
          Còn lại:{" "}
          <span className="text-primary font-bold">
            {availableItems.length}
          </span>{" "}
          items
        </div>
        <div className="text-muted-foreground">
          Điểm: <span className="text-primary font-bold">{score}</span>
        </div>
      </div>

      {/* Draggable Items */}
      <div className="bg-card rounded-xl p-4 border border-border min-h-[120px]">
        <p className="text-sm text-muted-foreground mb-3">
          📦 Kéo và thả vào quy luật đúng:
        </p>
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {availableItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragEnd={handleDragEnd}
                className={`px-4 py-2 bg-secondary rounded-lg cursor-grab active:cursor-grabbing 
                  border-2 border-transparent hover:border-primary/50 transition-colors
                  ${draggedItem?.id === item.id ? "opacity-50" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Drop Targets - Laws */}
      <div className="grid md:grid-cols-2 gap-4">
        {laws.map((law) => (
          <motion.div
            key={law.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(law.id)}
            className={`relative rounded-xl p-4 border-2 border-dashed transition-all min-h-[150px]
              ${draggedItem ? "border-primary bg-primary/5" : "border-border"}
              ${
                showFeedback?.lawId === law.id
                  ? showFeedback.isCorrect
                    ? "border-amber-600 bg-amber-600/10"
                    : "border-stone-500 bg-stone-500/10"
                  : ""
              }`}
          >
            {/* Law header */}
            <div
              className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 ${law.color}`}
            >
              {law.shortName}
            </div>
            <h4 className="text-sm text-muted-foreground mb-3">{law.name}</h4>

            {/* Dropped items */}
            <div className="space-y-2">
              {droppedItems[law.id]?.map(({ item, isCorrect }) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isCorrect
                      ? "bg-amber-700/20 text-amber-600 border border-amber-600/50"
                      : "bg-stone-500/20 text-stone-500 border border-stone-500/50"
                  }`}
                >
                  {isCorrect ? "✓" : "✗"} {item.text}
                </motion.div>
              ))}
            </div>

            {/* Feedback animation */}
            <AnimatePresence>
              {showFeedback?.lawId === law.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-6xl">
                    {showFeedback.isCorrect ? "✅" : "❌"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Hint */}
      <p className="text-center text-muted-foreground text-sm italic">
        💡 Đọc kỹ tình huống và suy nghĩ xem nó thể hiện quy luật nào
      </p>
    </div>
  );
}
