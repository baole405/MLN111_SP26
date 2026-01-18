"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface FlipCardProps {
  number: string
  title: string
  icon: string
  lifeExample: string
  itNote: string
  index?: number
}

export function FlipCard({ number, title, icon, lifeExample, itNote, index = 0 }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective h-[380px] md:h-[400px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <motion.div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full bg-card rounded-2xl border border-border shadow-lg p-8 flex flex-col items-center justify-center text-center"
        >
          <div className="text-6xl mb-4">{icon}</div>
          <div className="text-accent/60 font-sans text-sm font-medium tracking-wide uppercase mb-3">{number}</div>
          <h3 className="font-serif text-2xl text-foreground">{title}</h3>
          <p className="text-muted-foreground text-sm mt-4">Di chuột hoặc chạm để xem</p>
        </motion.div>

        {/* Back */}
        <motion.div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute w-full h-full bg-primary rounded-2xl border border-border shadow-lg p-8 flex flex-col justify-center text-primary-foreground overflow-y-auto"
        >
          <div className="mb-4">
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase opacity-80 mb-2">Ví dụ đời sống</h4>
            <p className="font-sans text-sm leading-relaxed">{lifeExample}</p>
          </div>
          <div className="border-t border-primary-foreground/20 pt-4">
            <h4 className="font-sans text-xs font-medium tracking-widest uppercase opacity-80 mb-2">Góc lập trình</h4>
            <p className="font-sans text-sm leading-relaxed">{itNote}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
