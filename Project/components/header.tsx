"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50"
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="#" className="font-serif text-xl font-semibold text-foreground">
          MÃ NGUỒN CỦA THỰC TẠI
        </Link>
        <div className="flex items-center gap-8">
          <a href="#overview" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            Tổng Quan
          </a>
          <a href="#laws" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ba Quy Luật
          </a>
          <a href="#categories" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sáu Phạm Trù
          </a>
          <a href="#arena" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            Arena
          </a>
          <a href="#mind-map" className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            Mind Map
          </a>
          <Link href="/chat" className="font-sans font-bold text-sm text-[#2d4a3e] hover:text-foreground transition-colors"
          >
            Đối Thoại về Triết Học
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
