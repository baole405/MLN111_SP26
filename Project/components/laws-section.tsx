"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { LawZigzag } from "./law-zigzag"

export function LawsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const laws = [
    {
      number: "01",
      title: "Quy Luật Mâu Thuẫn",
      subtitle: "Thống Nhất và Đấu Tranh của các Mặt Đối Lập",
      quote:
        "Không có bóng tối, làm sao ta biết trân trọng ánh sáng? Không có thất bại, làm sao ta hiểu được hương vị thành công?",
      definition:
        "Mọi sự vật đều chứa đựng các mặt đối lập vừa thống nhất vừa đấu tranh với nhau. Chính sự đấu tranh này là nguồn gốc, động lực bên trong của sự phát triển.",
      lifeExample:
        "Trong bạn luôn có sự đấu tranh giữa 'ham muốn ăn ngon' và 'mong muốn khỏe mạnh'. Bạn muốn xem phim nhưng cũng muốn học bài. Chính việc giải quyết những mâu thuẫn này giúp bạn trưởng thành hơn mỗi ngày.",
      itNote:
        "Trade-off kinh điển trong kiến trúc phần mềm: Muốn hệ thống nhanh (Performance) thì phải chấp nhận tốn bộ nhớ (Memory). Muốn linh hoạt (Flexibility) thì code sẽ phức tạp hơn (Complexity). Đây là bản chất của System Design.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1690100690851-3ce8a5f64022?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Fire Ice Abstract",
        },
      ],
    },
    {
      number: "02",
      title: "Quy Luật Lượng - Chất",
      subtitle: "Chuyển Hóa từ Những Thay Đổi Về Lượng Thành Chất",
      quote: "Giọt nước cuối cùng làm tràn ly.",
      definition:
        "Sự tích lũy về lượng đến một ngưỡng nhất định (điểm nút) sẽ tạo ra bước nhảy vọt về chất. Sự vật chuyển sang trạng thái mới, chất lượng mới.",
      lifeExample:
        "Bạn học tiếng Anh mỗi ngày 30 phút (tích lũy lượng). Ngày qua ngày có vẻ không khác biệt. Nhưng sau 1 năm, đột nhiên bạn nhận ra mình có thể xem phim không cần phụ đề (nhảy vọt về chất).",
      itNote:
        "Đây là nguyên lý đằng sau Machine Learning. Bạn cho model xem hàng triệu bức ảnh (tích lũy lượng). Đến một lúc, model 'chợt hiểu' và có thể nhận diện mèo với độ chính xác cao (nhảy vọt về chất).",
      images: [
        {
          src: "https://images.unsplash.com/photo-1646775896376-62f6fb9b894e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Last drop of water",
        },
      ],
    },
    {
      number: "03",
      title: "Quy Luật Phủ Định của Phủ Định",
      subtitle: "Con Đường Xoáy Ốc Của Sự Phát Triển",
      quote: "Lịch sử không lặp lại, nhưng nó gieo vần.",
      definition:
        "Sự phát triển đi theo đường xoáy ốc. Cái mới ra đời phủ định cái cũ, nhưng không xóa sạch mà kế thừa những yếu tố tích cực. Đến lượt nó lại bị phủ định bởi cái mới hơn.",
      lifeExample:
        "Hạt lúa (Khẳng định) → Cây lúa mọc lên, hạt lúa 'chết' đi (Phủ định 1) → Cây lúa cho ra nhiều hạt lúa mới (Phủ định 2). Vòng xoáy tiếp diễn, mỗi vòng là một sự phát triển.",
      itNote:
        "Đây là vòng đời của framework: jQuery (Khẳng định) → React ra đời, 'phủ định' jQuery (Phủ định 1). Nhưng React vẫn kế thừa tư tưởng component. Rồi sẽ có framework mới 'phủ định' React nhưng vẫn giữ lại những tinh hoa.",
      images: [
        {
          src: "https://images.unsplash.com/photo-1692969952656-8f51d3132e23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "",
        },
      ],
    },
  ]

  return (
    <section id="laws" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase font-medium">Phần Cốt Lõi</span>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mt-4 mb-6">Ba Quy Luật Cơ Bản</h2>
          <p className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Quy luật vận động và phát triển của thế giới tự nhiên, xã hội và tư duy
          </p>
        </div>

        <div className="space-y-32">
          {laws.map((law, index) => (
            <LawZigzag key={law.number} {...law} isReversed={index === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
