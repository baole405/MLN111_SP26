"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ItCornerBox } from "./it-corner-box"

export function OverviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="overview" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-accent font-sans text-sm tracking-[0.2em] uppercase">Phần 1</span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-8">
            Tổng Quan — Khởi Nguồn của Tư Duy
          </h2>
        </motion.div>

        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Khái niệm cốt lõi */}
          <div className="border-l-2 border-accent pl-8">
            <h3 className="font-serif text-2xl text-foreground mb-4">1. Khái Niệm Cốt Lõi</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Định nghĩa:</strong> Phép biện chứng duy vật là khoa học về những
                mối liên hệ phổ biến và sự phát triển. Nó không chỉ nhìn sự vật ở trạng thái tĩnh, mà nhìn nó trong sự
                vận động, ràng buộc và chuyển hóa không ngừng.
              </p>
              <p>
                <strong className="text-foreground">Bản chất:</strong> Là sự kết hợp giữa việc nhìn thế giới như một
                thực thể vật chất khách quan và phương pháp tư duy mềm dẻo, linh hoạt.
              </p>
            </div>
          </div>

          {/* Vai trò */}
          <div className="border-l-2 border-accent pl-8">
            <h3 className="font-serif text-2xl text-foreground mb-4">2. Vai Trò Trong Cuộc Sống</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Thế giới quan (Cách nhìn):</strong> Giúp ta hiểu rằng không có gì là
                cô lập và không có gì là vĩnh cửu. Nỗi buồn hôm nay không kéo dài mãi mãi, thành công hôm qua không đảm
                bảo cho ngày mai.
              </p>
              <p>
                <strong className="text-foreground">Phương pháp luận (Cách làm):</strong> Cung cấp công cụ để giải quyết
                vấn đề: Phải nhìn toàn diện, phải bình tĩnh tích lũy, và phải chấp nhận mâu thuẫn là động lực để trưởng
                thành.
              </p>
            </div>
          </div>

          <ItCornerBox>
            Trong IT, đây là tư duy <strong>System Design</strong>. Không module nào chạy độc lập, và một phần mềm hoàn
            hảo hôm nay sẽ trở nên lỗi thời (legacy) vào ngày mai.
          </ItCornerBox>
        </motion.div>
      </div>
    </section>
  )
}
