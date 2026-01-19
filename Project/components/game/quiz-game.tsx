"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import Confetti from "./confetti";
import { quizQuestions, type QuizQuestion } from "./quiz-data";

type GameState = "idle" | "playing" | "answered" | "finished";

export function QuizGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>(
    [],
  );

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const totalQuestions = 8; // Chơi 8 câu mỗi game

  // Shuffle questions khi bắt đầu game
  const startGame = useCallback(() => {
    const shuffled = [...quizQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalQuestions);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameState("playing");
    setTimeLeft(15);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing" || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Hết giờ - tự động chọn sai
          handleAnswer(-1);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleAnswer = (answerIndex: number) => {
    if (gameState !== "playing") return;

    setSelectedAnswer(answerIndex);
    setGameState("answered");

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex >= totalQuestions - 1) {
      setGameState("finished");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setGameState("playing");
      setTimeLeft(15);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90)
      return { emoji: "🏆", text: "Xuất sắc! Bạn là Triết Gia IT!" };
    if (percentage >= 70)
      return { emoji: "🎉", text: "Tuyệt vời! Bạn hiểu rất rõ!" };
    if (percentage >= 50)
      return { emoji: "👍", text: "Khá tốt! Cần ôn thêm một chút!" };
    return { emoji: "📚", text: "Cần cố gắng hơn! Đọc lại lý thuyết nhé!" };
  };

  // IDLE STATE - Start screen
  if (gameState === "idle") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-6">🎮</div>
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Đấu Trường Triết Học
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Test kiến thức về Phép Biện Chứng Duy Vật qua {totalQuestions} câu hỏi
          thú vị!
          <br />
          <span className="text-primary">15 giây</span> mỗi câu. Bạn sẵn sàng
          chưa?
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          🚀 Bắt Đầu Ngay!
        </motion.button>
      </motion.div>
    );
  }

  // FINISHED STATE - Results screen
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
          {score}/{totalQuestions}
        </div>
        <p className="text-muted-foreground mb-8">
          Bạn đã trả lời đúng {score} trên {totalQuestions} câu hỏi!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg"
        >
          🔄 Chơi Lại
        </motion.button>
      </motion.div>
    );
  }

  // PLAYING / ANSWERED STATE - Quiz screen
  return (
    <div className="relative">
      {/* Confetti effect */}
      {showConfetti && <Confetti />}

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>
            Câu {currentQuestionIndex + 1}/{totalQuestions}
          </span>
          <span>Điểm: {score}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Timer */}
      {gameState === "playing" && (
        <div className="flex justify-center mb-6">
          <motion.div
            className={`w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-2xl ${
              timeLeft <= 5
                ? "border-red-500 text-red-500"
                : "border-primary text-primary"
            }`}
            animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
          >
            {timeLeft}
          </motion.div>
        </div>
      )}

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-lg"
        >
          {/* Difficulty badge */}
          <div className="flex justify-between items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(currentQuestion.difficulty)}`}
            >
              {currentQuestion.difficulty === "easy"
                ? "Dễ"
                : currentQuestion.difficulty === "medium"
                  ? "Trung bình"
                  : "Khó"}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentQuestion.category}
            </span>
          </div>

          {/* Question */}
          <h4 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
            {currentQuestion.question}
          </h4>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              const showResult = gameState === "answered";

              let optionClass =
                "bg-secondary hover:bg-secondary/80 border-transparent";
              if (showResult) {
                if (isCorrectOption) {
                  optionClass =
                    "bg-green-500/20 border-green-500 text-green-400";
                } else if (isSelected && !isCorrectOption) {
                  optionClass = "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  optionClass = "bg-secondary/50 opacity-50";
                }
              } else if (isSelected) {
                optionClass = "bg-primary/20 border-primary";
              }

              return (
                <motion.button
                  key={index}
                  whileHover={gameState === "playing" ? { scale: 1.02 } : {}}
                  whileTap={gameState === "playing" ? { scale: 0.98 } : {}}
                  onClick={() => gameState === "playing" && handleAnswer(index)}
                  disabled={gameState !== "playing"}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${optionClass} ${
                    gameState === "playing"
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                  {showResult && isCorrectOption && (
                    <span className="ml-2">✓</span>
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <span className="ml-2">✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation (after answering) */}
          <AnimatePresence>
            {gameState === "answered" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div
                  className={`p-4 rounded-xl ${
                    isCorrect
                      ? "bg-green-500/10 border border-green-500/30"
                      : "bg-red-500/10 border border-red-500/30"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{isCorrect ? "🎉" : "💡"}</span>
                    <span
                      className={`font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}
                    >
                      {isCorrect ? "Chính xác!" : "Chưa đúng!"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {currentQuestion.explanation}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextQuestion}
                  className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-xl font-bold"
                >
                  {currentQuestionIndex >= totalQuestions - 1
                    ? "Xem Kết Quả"
                    : "Câu Tiếp Theo →"}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
