// Question type definitions for all quiz games

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option (0-3)
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: QuestionCategory;
  tags?: string[]; // for filtering
}

export type QuestionCategory =
  | "luong-chat" // Quy luật Lượng - Chất
  | "mau-thuan" // Quy luật Mâu thuẫn
  | "phu-dinh" // Quy luật Phủ định của Phủ định
  | "lien-he" // Nguyên lý mối liên hệ phổ biến
  | "phat-trien" // Nguyên lý về sự phát triển
  | "ban-chat" // Phạm trù Bản chất - Hiện tượng
  | "nguyen-nhan" // Phạm trù Nguyên nhân - Kết quả
  | "noi-dung" // Phạm trù Nội dung - Hình thức
  | "tat-nhien" // Phạm trù Tất nhiên - Ngẫu nhiên
  | "kha-nang" // Phạm trù Khả năng - Hiện thực
  | "cai-chung" // Phạm trù Cái chung - Cái riêng
  | "puzzle"; // Câu đố vui

export const categoryLabels: Record<QuestionCategory, string> = {
  "luong-chat": "Quy luật Lượng - Chất",
  "mau-thuan": "Quy luật Mâu thuẫn",
  "phu-dinh": "Quy luật Phủ định của Phủ định",
  "lien-he": "Nguyên lý mối liên hệ phổ biến",
  "phat-trien": "Nguyên lý về sự phát triển",
  "ban-chat": "Phạm trù Bản chất - Hiện tượng",
  "nguyen-nhan": "Phạm trù Nguyên nhân - Kết quả",
  "noi-dung": "Phạm trù Nội dung - Hình thức",
  "tat-nhien": "Phạm trù Tất nhiên - Ngẫu nhiên",
  "kha-nang": "Phạm trù Khả năng - Hiện thực",
  "cai-chung": "Phạm trù Cái chung - Cái riêng",
  puzzle: "Câu đố vui",
};
