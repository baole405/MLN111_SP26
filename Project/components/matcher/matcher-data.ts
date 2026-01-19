export interface MatchItem {
  id: string;
  text: string;
  lawId: string; // ID của quy luật đúng
}

export interface LawTarget {
  id: string;
  name: string;
  shortName: string;
  color: string;
}

export const laws: LawTarget[] = [
  {
    id: "luong-chat",
    name: "Quy Luật Lượng - Chất",
    shortName: "Lượng → Chất",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "mau-thuan",
    name: "Quy Luật Mâu Thuẫn",
    shortName: "Mâu Thuẫn",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "phu-dinh",
    name: "Quy Luật Phủ Định của Phủ Định",
    shortName: "Phủ Định²",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "lien-he",
    name: "Nguyên Lý Mối Liên Hệ Phổ Biến",
    shortName: "Liên Hệ",
    color: "from-green-500 to-emerald-500",
  },
];

export const matchItems: MatchItem[] = [
  // Lượng - Chất
  {
    id: "1",
    text: "Học 30 phút mỗi ngày, 1 năm sau đột nhiên giỏi tiếng Anh",
    lawId: "luong-chat",
  },
  {
    id: "2",
    text: "Tăng users từ từ, đến 1000 user thì server sập",
    lawId: "luong-chat",
  },
  {
    id: "3",
    text: "Nước 99°C vẫn lỏng, 100°C bốc hơi ngay",
    lawId: "luong-chat",
  },

  // Mâu thuẫn
  {
    id: "4",
    text: "Muốn code nhanh nhưng cũng muốn code sạch",
    lawId: "mau-thuan",
  },
  {
    id: "5",
    text: "Vừa muốn ăn ngon vừa muốn giảm cân",
    lawId: "mau-thuan",
  },
  {
    id: "6",
    text: "Trade-off: Performance vs Memory trong System Design",
    lawId: "mau-thuan",
  },

  // Phủ định của phủ định
  {
    id: "7",
    text: "jQuery → React → Next.js (kế thừa & phát triển)",
    lawId: "phu-dinh",
  },
  {
    id: "8",
    text: "Monolithic → Microservices → Serverless",
    lawId: "phu-dinh",
  },
  {
    id: "9",
    text: "Làng → Thị trấn → Thành phố (đô thị hóa)",
    lawId: "phu-dinh",
  },

  // Mối liên hệ phổ biến
  {
    id: "10",
    text: "Giá xăng tăng → Giá rau tăng → Bữa cơm đắt",
    lawId: "lien-he",
  },
  {
    id: "11",
    text: "Bug ở frontend nhưng root cause ở backend API",
    lawId: "lien-he",
  },
  {
    id: "12",
    text: "Thay đổi database schema → Phải update tất cả services",
    lawId: "lien-he",
  },
];

// Shuffle function
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
