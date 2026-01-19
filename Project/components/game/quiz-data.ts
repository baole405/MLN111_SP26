export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  category: string; // quy luật hoặc phạm trù liên quan
}

export const quizQuestions: QuizQuestion[] = [
  // EASY QUESTIONS
  {
    id: 1,
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
      "Tích lũy thức ăn (lượng) đến ngưỡng → bụng nổ (thay đổi về chất). Đây chính là quy luật Lượng - Chất!",
    difficulty: "easy",
    category: "Quy luật Lượng - Chất",
  },
  {
    id: 2,
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
    category: "Nguyên lý về mối liên hệ phổ biến",
  },
  {
    id: 3,
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
    category: "Quy luật Phủ định của Phủ định",
  },

  // MEDIUM QUESTIONS
  {
    id: 4,
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
      "Hai mong muốn đối lập (Performance vs Simplicity) tồn tại trong cùng một sự vật. Đây là mâu thuẫn biện chứng - động lực của sự phát triển!",
    difficulty: "medium",
    category: "Quy luật Mâu thuẫn",
  },
  {
    id: 5,
    question:
      "Code của bạn chạy được nhưng chậm (Hiện tượng). Nguyên nhân là thuật toán O(n²) (Bản chất). Đây là cặp phạm trù nào?",
    options: [
      "Nguyên nhân - Kết quả",
      "Nội dung - Hình thức",
      "Bản chất - Hiện tượng",
      "Khả năng - Hiện thực",
    ],
    correctAnswer: 2,
    explanation:
      "Code chạy chậm là HIỆN TƯỢNG bên ngoài. Thuật toán tệ là BẢN CHẤT bên trong. Muốn fix bug, phải tìm bản chất!",
    difficulty: "medium",
    category: "Phạm trù Bản chất - Hiện tượng",
  },
  {
    id: 6,
    question:
      "Học tiếng Anh 30 phút mỗi ngày, sau 1 năm đột nhiên xem phim không cần phụ đề. 'Đột nhiên' ở đây là gì?",
    options: [
      "Tích lũy về lượng",
      "Điểm nút",
      "Bước nhảy vọt về chất",
      "Phủ định biện chứng",
    ],
    correctAnswer: 2,
    explanation:
      "Sau khi tích lũy đủ lượng (30 phút × 365 ngày), bạn đạt điểm nút và xảy ra BƯỚC NHẢY VỌT VỀ CHẤT - từ 'không hiểu' sang 'hiểu'!",
    difficulty: "medium",
    category: "Quy luật Lượng - Chất",
  },
  {
    id: 7,
    question:
      "Một startup làm app. Ban đầu chỉ là ý tưởng, sau đó có MVP, rồi có 1 triệu users. Đây là cặp phạm trù nào?",
    options: [
      "Bản chất - Hiện tượng",
      "Nguyên nhân - Kết quả",
      "Khả năng - Hiện thực",
      "Tất nhiên - Ngẫu nhiên",
    ],
    correctAnswer: 2,
    explanation:
      "Ý tưởng là KHẢ NĂNG (có thể thành hiện thực). MVP và 1 triệu users là HIỆN THỰC (đã tồn tại thực tế).",
    difficulty: "medium",
    category: "Phạm trù Khả năng - Hiện thực",
  },

  // HARD QUESTIONS
  {
    id: 8,
    question:
      "Nếu server không được bảo trì, nó sập là TẤT NHIÊN. Nhưng sập vào lúc 2h sáng thứ 7 là NGẪU NHIÊN. Ý nghĩa thực tiễn là gì?",
    options: [
      "Tập trung vào cái tất nhiên (bảo trì đều đặn), chấp nhận cái ngẫu nhiên (có backup plan)",
      "Cố gắng dự đoán cái ngẫu nhiên",
      "Bỏ qua cả hai vì không kiểm soát được",
      "Chỉ cần auto-restart là được",
    ],
    correctAnswer: 0,
    explanation:
      "Người khôn ngoan tập trung vào cái TẤT NHIÊN (bảo trì, monitoring) và chuẩn bị cho cái NGẪU NHIÊN (failover, backup). Đây là ý nghĩa phương pháp luận!",
    difficulty: "hard",
    category: "Phạm trù Tất nhiên - Ngẫu nhiên",
  },
  {
    id: 9,
    question:
      "Trong bạn có sự đấu tranh giữa 'muốn chơi game' và 'muốn học bài'. Theo triết học Mác-Lênin, đây là nguồn gốc của điều gì?",
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
    category: "Quy luật Mâu thuẫn",
  },
  {
    id: 10,
    question:
      "Một ứng dụng UI đẹp (Hình thức) nhưng thuật toán tệ (Nội dung). Theo triết học, điều gì sẽ xảy ra?",
    options: [
      "App vẫn thành công vì UI quan trọng hơn",
      "Nội dung sẽ 'bục ra' qua hình thức - App sẽ lộ điểm yếu",
      "Hình thức và nội dung không liên quan nhau",
      "Chỉ cần marketing tốt là được",
    ],
    correctAnswer: 1,
    explanation:
      "NỘI DUNG quyết định HÌNH THỨC. Thuật toán tệ (nội dung) sẽ khiến app chậm, lag, crash - dù UI có đẹp đến đâu cũng sẽ bị lộ!",
    difficulty: "hard",
    category: "Phạm trù Nội dung - Hình thức",
  },
  {
    id: 11,
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
      "Tích lũy dữ liệu (LƯỢNG) đến ngưỡng nhất định → Model 'chợt hiểu' (nhảy vọt về CHẤT). Đây chính là quy luật Lượng-Chất trong AI!",
    difficulty: "hard",
    category: "Quy luật Lượng - Chất",
  },
  {
    id: 12,
    question:
      "Tất cả sinh viên đều là 'Con người' (Cái chung), nhưng mỗi người có fingerprint, tính cách riêng (Cái riêng). Trong OOP, điều này tương ứng với gì?",
    options: [
      "Variable và Constant",
      "Frontend và Backend",
      "Class và Object (Instance)",
      "Function và Method",
    ],
    correctAnswer: 2,
    explanation:
      "CLASS là cái chung (Human có eat(), sleep()). OBJECT là cái riêng (sinh viên Minh, sinh viên Hoa - mỗi người có thuộc tính riêng). Triết học và OOP có mối liên hệ!",
    difficulty: "hard",
    category: "Phạm trù Cái chung - Cái riêng",
  },
];
