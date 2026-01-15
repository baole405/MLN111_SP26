"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ItCornerBox } from "./it-corner-box"

export function CategoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = [
    {
      id: "cai-chung-cai-rieng",
      title: "Cái Chung & Cái Riêng",
      definition: "Cái chung là những thuộc tính, mối liên hệ có ở nhiều sự vật. Cái riêng là sự vật cụ thể, đơn nhất.",
      lifeExample:
        "Tất cả chúng ta đều là 'Con người' (Cái chung), nhưng mỗi người có vân tay, tính cách, số phận riêng (Cái riêng). Hiểu cái chung giúp ta học từ người khác, nhưng tôn trọng cái riêng giúp ta không so sánh mù quáng.",
      itNote:
        "Đây là nguyên lý của OOP. Class là 'cái chung' (ví dụ: Animal có thuộc tính eat(), sleep()). Object là 'cái riêng' (ví dụ: con mèo 'Tom' cụ thể).",
    },
    {
      id: "nguyen-nhan-ket-qua",
      title: "Nguyên Nhân & Kết Quả",
      definition: "Nguyên nhân sinh ra kết quả. Nhưng kết quả có thể quay lại tác động nguyên nhân.",
      lifeExample:
        "Bạn lười học (Nguyên nhân) → Điểm kém (Kết quả). Điểm kém khiến bạn mất tự tin (Kết quả trở thành nguyên nhân mới) → Bạn càng lười học hơn. Vòng xoáy tiêu cực.",
      itNote:
        "Đây là tư tưởng đằng sau việc tìm Root Cause khi debug. Một bug hiển thị ở UI (kết quả) có thể do lỗi logic ở Backend (nguyên nhân), mà lỗi đó lại do dữ liệu từ Database bị sai (nguyên nhân sâu hơn).",
    },
    {
      id: "tat-nhien-ngau-nhien",
      title: "Tất Nhiên & Ngẫu Nhiên",
      definition:
        "Tất nhiên là cái chắc chắn xảy ra do bản chất bên trong. Ngẫu nhiên là cái có thể xảy ra hoặc không.",
      lifeExample:
        "Nếu bạn không tưới cây suốt một tháng, cây chết là TẤT NHIÊN. Nhưng cây bị sâu ăn hay không là NGẪU NHIÊN. Người khôn ngoan tập trung vào những điều tất nhiên mà mình có thể kiểm soát.",
      itNote:
        "Nếu server không được bảo trì, nó sập là TẤT NHIÊN. Nhưng sập vào lúc nào là NGẪU NHIÊN. Do đó, ta xây dựng hệ thống Failover và Backup để đối phó với cái ngẫu nhiên.",
    },
    {
      id: "noi-dung-hinh-thuc",
      title: "Nội Dung & Hình Thức",
      definition: "Nội dung quyết định hình thức, nhưng hình thức cũng tác động ngược lại nội dung.",
      lifeExample:
        "Một cuốn sách hay (Nội dung tốt) mà bìa xấu, trình bày rối (Hình thức kém) sẽ khó bán. Ngược lại, bìa đẹp có thể thu hút người đọc, giúp nội dung hay được tiếp cận nhiều hơn.",
      itNote:
        "Một thuật toán xuất sắc (Nội dung) bên trong một app có UI/UX tệ (Hình thức) sẽ không ai dùng. Đây là lý do ta cần cả Backend Engineer và Frontend/UX Designer.",
    },
    {
      id: "ban-chat-hien-tuong",
      title: "Bản Chất & Hiện Tượng",
      definition: "Hiện tượng là biểu hiện bên ngoài. Bản chất là cái gốc rễ, cốt lõi bên trong.",
      lifeExample:
        "Một người luôn cười (Hiện tượng) chưa chắc đã hạnh phúc (Bản chất). Đừng đánh giá người khác chỉ qua vẻ bề ngoài. Hãy dành thời gian để hiểu bản chất thật sự của họ.",
      itNote:
        "Một ứng dụng có giao diện mượt mà (Hiện tượng) có thể đang có code spaghetti, nợ kỹ thuật chồng chất bên trong (Bản chất). Đây là lý do cần Code Review và Technical Audit.",
    },
    {
      id: "kha-nang-hien-thuc",
      title: "Khả Năng & Hiện Thực",
      definition: "Khả năng là cái chưa có nhưng có thể có. Hiện thực là cái đã tồn tại.",
      lifeExample:
        "Mọi sinh viên đều có KHẢ NĂNG trở thành CEO. Nhưng để biến nó thành HIỆN THỰC, cần có nỗ lực, cơ hội, và cả một chút may mắn. Khả năng là hạt giống, hiện thực là trái ngọt sau nhiều năm chăm bón.",
      itNote:
        "Một ý tưởng startup chỉ là KHẢ NĂNG. MVP (Minimum Viable Product) là bước đầu biến nó thành HIỆN THỰC. Và sản phẩm có hàng triệu người dùng mới là hiện thực đầy đủ.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-secondary/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-[0.2em] uppercase">Phần 4</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-6">Sáu Cặp Phạm Trù</h2>
          <p className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Những công cụ tư duy giúp phân tích sự vật hiện tượng
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {categories.map((category, index) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="bg-card rounded-xl border-none shadow-sm overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4 text-left">
                    <span className="font-serif text-2xl text-accent/50">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-xl text-foreground">{category.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6 pt-2">
                    <div>
                      <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-2">
                        Định nghĩa
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">{category.definition}</p>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-5">
                      <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-2">
                        Ví dụ đời sống
                      </h4>
                      <p className="text-foreground leading-relaxed">{category.lifeExample}</p>
                    </div>

                    <ItCornerBox>{category.itNote}</ItCornerBox>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
