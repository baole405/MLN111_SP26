"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ItCornerBox } from "./it-corner-box"
import { LifeExampleCard } from "./life-example-card"

export function PrincipleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 px-6 bg-secondary/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-[0.2em] uppercase">Phần 2</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-6">Hai Nguyên Lý Cơ Bản</h2>
          <p className="font-serif text-xl text-muted-foreground italic max-w-2xl mx-auto">
            Nền tảng của phương pháp tư duy biện chứng
          </p>
        </motion.div>

        {/* Nguyên lý 1 */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm">
            <span className="text-accent font-sans text-sm tracking-[0.15em] uppercase">Nguyên lý 1</span>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-6">Mối Liên Hệ Phổ Biến</h3>

            <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
              <p className="font-serif text-lg text-muted-foreground italic">
                "Không một bông hoa nào có thể nở rộ nếu tách rời khỏi ánh mặt trời và lòng đất."
              </p>
            </blockquote>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <p>
                Mọi sự vật, hiện tượng đều có sự tác động, ràng buộc và chuyển hóa lẫn nhau. Không có sự vật nào tồn tại
                cô lập, tách rời hoàn toàn khỏi thế giới xung quanh.
              </p>
            </div>

            <h4 className="font-serif text-xl text-foreground mb-6">Ba Tính Chất</h4>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <LifeExampleCard
                title="Tính Khách Quan"
                description="Mối liên hệ vốn có, không phụ thuộc ý muốn con người."
                example="Con người buộc phải hít thở khí trời, ăn thực phẩm từ đất để sống. Dù bạn muốn hay không, sức khỏe của bạn liên kết chặt chẽ với môi trường."
                itNote="Phần mềm (Software) buộc phải chạy trên phần cứng (Hardware)."
              />
              <LifeExampleCard
                title="Tính Phổ Biến"
                description="Liên hệ có ở khắp mọi nơi: Tự nhiên, Xã hội, Tư duy."
                example="Giá xăng dầu thế giới tăng (Kinh tế) → Giá rau ngoài chợ tăng → Bữa cơm sinh viên đắt đỏ hơn (Đời sống)."
                itNote="Một thư viện mã nguồn mở bị lỗi (như Log4j) → Hàng triệu ứng dụng trên toàn cầu bị ảnh hưởng."
              />
              <LifeExampleCard
                title="Tính Đa Dạng"
                description="Có nhiều loại liên hệ: trực tiếp/gián tiếp, bên trong/bên ngoài."
                example="Mối liên hệ trong gia đình (trực tiếp) khác với mối liên hệ qua mạng xã hội (gián tiếp)."
                itNote="API call trực tiếp vs Message Queue bất đồng bộ."
              />
            </div>

            <ItCornerBox>
              Đây là tư duy <strong>Microservices</strong>: Mỗi service liên kết với service khác thông qua API. Khi một
              service sập, nó có thể kéo theo cả hệ thống nếu không được thiết kế đúng.
            </ItCornerBox>
          </div>
        </motion.div>

        {/* Nguyên lý 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm">
            <span className="text-accent font-sans text-sm tracking-[0.15em] uppercase">Nguyên lý 2</span>
            <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-3 mb-6">Sự Phát Triển</h3>

            <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
              <p className="font-serif text-lg text-muted-foreground italic">"Vạn vật luôn trong dòng chảy."</p>
            </blockquote>

            <div className="prose prose-lg text-muted-foreground mb-8">
              <p>
                Phát triển là khuynh hướng vận động đi lên của sự vật, từ thấp đến cao, từ đơn giản đến phức tạp. Đây
                không phải là đường thẳng, mà là đường xoáy ốc.
              </p>
            </div>

            <h4 className="font-serif text-xl text-foreground mb-6">Ba Tính Chất</h4>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <LifeExampleCard
                title="Tính Khách Quan"
                description="Phát triển là quy luật tự nhiên, không ai ngăn cản được."
                example="Đứa trẻ sẽ lớn thành người trưởng thành. Xã hội nông nghiệp sẽ tiến lên công nghiệp."
                itNote="Công nghệ luôn phát triển: Assembly → C → Java → Python → AI."
              />
              <LifeExampleCard
                title="Tính Phổ Biến"
                description="Phát triển xảy ra ở mọi lĩnh vực."
                example="Từ viết thư tay đến email, từ đi bộ đến máy bay."
                itNote="Từ Monolithic → SOA → Microservices → Serverless."
              />
              <LifeExampleCard
                title="Tính Đa Dạng"
                description="Mỗi sự vật có con đường phát triển riêng."
                example="Cây mít cần nhiều năm để ra trái, rau muống chỉ cần vài tuần."
                itNote="Startup 'move fast and break things', doanh nghiệp lớn cần quy trình chặt chẽ hơn."
              />
            </div>

            <ItCornerBox>
              Đây là triết lý <strong>Continuous Improvement</strong> trong Agile/DevOps. Phần mềm luôn cần được cải
              tiến qua từng sprint, không bao giờ "hoàn hảo" ở phiên bản đầu.
            </ItCornerBox>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
