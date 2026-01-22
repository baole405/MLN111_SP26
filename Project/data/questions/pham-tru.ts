// Câu hỏi về các Phạm trù triết học
// Nguồn: Giáo trình Triết học Mác-Lênin, baitaptracnghiem.com

import type { QuizQuestion } from "./types";

export const phamTruQuestions: QuizQuestion[] = [
  // Bản chất - Hiện tượng
  {
    id: "pt-1",
    question:
      "Trong cặp phạm trù 'Bản chất - Hiện tượng', đâu là nhận định đúng?",
    options: [
      "Bản chất và hiện tượng luôn thống nhất, không mâu thuẫn",
      "Hiện tượng có thể che giấu hoặc bóp méo bản chất",
      "Bản chất thay đổi nhanh hơn hiện tượng",
      "Chỉ cần quan sát hiện tượng là hiểu được bản chất",
    ],
    correctAnswer: 1,
    explanation:
      "Hiện tượng là biểu hiện bên ngoài của bản chất, nhưng có thể không phản ánh đúng hoàn toàn. Cần phân tích sâu để thấy bản chất thực sự.",
    difficulty: "medium",
    category: "ban-chat",
    tags: ["bản chất", "hiện tượng"],
  },
  {
    id: "pt-2",
    question:
      "Code của bạn chạy được nhưng chậm (Hiện tượng). Nguyên nhân là thuật toán O(n²) (Bản chất). Muốn fix triệt để, ta cần làm gì?",
    options: [
      "Thêm RAM cho máy",
      "Tìm và sửa bản chất - tối ưu thuật toán",
      "Che hiện tượng - không hiển thị loading",
      "Bỏ qua vì code vẫn chạy được",
    ],
    correctAnswer: 1,
    explanation:
      "Muốn giải quyết triệt để, phải đi từ HIỆN TƯỢNG (chậm) tìm ra BẢN CHẤT (thuật toán tệ) và sửa BẢN CHẤT!",
    difficulty: "medium",
    category: "ban-chat",
    tags: ["IT", "debugging"],
  },

  // Nguyên nhân - Kết quả
  {
    id: "pt-3",
    question:
      "Theo phạm trù Nguyên nhân - Kết quả, quan hệ giữa hai phạm trù này là gì?",
    options: [
      "Nguyên nhân luôn có trước kết quả về thời gian",
      "Kết quả có thể tác động trở lại nguyên nhân",
      "Một nguyên nhân chỉ sinh ra một kết quả",
      "Nguyên nhân và kết quả hoàn toàn độc lập",
    ],
    correctAnswer: 1,
    explanation:
      "Quan hệ nhân quả có tính biện chứng: kết quả có thể TÁC ĐỘNG TRỞ LẠI nguyên nhân. VD: Code tốt (NgN) → Ít bug (KQ) → Có thời gian refactor → Code tốt hơn.",
    difficulty: "hard",
    category: "nguyen-nhan",
    tags: ["nhân quả"],
  },

  // Nội dung - Hình thức
  {
    id: "pt-4",
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
    category: "noi-dung",
    tags: ["IT", "nội dung hình thức"],
  },

  // Tất nhiên - Ngẫu nhiên
  {
    id: "pt-5",
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
      "Người khôn ngoan tập trung vào cái TẤT NHIÊN (bảo trì, monitoring) và chuẩn bị cho cái NGẪU NHIÊN (failover, backup).",
    difficulty: "hard",
    category: "tat-nhien",
    tags: ["IT", "server"],
  },

  // Khả năng - Hiện thực
  {
    id: "pt-6",
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
    category: "kha-nang",
    tags: ["startup", "ví dụ đời sống"],
  },

  // Cái chung - Cái riêng
  {
    id: "pt-7",
    question:
      'Tất cả sinh viên đều là "Con người" (Cái chung), nhưng mỗi người có fingerprint, tính cách riêng (Cái riêng). Trong OOP, điều này tương ứng với gì?',
    options: [
      "Variable và Constant",
      "Frontend và Backend",
      "Class và Object (Instance)",
      "Function và Method",
    ],
    correctAnswer: 2,
    explanation:
      "CLASS là cái chung (Human có eat(), sleep()). OBJECT là cái riêng (sinh viên Minh, sinh viên Hoa - mỗi người có thuộc tính riêng).",
    difficulty: "hard",
    category: "cai-chung",
    tags: ["IT", "OOP"],
  },
  {
    id: "pt-8",
    question: "Quan hệ giữa cái chung và cái riêng như thế nào?",
    options: [
      "Cái chung tồn tại độc lập với cái riêng",
      "Cái riêng tồn tại độc lập với cái chung",
      "Cái chung chỉ tồn tại trong cái riêng, thông qua cái riêng",
      "Không có quan hệ gì",
    ],
    correctAnswer: 2,
    explanation:
      'Cái chung không tồn tại biệt lập mà CHỈ TỒN TẠI TRONG CÁI RIÊNG. VD: "Con người" (chung) chỉ tồn tại thông qua từng người cụ thể (riêng).',
    difficulty: "hard",
    category: "cai-chung",
    tags: ["lý thuyết"],
  },
];
