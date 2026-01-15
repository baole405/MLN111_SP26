"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Abstract flowing line art background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M0 400C200 300 400 500 600 400C800 300 1000 500 1200 400"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M0 450C200 350 400 550 600 450C800 350 1000 550 1200 450"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M0 350C200 250 400 450 600 350C800 250 1000 450 1200 350"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.circle
            cx="300"
            cy="200"
            r="80"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <motion.circle
            cx="900"
            cy="600"
            r="120"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent"
            fill="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block text-accent font-sans text-sm tracking-[0.3em] uppercase mb-6">
            Triết học Mác-Lênin
          </span>
        </motion.div>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground mb-6 text-balance"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Phép Biện Chứng
          <br />
          <span className="text-accent">Duy Vật</span>
        </motion.h1>

        <motion.p
          className="font-serif text-xl md:text-2xl text-muted-foreground italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Kim chỉ nam cho tư duy và hành động
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#overview"
            className="inline-flex items-center gap-2 text-accent font-sans text-sm tracking-wide hover:gap-4 transition-all duration-300"
          >
            Khám phá
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
