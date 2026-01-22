// Câu hỏi về Nguyên lý mối liên hệ phổ biến và Nguyên lý về sự phát triển
// Nguồn: Giáo trình Triết học Mác-Lênin, baitaptracnghiem.com

import type { QuizQuestion } from "./types";

export const lienHeQuestions: QuizQuestion[] = [
  {
    id: "lh-1",
    question:
      'Nguyên lý "Mối liên hệ phổ biến" khẳng định điều gì về các sự vật, hiện tượng?',
    options: [
      "Mọi sự vật đều tồn tại độc lập, không liên quan đến nhau",
      "Chỉ những sự vật gần nhau mới có liên hệ",
      "Mọi sự vật đều tồn tại trong mối liên hệ, tác động qua lại lẫn nhau",
      "Liên hệ chỉ tồn tại trong tư duy con người",
    ],
    correctAnswer: 2,
    explanation:
      "Nguyên lý này khẳng định không có sự vật nào tồn tại biệt lập. Mọi thứ đều có mối liên hệ, ảnh hưởng lẫn nhau.",
    difficulty: "easy",
    category: "lien-he",
    tags: ["lý thuyết"],
  },
  {
    id: "lh-2",
    question:
      "Giá xăng thế giới tăng → Giá rau ngoài chợ tăng → Bữa cơm sinh viên đắt đỏ hơn. Điều này thể hiện nguyên lý nào?",
    options: [
      "Nguyên lý về sự phát triển",
      "Nguyên lý về mối liên hệ phổ biến",
      "Quy luật mâu thuẫn",
      "Phạm trù nguyên nhân - kết quả",
    ],
    correctAnswer: 1,
    explanation:
      "Mọi sự vật đều có mối liên hệ với nhau. Giá xăng ảnh hưởng đến vận chuyển → giá rau → túi tiền sinh viên. Đây là nguyên lý về mối liên hệ phổ biến!",
    difficulty: "easy",
    category: "lien-he",
    tags: ["ví dụ đời sống"],
  },
  {
    id: "lh-3",
    question:
      "Bug ở frontend nhưng root cause ở backend API. Điều này thể hiện nguyên lý nào?",
    options: [
      "Quy luật lượng chất",
      "Nguyên lý mối liên hệ phổ biến",
      "Quy luật phủ định",
      "Phạm trù bản chất hiện tượng",
    ],
    correctAnswer: 1,
    explanation:
      "Frontend và Backend có mối liên hệ mật thiết. Vấn đề ở một nơi có thể biểu hiện ở nơi khác. Cần nhìn tổng thể hệ thống!",
    difficulty: "medium",
    category: "lien-he",
    tags: ["IT", "debugging"],
  },
  {
    id: "lh-4",
    question:
      "Thay đổi database schema → Phải update tất cả services. Điều này thể hiện tính chất gì của mối liên hệ?",
    options: [
      "Tính đa dạng",
      "Tính khách quan",
      "Tính phổ biến",
      "Tính ngẫu nhiên",
    ],
    correctAnswer: 2,
    explanation:
      "Mối liên hệ có tính PHỔ BIẾN: tồn tại ở mọi nơi, mọi lúc. Trong microservices, thay đổi 1 service ảnh hưởng đến nhiều services khác.",
    difficulty: "medium",
    category: "lien-he",
    tags: ["IT", "microservices"],
  },
  {
    id: "lh-5",
    question: "Quan điểm siêu hình về mối liên hệ có đặc điểm gì?",
    options: [
      "Thừa nhận mọi sự vật đều có mối liên hệ phổ biến",
      "Phủ nhận mối liên hệ hoặc chỉ thừa nhận một số mối liên hệ bề ngoài",
      "Nhấn mạnh mối liên hệ bên trong",
      "Coi mối liên hệ là nguồn gốc của sự phát triển",
    ],
    correctAnswer: 1,
    explanation:
      "Quan điểm siêu hình phủ nhận hoặc chỉ thừa nhận một số mối liên hệ bề ngoài, ngẫu nhiên. Ngược lại, phép biện chứng thừa nhận mối liên hệ PHỔ BIẾN.",
    difficulty: "hard",
    category: "lien-he",
    tags: ["lý thuyết", "siêu hình"],
  },
];
