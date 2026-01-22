// Re-export từ data/questions để backward compatibility
// Components cũ vẫn import từ đây sẽ hoạt động bình thường

export {
  categoryLabels,
  getBalancedQuestions,
  getRandomQuestions,
  allQuestions as quizQuestions,
} from "@/data/questions";
export type { QuestionCategory, QuizQuestion } from "@/data/questions";
