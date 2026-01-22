// Câu đố vui về triết học - dạng puzzle/riddle
// Các câu hỏi ứng dụng thực tế, dễ hiểu

import type { QuizQuestion } from "./types";

export const puzzleQuestions: QuizQuestion[] = [
  {
    id: "pz-1",
    question:
      "🧊 Nước ở 0°C chuyển từ lỏng sang rắn (đóng băng). Đây là ví dụ của quy luật nào?",
    options: [
      "Quy luật Mâu thuẫn",
      "Quy luật Lượng - Chất",
      "Quy luật Phủ định của Phủ định",
      "Nguyên lý mối liên hệ",
    ],
    correctAnswer: 1,
    explanation:
      "Nhiệt độ giảm (thay đổi về LƯỢNG) đến 0°C (điểm nút) → nước chuyển từ lỏng sang rắn (thay đổi về CHẤT). Đây là quy luật Lượng - Chất!",
    difficulty: "easy",
    category: "puzzle",
    tags: ["puzzle", "nước"],
  },
  {
    id: "pz-2",
    question:
      "🥚 Trứng gà → Gà con → Gà trưởng thành → Đẻ trứng. Đây là ví dụ của quy luật nào?",
    options: [
      "Quy luật Lượng - Chất",
      "Quy luật Mâu thuẫn",
      "Quy luật Phủ định của Phủ định",
      "Phạm trù Nguyên nhân - Kết quả",
    ],
    correctAnswer: 2,
    explanation:
      "Gà con phủ định trứng, gà trưởng thành phủ định gà con, rồi đẻ trứng (quay lại nhưng ở mức cao hơn). Đây là phủ định của phủ định!",
    difficulty: "medium",
    category: "puzzle",
    tags: ["puzzle", "sinh học"],
  },
  {
    id: "pz-3",
    question:
      "💻 Windows XP → Windows 7 → Windows 10 → Windows 11. Mỗi phiên bản mới có gì đặc biệt theo triết học?",
    options: [
      "Hoàn toàn mới, không liên quan đến phiên bản cũ",
      "Phủ định phiên bản cũ nhưng kế thừa ưu điểm",
      "Chỉ đổi tên, không thay đổi gì",
      "Quay lại giống phiên bản đầu tiên",
    ],
    correctAnswer: 1,
    explanation:
      "Mỗi phiên bản Windows PHỦ ĐỊNH phiên bản cũ nhưng KẾ THỪA những tính năng tốt. Đây là phủ định biện chứng, không phải phủ định sạch trơn!",
    difficulty: "medium",
    category: "puzzle",
    tags: ["puzzle", "IT"],
  },
  {
    id: "pz-4",
    question:
      "🦋 Sâu → Nhộng → Bướm. Quá trình biến đổi này thể hiện quy luật nào RÕ NHẤT?",
    options: [
      "Quy luật Lượng - Chất (bước nhảy về chất)",
      "Quy luật Mâu thuẫn",
      "Nguyên lý mối liên hệ",
      "Phạm trù Bản chất - Hiện tượng",
    ],
    correctAnswer: 0,
    explanation:
      "Từ sâu → bướm là BƯỚC NHẢY VỀ CHẤT. Sâu tích lũy dinh dưỡng (lượng), đến điểm nút thì hóa nhộng rồi thành bướm (chất hoàn toàn mới)!",
    difficulty: "easy",
    category: "puzzle",
    tags: ["puzzle", "sinh học"],
  },
  {
    id: "pz-5",
    question:
      "⚡ Điện thoại sạc từ 0% → 100% không có gì đặc biệt. Nhưng sạc từ 99% → 100% thì hiện thông báo 'Đã đầy'. % nào là điểm nút?",
    options: ["0%", "50%", "99%", "100%"],
    correctAnswer: 3,
    explanation:
      "100% là ĐIỂM NÚT - ngưỡng mà khi đạt đến, hệ thống chuyển từ trạng thái 'đang sạc' sang 'đã đầy' (thay đổi về chất).",
    difficulty: "easy",
    category: "puzzle",
    tags: ["puzzle", "công nghệ"],
  },
];
