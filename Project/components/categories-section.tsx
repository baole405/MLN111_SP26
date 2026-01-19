"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { FlipCard } from "./flip-card"

export function CategoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const categories = [
    {
      number: "01",
      title: "Cái Chung & Cái Riêng",
      icon: "🎯",
      lifeExample:
        "Tất cả chúng ta đều là 'Con người' (Cái chung), nhưng mỗi người có vân tay, tính cách, số phận riêng (Cái riêng). Hiểu cái chung giúp ta học từ người khác, nhưng tôn trọng cái riêng giúp ta không so sánh mù quáng.",
      itNote:
        "Đây là nguyên lý của OOP. Class là 'cái chung' (ví dụ: Animal có thuộc tính eat(), sleep()). Object là 'cái riêng' (ví dụ: con mèo 'Tom' cụ thể).",
    },
    {
      number: "02",
      title: "Nguyên Nhân & Kết Quả",
      icon: "⛓️",
      lifeExample:
        "Bạn lười học (Nguyên nhân) → Điểm kém (Kết quả). Điểm kém khiến bạn mất tự tin (Kết quả trở thành nguyên nhân mới) → Bạn càng lười học hơn. Vòng xoáy tiêu cực.",
      itNote:
        "Đây là tư tưởng đằng sau việc tìm Root Cause khi debug. Một bug hiển thị ở UI (kết quả) có thể do lỗi logic ở Backend (nguyên nhân), mà lỗi đó lại do dữ liệu từ Database bị sai (nguyên nhân sâu hơn).",
    },
    {
      number: "03",
      title: "Tất Nhiên & Ngẫu Nhiên",
      icon: "🎲",
      lifeExample:
        "Nếu bạn không tưới cây suốt một tháng, cây chết là TẤT NHIÊN. Nhưng cây bị sâu ăn hay không là NGẪU NHIÊN. Người khôn ngoan tập trung vào những điều tất nhiên mà mình có thể kiểm soát.",
      itNote:
        "Nếu server không được bảo trì, nó sập là TẤT NHIÊN. Nhưng sập vào lúc nào là NGẪU NHIÊN. Do đó, ta xây dựng hệ thống Failover và Backup để đối phó với cái ngẫu nhiên.",
    },
    {
      number: "04",
      title: "Nội Dung & Hình Thức",
      icon: "🎨",
      lifeExample:
        "Một cuốn sách hay (Nội dung tốt) mà bìa xấu, trình bày rối (Hình thức kém) sẽ khó bán. Ngược lại, bìa đẹp có thể thu hút người đọc, giúp nội dung hay được tiếp cận nhiều hơn.",
      itNote:
        "Một thuật toán xuất sắc (Nội dung) bên trong một app có UI/UX tệ (Hình thức) sẽ không ai dùng. Đây là lý do ta cần cả Backend Engineer và Frontend/UX Designer.",
    },
    {
      number: "05",
      title: "Bản Chất & Hiện Tượng",
      icon: "🔍",
      lifeExample:
        "Một người luôn cười (Hiện tượng) chưa chắc đã hạnh phúc (Bản chất). Đừng đánh giá người khác chỉ qua vẻ bề ngoài. Hãy dành thời gian để hiểu bản chất thật sự của họ.",
      itNote:
        "Một ứng dụng có giao diện mượt mà (Hiện tượng) có thể đang có code spaghetti, nợ kỹ thuật chồng chất bên trong (Bản chất). Đây là lý do cần Code Review và Technical Audit.",
    },
    {
      number: "06",
      title: "Khả Năng & Hiện Thực",
      icon: "🚀",
      lifeExample:
        "Mọi sinh viên đều có KHẢ NĂNG trở thành CEO. Nhưng để biến nó thành HIỆN THỰC, cần có nỗ lực, cơ hội, và cả một chút may mắn. Khả năng là hạt giống, hiện thực là trái ngọt sau nhiều năm chăm bón.",
      itNote:
        "Một ý tưởng startup chỉ là KHẢ NĂNG. MVP (Minimum Viable Product) là bước đầu biến nó thành HIỆN THỰC. Và sản phẩm có hàng triệu người dùng mới là hiện thực đầy đủ.",
    },
  ]

  return (
    <section id="categories" className="py-32 px-6 bg-primary/5" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-sans text-xs tracking-[0.4em] uppercase font-medium">Công Cụ Tư Duy</span>
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mt-4 mb-6">Sáu Cặp Phạm Trù</h2>
          <p className="font-serif text-xl text-muted-foreground italic max-w-3xl mx-auto">
            Những công cụ tư duy giúp phân tích sự vật hiện tượng. Bấm vào mỗi thẻ để khám phá ví dụ đời sống và góc nhìn lập trình viên.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <FlipCard key={category.number} {...category} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
