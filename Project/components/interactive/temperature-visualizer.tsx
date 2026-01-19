"use client";

import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type WaterState = "ice" | "liquid" | "gas";

interface StateConfig {
  label: string;
  color: string;
  bgGradient: string;
  icon: string;
  description: string;
}

const STATE_CONFIG: Record<WaterState, StateConfig> = {
  ice: {
    label: "Rắn (Đá)",
    color: "text-blue-300",
    bgGradient: "from-blue-900/50 to-cyan-900/50",
    icon: "❄️",
    description: "Nước đóng băng - Phân tử dao động tại chỗ",
  },
  liquid: {
    label: "Lỏng (Nước)",
    color: "text-blue-500",
    bgGradient: "from-blue-700/50 to-blue-500/50",
    icon: "💧",
    description: "Nước lỏng - Phân tử chuyển động tự do",
  },
  gas: {
    label: "Khí (Hơi nước)",
    color: "text-red-400",
    bgGradient: "from-orange-600/50 to-red-500/50",
    icon: "♨️",
    description: "Hơi nước - Phân tử bay tự do",
  },
};

function getWaterState(temp: number): WaterState {
  if (temp <= 0) return "ice";
  if (temp < 100) return "liquid";
  return "gas";
}

// Particles animation cho mỗi trạng thái
function WaterParticles({ state }: { state: WaterState }) {
  const particleCount = state === "gas" ? 12 : state === "liquid" ? 8 : 5;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => {
        const baseAnimation = {
          ice: {
            x: [0, 2, -2, 0],
            y: [0, 1, -1, 0],
            transition: { duration: 2, repeat: Infinity, delay: i * 0.2 },
          },
          liquid: {
            x: [0, 20, -10, 0],
            y: [0, -30, 10, 0],
            transition: { duration: 3, repeat: Infinity, delay: i * 0.3 },
          },
          gas: {
            y: [100, -100],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
            transition: {
              duration: 2 + Math.random(),
              repeat: Infinity,
              delay: i * 0.2,
            },
          },
        };

        return (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              state === "ice"
                ? "bg-blue-200"
                : state === "liquid"
                  ? "bg-blue-400"
                  : "bg-orange-300"
            }`}
            style={{
              left: `${10 + (i * 80) / particleCount}%`,
              top: state === "gas" ? "100%" : `${30 + Math.random() * 40}%`,
            }}
            animate={baseAnimation[state]}
          />
        );
      })}
    </div>
  );
}

export function TemperatureVisualizer() {
  const [temperature, setTemperature] = useState(25);
  const [prevState, setPrevState] = useState<WaterState>("liquid");
  const [showTransition, setShowTransition] = useState(false);

  const currentState = getWaterState(temperature);
  const config = STATE_CONFIG[currentState];

  // Detect state change for transition effect
  useEffect(() => {
    if (currentState !== prevState) {
      setShowTransition(true);
      const timer = setTimeout(() => {
        setShowTransition(false);
        setPrevState(currentState);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentState, prevState]);

  const isAtThreshold = temperature === 0 || temperature === 100;

  return (
    <div className="relative">
      {/* Main container */}
      <motion.div
        className={`relative rounded-2xl p-8 bg-gradient-to-br ${config.bgGradient} border border-white/10 overflow-hidden`}
        animate={{ scale: showTransition ? [1, 1.02, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Transition flash effect */}
        <AnimatePresence>
          {showTransition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-10"
            />
          )}
        </AnimatePresence>

        {/* Particles */}
        <WaterParticles state={currentState} />

        {/* Content */}
        <div className="relative z-20">
          {/* Temperature display */}
          <div className="text-center mb-8">
            <motion.div
              key={temperature}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-block"
            >
              <span className="text-7xl font-bold text-white font-mono">
                {temperature}
              </span>
              <span className="text-3xl text-white/80">°C</span>
            </motion.div>
          </div>

          {/* State indicator */}
          <div className="text-center mb-8">
            <motion.div
              key={currentState}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-3"
            >
              {config.icon}
            </motion.div>
            <motion.h3
              key={config.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-2xl font-bold ${config.color}`}
            >
              {config.label}
            </motion.h3>
            <p className="text-white/70 mt-2">{config.description}</p>
          </div>

          {/* Slider */}
          <div className="px-4">
            <Slider
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
              min={-20}
              max={120}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-white/60 mt-2">
              <span>-20°C</span>
              <span className="text-blue-300">0°C (Đông đặc)</span>
              <span className="text-orange-300">100°C (Sôi)</span>
              <span>120°C</span>
            </div>
          </div>

          {/* Threshold indicator */}
          <AnimatePresence>
            {isAtThreshold && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-center"
              >
                <span className="text-yellow-300 font-bold">⚡ ĐIỂM NÚT!</span>
                <p className="text-white/80 text-sm mt-1">
                  Đây là ngưỡng chuyển đổi về CHẤT. Một bước nhỏ sẽ tạo ra sự
                  thay đổi lớn!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Philosophy explanation */}
      <div className="mt-6 p-4 bg-card rounded-xl border border-border">
        <h4 className="font-semibold text-foreground mb-2">
          📚 Quy Luật Lượng - Chất
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Khi nhiệt độ thay đổi từ từ (<strong>tích lũy lượng</strong>), nước
          vẫn giữ nguyên trạng thái. Nhưng tại <strong>điểm nút</strong> (0°C
          hoặc 100°C), chỉ cần 1 độ thay đổi sẽ tạo ra
          <strong> bước nhảy vọt về chất</strong> - nước chuyển từ rắn → lỏng →
          khí.
        </p>
      </div>
    </div>
  );
}
