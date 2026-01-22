// Câu hỏi về Quy luật Lượng - Chất
// Nguồn: Giáo trình Triết học Mác-Lênin, baitaptracnghiem.com, onthisinhvien.com

import type { QuizQuestion } from "./types";

export const luongChatQuestions: QuizQuestion[] = [
  {
    id: "lc-1",
    question:
      'Theo quy luật "Lượng - Chất", điều gì sẽ xảy ra khi sự tích lũy về lượng đạt đến "điểm nút"?',
    options: [
      "Sự vật dừng lại, không thay đổi",
      "Xảy ra bước nhảy, thay đổi về chất",
      "Sự vật quay về trạng thái ban đầu",
      "Lượng tiếp tục tích lũy vô hạn",
    ],
    correctAnswer: 1,
    explanation:
      "Khi lượng tích lũy đến điểm nút (giới hạn), sẽ xảy ra bước nhảy làm thay đổi về chất. Ví dụ: nước đun đến 100°C sẽ chuyển thành hơi.",
    difficulty: "easy",
    category: "luong-chat",
    tags: ["điểm nút", "bước nhảy"],
  },
  {
    id: "lc-2",
    question:
      "Em vừa ăn buffet no căng. Bạn thân mang bánh sinh nhật tới. Em vẫn ăn tiếp và... bùng bụng. Đây là ví dụ của quy luật nào?",
    options: [
      "Quy luật Lượng - Chất",
      "Quy luật Mâu thuẫn",
      "Quy luật Phủ định của Phủ định",
      "Không quy luật nào cả",
    ],
    correctAnswer: 0,
    explanation:
      'Tích lũy thức ăn (lượng) đến ngưỡng → bụng "nổ" (thay đổi về chất). Đây chính là quy luật Lượng - Chất!',
    difficulty: "easy",
    category: "luong-chat",
    tags: ["ví dụ đời sống"],
  },
  {
    id: "lc-3",
    question:
      'Học tiếng Anh 30 phút mỗi ngày, sau 1 năm đột nhiên xem phim không cần phụ đề. "Đột nhiên" ở đây là gì?',
    options: [
      "Tích lũy về lượng",
      "Điểm nút",
      "Bước nhảy vọt về chất",
      "Phủ định biện chứng",
    ],
    correctAnswer: 2,
    explanation:
      'Sau khi tích lũy đủ lượng (30 phút × 365 ngày), bạn đạt điểm nút và xảy ra BƯỚC NHẢY VỌT VỀ CHẤT - từ "không hiểu" sang "hiểu"!',
    difficulty: "medium",
    category: "luong-chat",
    tags: ["bước nhảy", "ví dụ đời sống"],
  },
  {
    id: "lc-4",
    question:
      "Nước ở nhiệt độ 99°C vẫn là nước lỏng, nhưng khi đạt 100°C thì bốc hơi. Nhiệt độ 100°C được gọi là gì?",
    options: ["Độ", "Điểm nút", "Bước nhảy", "Chất mới"],
    correctAnswer: 1,
    explanation:
      "Điểm nút là giới hạn mà khi lượng (nhiệt độ) vượt qua, sẽ xảy ra sự thay đổi về chất (từ lỏng sang hơi).",
    difficulty: "easy",
    category: "luong-chat",
    tags: ["điểm nút", "nước sôi"],
  },
  {
    id: "lc-5",
    question:
      "Machine Learning: Cho model xem hàng triệu ảnh mèo, đến một lúc model 'chợt hiểu' và nhận diện được. Đây là quy luật nào?",
    options: [
      "Quy luật Mâu thuẫn",
      "Quy luật Lượng - Chất",
      "Quy luật Phủ định",
      "Không phải triết học, chỉ là toán học",
    ],
    correctAnswer: 1,
    explanation:
      'Tích lũy dữ liệu (LƯỢNG) đến ngưỡng nhất định → Model "chợt hiểu" (nhảy vọt về CHẤT). Đây chính là quy luật Lượng-Chất trong AI!',
    difficulty: "hard",
    category: "luong-chat",
    tags: ["IT", "machine learning"],
  },
  {
    id: "lc-6",
    question:
      "Server đang chạy 500 users bình thường. Tăng lên 800 vẫn ổn. Đến 1000 users thì sập. Số 1000 được gọi là gì?",
    options: ["Lượng tối đa", "Điểm nút", "Độ", "Chất mới"],
    correctAnswer: 1,
    explanation:
      'Điểm nút là ngưỡng mà khi vượt qua, hệ thống sẽ thay đổi về chất (từ "chạy" sang "sập"). 1000 users là điểm nút của server này.',
    difficulty: "medium",
    category: "luong-chat",
    tags: ["IT", "server"],
  },
  {
    id: "lc-7",
    question:
      "Quy luật lượng - chất chỉ ra điều gì về cách thức vận động, phát triển của sự vật?",
    options: [
      "Sự vật phát triển theo đường thẳng",
      "Sự thay đổi về lượng dẫn đến thay đổi về chất và ngược lại",
      "Mâu thuẫn là động lực phát triển",
      "Cái mới phủ định cái cũ",
    ],
    correctAnswer: 1,
    explanation:
      "Quy luật lượng - chất vạch ra CÁCH THỨC của sự phát triển: tích lũy lượng → đến ngưỡng → bước nhảy về chất → chất mới quy định lượng mới.",
    difficulty: "medium",
    category: "luong-chat",
    tags: ["lý thuyết"],
  },
  {
    id: "lc-8",
    question: "Trong quy luật lượng - chất, 'độ' được hiểu là gì?",
    options: [
      "Tốc độ thay đổi của lượng",
      "Khoảng giới hạn mà trong đó sự thay đổi về lượng chưa làm thay đổi căn bản về chất",
      "Đơn vị đo lường của lượng",
      "Mức độ phức tạp của chất",
    ],
    correctAnswer: 1,
    explanation:
      '"Độ" là phạm vi mà ở đó lượng có thể thay đổi nhưng chất vẫn giữ nguyên. Ví dụ: nước từ 1°C đến 99°C vẫn là nước lỏng - đó là "độ" của nước lỏng.',
    difficulty: "hard",
    category: "luong-chat",
    tags: ["lý thuyết", "độ"],
  },
];
