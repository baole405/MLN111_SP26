"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated flowing particles background representing flux/change */}
      <motion.div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1400 900" xmlns="http://www.w3.org/2000/svg" fill="none">
          {/* Flowing waves representing constant change */}
          <motion.path
            d="M0 450 Q350 350 700 450 T1400 450"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 500 Q350 400 700 500 T1400 500"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Particles moving organically */}
          {[...Array(5)].map((_, i) => (
            <motion.circle
              key={i}
              cx={200 + i * 250}
              cy={300}
              r="3"
              fill="currentColor"
              className="text-primary"
              animate={{
                y: [0, 100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Abstract geometric elements */}
          <motion.circle
            cx="200"
            cy="200"
            r="100"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <motion.circle
            cx="1200"
            cy="700"
            r="150"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-primary/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="inline-block text-primary font-sans text-xs tracking-[0.4em] uppercase font-medium">
            Triết học Mác-Lênin
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-medium text-foreground mb-6 text-balance leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          Phép Biện Chứng
          <br />
          <motion.span
            className="text-primary inline-block"
            animate={{ color: ["#2d4a3e", "#1a4d2e", "#2d4a3e"] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          >
            Duy Vật
          </motion.span>
        </motion.h1>

        <motion.p
          className="font-serif text-xl md:text-2xl text-muted-foreground italic mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Kim chỉ nam cho tư duy và hành động
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.a
            href="#laws"
            whileHover={{ scale: 1.05, x: 4 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm font-medium tracking-wide rounded-full hover:shadow-lg transition-shadow"
          >
            Khám Phá Ngay
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
