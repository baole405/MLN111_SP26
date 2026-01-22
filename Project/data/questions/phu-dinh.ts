// Câu hỏi về Quy luật Phủ định của Phủ định
// Nguồn: Giáo trình Triết học Mác-Lênin, duytan.edu.vn

import type { QuizQuestion } from "./types";

export const phuDinhQuestions: QuizQuestion[] = [
  {
    id: "pd-1",
    question:
      'Quy luật "Phủ định của phủ định" mô tả sự phát triển theo hình thức nào?',
    options: [
      "Đường thẳng đi lên",
      "Vòng tròn lặp lại",
      "Đường xoáy ốc (spiral) đi lên",
      "Đường zigzag ngẫu nhiên",
    ],
    correctAnswer: 2,
    explanation:
      "Sự phát triển diễn ra theo đường xoáy ốc: cái mới phủ định cái cũ, rồi bị phủ định tiếp, nhưng mỗi vòng xoắn đều ở mức cao hơn.",
    difficulty: "easy",
    category: "phu-dinh",
    tags: ["đường xoáy ốc", "lý thuyết"],
  },
  {
    id: "pd-2",
    question:
      "jQuery ra đời → React thay thế jQuery → Next.js phát triển từ React. Đây là ví dụ của quy luật nào?",
    options: [
      "Quy luật Lượng - Chất",
      "Quy luật Mâu thuẫn",
      "Quy luật Phủ định của Phủ định",
      "Phạm trù Khả năng - Hiện thực",
    ],
    correctAnswer: 2,
    explanation:
      "Cái mới (React) phủ định cái cũ (jQuery), rồi cái mới hơn (Next.js) lại phủ định React nhưng kế thừa tinh hoa. Đây là quy luật Phủ định của Phủ định!",
    difficulty: "easy",
    category: "phu-dinh",
    tags: ["IT", "frontend"],
  },
  {
    id: "pd-3",
    question:
      "Monolithic → Microservices → Serverless. Sự phát triển này thể hiện đặc điểm gì của phủ định biện chứng?",
    options: [
      "Phủ định hoàn toàn, bỏ hết cái cũ",
      "Kế thừa những yếu tố tích cực của cái bị phủ định",
      "Quay lại cái cũ",
      "Không có liên hệ với cái cũ",
    ],
    correctAnswer: 1,
    explanation:
      "Phủ định biện chứng không phủ định sạch trơn mà KẾ THỪA những yếu tố tích cực. Serverless kế thừa ưu điểm của Microservices (phân tán, độc lập).",
    difficulty: "medium",
    category: "phu-dinh",
    tags: ["IT", "architecture"],
  },
  {
    id: "pd-4",
    question:
      "Làng → Thị trấn → Thành phố (đô thị hóa). Đây là ví dụ của quy luật nào?",
    options: [
      "Quy luật Lượng - Chất",
      "Quy luật Mâu thuẫn",
      "Quy luật Phủ định của Phủ định",
      "Nguyên lý mối liên hệ",
    ],
    correctAnswer: 2,
    explanation:
      "Thị trấn phủ định làng (nhưng kế thừa dân cư, văn hóa), thành phố phủ định thị trấn (nhưng kế thừa cơ sở hạ tầng). Mỗi lần phủ định đều ở mức cao hơn.",
    difficulty: "medium",
    category: "phu-dinh",
    tags: ["đô thị hóa", "ví dụ đời sống"],
  },
  {
    id: "pd-5",
    question:
      "Quy luật phủ định của phủ định vạch ra điều gì về sự phát triển?",
    options: [
      "Nguồn gốc của sự phát triển",
      "Cách thức của sự phát triển",
      "Khuynh hướng của sự phát triển",
      "Tốc độ của sự phát triển",
    ],
    correctAnswer: 2,
    explanation:
      "Quy luật phủ định của phủ định vạch ra KHUYNH HƯỚNG của sự phát triển: tiến lên, đi theo đường xoáy ốc, kế thừa có chọn lọc.",
    difficulty: "hard",
    category: "phu-dinh",
    tags: ["lý thuyết"],
  },
];
