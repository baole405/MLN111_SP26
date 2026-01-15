"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ItCornerBox } from "./it-corner-box"

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
    },
  ]

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-[0.2em] uppercase">Phần 3</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-6">Ba Quy Luật Cơ Bản</h2>
          <p className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Quy luật vận động và phát triển của thế giới
          </p>
        </motion.div>

        <div className="space-y-16">
          {laws.map((law, index) => (
            <motion.div
              key={law.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
            >
              <div className="grid lg:grid-cols-[1fr,2fr] gap-8 items-start">
                <div className="lg:sticky lg:top-8">
                  <span className="font-serif text-6xl text-accent/30">{law.number}</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2">{law.title}</h3>
                  <p className="text-muted-foreground mt-2 font-sans text-sm">{law.subtitle}</p>
                </div>

                <div className="space-y-6">
                  <blockquote className="border-l-4 border-accent pl-6 py-2">
                    <p className="font-serif text-lg text-muted-foreground italic">"{law.quote}"</p>
                  </blockquote>

                  <div>
                    <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-3">
                      Định nghĩa
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{law.definition}</p>
                  </div>

                  <div className="bg-secondary/50 rounded-xl p-6">
                    <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-3">
                      Ví dụ đời sống
                    </h4>
                    <p className="text-foreground leading-relaxed">{law.lifeExample}</p>
                  </div>

                  <ItCornerBox>{law.itNote}</ItCornerBox>
                </div>
              </div>

              {index < laws.length - 1 && <div className="border-b border-border mt-16" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
