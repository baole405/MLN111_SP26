// Câu hỏi về Quy luật Mâu thuẫn (Thống nhất và đấu tranh của các mặt đối lập)
// Nguồn: Giáo trình Triết học Mác-Lênin, baitaptracnghiem.com

import type { QuizQuestion } from "./types";

export const mauThuanQuestions: QuizQuestion[] = [
  {
    id: "mt-1",
    question:
      "Theo quy luật mâu thuẫn, nguồn gốc và động lực của sự phát triển là gì?",
    options: [
      "Sự tác động từ bên ngoài",
      "Sự thống nhất và đấu tranh của các mặt đối lập",
      "Sự tích lũy về lượng",
      "Sự phủ định biện chứng",
    ],
    correctAnswer: 1,
    explanation:
      "Quy luật mâu thuẫn chỉ ra rằng mâu thuẫn (sự thống nhất và đấu tranh của các mặt đối lập) là NGUỒN GỐC và ĐỘNG LỰC bên trong của sự phát triển.",
    difficulty: "medium",
    category: "mau-thuan",
    tags: ["nguồn gốc", "động lực"],
  },
  {
    id: "mt-2",
    question:
      "Em muốn app chạy NHANH nhưng cũng muốn code DỄ VIẾT. Đây là ví dụ của điều gì trong triết học?",
    options: [
      "Mối liên hệ phổ biến",
      "Mâu thuẫn biện chứng",
      "Bước nhảy về chất",
      "Phủ định biện chứng",
    ],
    correctAnswer: 1,
    explanation:
      "Hai mong muốn đối lập (Performance vs Simplicity) tồn tại trong cùng một sự vật. Đây là mâu thuẫn biện chứng - động lực để tìm giải pháp tối ưu!",
    difficulty: "medium",
    category: "mau-thuan",
    tags: ["IT", "ví dụ đời sống"],
  },
  {
    id: "mt-3",
    question:
      'Trong bạn có sự đấu tranh giữa "muốn chơi game" và "muốn học bài". Theo triết học Mác-Lênin, đây là nguồn gốc của điều gì?',
    options: [
      "Stress và áp lực",
      "Sự phát triển và trưởng thành",
      "Sự thất bại",
      "Không có ý nghĩa gì",
    ],
    correctAnswer: 1,
    explanation:
      "Mâu thuẫn giữa các mặt đối lập (chơi vs học) là NGUỒN GỐC, ĐỘNG LỰC của sự phát triển. Giải quyết mâu thuẫn = Trưởng thành!",
    difficulty: "hard",
    category: "mau-thuan",
    tags: ["ví dụ đời sống"],
  },
  {
    id: "mt-4",
    question:
      "Trade-off: Performance vs Memory, Security vs Usability. Trong System Design, đây là ví dụ của điều gì?",
    options: [
      "Lỗi thiết kế",
      "Mâu thuẫn biện chứng",
      "Phủ định biện chứng",
      "Quy luật lượng chất",
    ],
    correctAnswer: 1,
    explanation:
      "Các mặt đối lập (Performance ↔ Memory) vừa thống nhất (cùng trong một hệ thống) vừa đấu tranh (tăng cái này giảm cái kia). Đây là mâu thuẫn biện chứng!",
    difficulty: "hard",
    category: "mau-thuan",
    tags: ["IT", "system design"],
  },
  {
    id: "mt-5",
    question:
      "Hai mặt đối lập trong mâu thuẫn biện chứng có quan hệ như thế nào?",
    options: [
      "Chỉ đấu tranh, không thống nhất",
      "Chỉ thống nhất, không đấu tranh",
      "Vừa thống nhất vừa đấu tranh với nhau",
      "Hoàn toàn độc lập với nhau",
    ],
    correctAnswer: 2,
    explanation:
      "Hai mặt đối lập vừa THỐNG NHẤT (tồn tại cùng nhau, nương tựa nhau) vừa ĐẤU TRANH (bài trừ, phủ định nhau). Đây là đặc điểm quan trọng của mâu thuẫn biện chứng.",
    difficulty: "medium",
    category: "mau-thuan",
    tags: ["lý thuyết"],
  },
  {
    id: "mt-6",
    question:
      "Vừa muốn ăn ngon vừa muốn giảm cân. Kết quả của việc giải quyết mâu thuẫn này là gì?",
    options: [
      "Bỏ cuộc, không làm gì",
      "Chỉ chọn được 1 trong 2",
      "Tìm ra phương pháp ăn uống khoa học (cái mới cao hơn)",
      "Mâu thuẫn này không giải quyết được",
    ],
    correctAnswer: 2,
    explanation:
      "Giải quyết mâu thuẫn biện chứng tạo ra cái mới cao hơn: phương pháp ăn uống khoa học vừa ngon vừa healthy. Đây là sự phát triển!",
    difficulty: "medium",
    category: "mau-thuan",
    tags: ["ví dụ đời sống"],
  },
];
