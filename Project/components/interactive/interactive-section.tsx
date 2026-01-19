"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ServerLoadVisualizer } from "./server-load-visualizer";
import { TemperatureVisualizer } from "./temperature-visualizer";

type Tab = "temperature" | "server";

export function InteractiveSection() {
  const [activeTab, setActiveTab] = useState<Tab>("temperature");

  return (
    <section id="interactive" className="py-24 px-6 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-sans text-sm tracking-[0.2em] uppercase font-medium">
            Khu Vực Tương Tác
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-4 mb-4">
            Trải Nghiệm Quy Luật
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Đừng chỉ đọc lý thuyết - hãy <strong>tương tác</strong> và{" "}
            <strong>cảm nhận</strong> quy luật biện chứng thông qua mô phỏng
            trực quan.
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-10"
        >
          <button
            onClick={() => setActiveTab("temperature")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "temperature"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
            }`}
          >
            🌡️ Nhiệt Độ & Trạng Thái Nước
          </button>
          <button
            onClick={() => setActiveTab("server")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === "server"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-card/80 border border-border"
            }`}
          >
            💻 Server Load Simulator
          </button>
        </motion.div>

        {/* Tab content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {activeTab === "temperature" ? (
              <motion.div
                key="temperature"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TemperatureVisualizer />
              </motion.div>
            ) : (
              <motion.div
                key="server"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ServerLoadVisualizer />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm italic">
            💡 Kéo thanh trượt để thấy sự chuyển đổi về CHẤT xảy ra tại các ĐIỂM
            NÚT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
