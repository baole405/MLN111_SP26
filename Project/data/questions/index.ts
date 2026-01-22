// Central export for all quiz questions
// Import từ đây để dùng trong các components

import { lienHeQuestions } from "./lien-he";
import { luongChatQuestions } from "./luong-chat";
import { mauThuanQuestions } from "./mau-thuan";
import { phamTruQuestions } from "./pham-tru";
import { phuDinhQuestions } from "./phu-dinh";
import { puzzleQuestions } from "./puzzles";
import type { QuestionCategory, QuizQuestion } from "./types";

// Export types
export { categoryLabels } from "./types";
export type { QuestionCategory, QuizQuestion } from "./types";

// Export individual question arrays
export {
  lienHeQuestions,
  luongChatQuestions,
  mauThuanQuestions,
  phamTruQuestions,
  phuDinhQuestions,
  puzzleQuestions,
};

// Combined array of ALL questions (37 total)
export const allQuestions: QuizQuestion[] = [
  ...luongChatQuestions,
  ...mauThuanQuestions,
  ...phuDinhQuestions,
  ...lienHeQuestions,
  ...phamTruQuestions,
  ...puzzleQuestions,
];

// Get questions by category
export function getQuestionsByCategory(
  category: QuestionCategory,
): QuizQuestion[] {
  return allQuestions.filter((q) => q.category === category);
}

// Get questions by difficulty
export function getQuestionsByDifficulty(
  difficulty: "easy" | "medium" | "hard",
): QuizQuestion[] {
  return allQuestions.filter((q) => q.difficulty === difficulty);
}

// Get random questions for a game (shuffle and slice)
export function getRandomQuestions(count: number = 8): QuizQuestion[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get balanced questions (mix of difficulties)
export function getBalancedQuestions(count: number = 8): QuizQuestion[] {
  const easy = allQuestions.filter((q) => q.difficulty === "easy");
  const medium = allQuestions.filter((q) => q.difficulty === "medium");
  const hard = allQuestions.filter((q) => q.difficulty === "hard");

  // Shuffle each difficulty
  const shuffleArray = <T>(arr: T[]): T[] =>
    [...arr].sort(() => Math.random() - 0.5);

  const shuffledEasy = shuffleArray(easy);
  const shuffledMedium = shuffleArray(medium);
  const shuffledHard = shuffleArray(hard);

  // Distribute: 3 easy, 3 medium, 2 hard (for 8 questions)
  const easyCount = Math.floor(count * 0.375);
  const mediumCount = Math.floor(count * 0.375);
  const hardCount = count - easyCount - mediumCount;

  const selected = [
    ...shuffledEasy.slice(0, easyCount),
    ...shuffledMedium.slice(0, mediumCount),
    ...shuffledHard.slice(0, hardCount),
  ];

  // Shuffle final selection so difficulties are mixed
  return shuffleArray(selected);
}
