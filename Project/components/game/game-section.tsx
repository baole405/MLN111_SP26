"use client"

import { motion } from "framer-motion"
import { QuizGame } from "./quiz-game"

export function GameSection() {
  return (
    <section id="game" className="py-24 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-medium">
            Game Show
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-4">
            🎮 Đấu Trường Triết Học
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kiểm tra kiến thức của bạn qua các câu hỏi tình huống thực tế. 
            Trả lời đúng để ghi điểm và nhận <span className="text-primary">pháo hoa</span>! 🎉
          </p>
        </motion.div>

        {/* Quiz Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <QuizGame />
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm italic">
            💡 Mẹo: Đọc kỹ câu hỏi và liên hệ với các quy luật/phạm trù đã học!
          </p>
        </motion.div>
      </div>
    </section>
  )
}
