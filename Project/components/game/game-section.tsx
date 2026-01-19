"use client";

import { motion } from "framer-motion";
import { QuizGame } from "./quiz-game";

export function GameSection() {
  return (
    <section id="game" className="relative py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-medium text-sm">GAME SHOW</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Đấu Trường Triết Học
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Kiểm tra kiến thức qua các câu hỏi thú vị. Trả lời đúng để ghi điểm
            và nhận phần thưởng! 🎉
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <QuizGame />
        </motion.div>
      </div>
    </section>
  );
}
