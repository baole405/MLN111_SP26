"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ItCornerBox } from "./it-corner-box"

interface LawZigzagProps {
  number: string
  title: string
  subtitle: string
  quote: string
  definition: string
  lifeExample: string
  itNote: string
  images: { src: string; alt: string }[]
  isReversed?: boolean
}

export function LawZigzag({
  number,
  title,
  subtitle,
  quote,
  definition,
  lifeExample,
  itNote,
  images,
  isReversed = false,
}: LawZigzagProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      {/* Visual Side */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border overflow-hidden flex items-center justify-center"
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        ))}
      </motion.div>

      {/* Text Side */}
      <div className="space-y-6">
        <div>
          <span className="font-serif text-6xl text-accent/20">{number}</span>
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-2">{title}</h3>
          <p className="text-muted-foreground font-sans text-sm mt-2">{subtitle}</p>
        </div>

        <blockquote className="border-l-4 border-accent pl-6 py-2">
          <p className="font-serif text-lg text-muted-foreground italic">"{quote}"</p>
        </blockquote>

        <div>
          <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-3">Định nghĩa</h4>
          <p className="text-muted-foreground leading-relaxed">{definition}</p>
        </div>

        <div className="bg-secondary/50 rounded-xl p-6">
          <h4 className="font-sans text-sm font-medium text-accent uppercase tracking-wide mb-3">Ví dụ đời sống</h4>
          <p className="text-foreground leading-relaxed text-sm">{lifeExample}</p>
        </div>

        <ItCornerBox>{itNote}</ItCornerBox>
      </div>
    </motion.div>
  )
}
