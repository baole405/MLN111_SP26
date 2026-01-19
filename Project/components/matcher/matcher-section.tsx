"use client";

import { motion } from "framer-motion";
import { DragDropGame } from "./drag-drop-game";

export function MatcherSection() {
  return (
    <section id="matcher" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-medium">
            Drag & Drop
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-4">
            🎯 Nối Đúng Quy Luật
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Rèn luyện tư duy triết học bằng cách kéo thả tình huống vào đúng quy
            luật!
          </p>
        </motion.div>

        {/* Game */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DragDropGame />
        </motion.div>
      </div>
    </section>
  );
}
