"use client";

import { Slider } from "@/components/ui/slider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type ServerStatus = "healthy" | "degraded" | "critical" | "crashed";

interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
  responseTime: string;
}

const STATUS_CONFIG: Record<ServerStatus, StatusConfig> = {
  healthy: {
    label: "🟢 Healthy",
    color: "text-green-400",
    bgColor: "from-green-900/50 to-emerald-900/50",
    icon: "✓",
    description: "Server hoạt động bình thường",
    responseTime: "< 50ms",
  },
  degraded: {
    label: "🟡 Degraded",
    color: "text-yellow-400",
    bgColor: "from-yellow-900/50 to-amber-900/50",
    icon: "⚠",
    description: "Server đang chịu tải cao, phản hồi chậm",
    responseTime: "200-500ms",
  },
  critical: {
    label: "🔴 Critical",
    color: "text-red-400",
    bgColor: "from-red-900/50 to-orange-900/50",
    icon: "⚠",
    description: "Server sắp quá tải! Cần scale ngay!",
    responseTime: "> 1000ms",
  },
  crashed: {
    label: "💀 CRASHED",
    color: "text-red-500",
    bgColor: "from-red-950/80 to-black/80",
    icon: "✗",
    description: "Server đã sập! 503 Service Unavailable",
    responseTime: "∞ (Timeout)",
  },
};

function getServerStatus(users: number): ServerStatus {
  if (users <= 500) return "healthy";
  if (users <= 800) return "degraded";
  if (users <= 999) return "critical";
  return "crashed";
}

function calculateResponseTime(users: number): number {
  if (users > 999) return 9999;
  if (users <= 500) return 20 + Math.random() * 30;
  if (users <= 800) return 200 + (users - 500) * 0.5;
  return 1000 + (users - 800) * 5;
}

// Server rack animation
function ServerRack({ status }: { status: ServerStatus }) {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-16 h-24 rounded-lg border-2 ${
            status === "crashed"
              ? "border-red-600 bg-red-950"
              : status === "critical"
                ? "border-red-500 bg-red-900/50"
                : status === "degraded"
                  ? "border-yellow-500 bg-yellow-900/50"
                  : "border-green-500 bg-green-900/50"
          } flex flex-col gap-1 p-2`}
          animate={
            status === "crashed"
              ? { opacity: [1, 0.3, 1], x: [0, -2, 2, 0] }
              : status === "critical"
                ? { opacity: [1, 0.7, 1] }
                : {}
          }
          transition={{
            duration: status === "crashed" ? 0.5 : 1,
            repeat: Infinity,
          }}
        >
          {/* LED indicators */}
          {[...Array(4)].map((_, j) => (
            <motion.div
              key={j}
              className={`h-2 rounded-sm ${
                status === "crashed"
                  ? "bg-red-500"
                  : status === "critical"
                    ? j < 3
                      ? "bg-red-400"
                      : "bg-gray-600"
                    : status === "degraded"
                      ? j < 2
                        ? "bg-yellow-400"
                        : "bg-green-400"
                      : "bg-green-400"
              }`}
              animate={{
                opacity: status !== "healthy" ? [1, 0.5, 1] : 1,
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: j * 0.1,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

export function ServerLoadVisualizer() {
  const [users, setUsers] = useState(100);
  const [prevStatus, setPrevStatus] = useState<ServerStatus>("healthy");
  const [showCrash, setShowCrash] = useState(false);
  const [responseTime, setResponseTime] = useState(30);

  const currentStatus = getServerStatus(users);
  const config = STATUS_CONFIG[currentStatus];

  // Update response time
  useEffect(() => {
    const interval = setInterval(() => {
      setResponseTime(calculateResponseTime(users));
    }, 500);
    return () => clearInterval(interval);
  }, [users]);

  // Detect crash
  useEffect(() => {
    if (currentStatus === "crashed" && prevStatus !== "crashed") {
      setShowCrash(true);
      setTimeout(() => setShowCrash(false), 2000);
    }
    setPrevStatus(currentStatus);
  }, [currentStatus, prevStatus]);

  const isAtThreshold = users >= 990 && users < 1000;

  return (
    <div className="relative">
      {/* Crash overlay */}
      <AnimatePresence>
        {showCrash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-red-900/90 rounded-2xl flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              className="text-center"
            >
              <div className="text-8xl mb-4">💥</div>
              <div className="text-4xl font-bold text-red-300">
                SERVER CRASHED!
              </div>
              <div className="text-xl text-red-200 mt-2">
                503 Service Unavailable
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main container */}
      <motion.div
        className={`relative rounded-2xl p-8 bg-gradient-to-br ${config.bgColor} border border-white/10 overflow-hidden`}
        animate={currentStatus === "crashed" ? { x: [0, -3, 3, 0] } : {}}
        transition={{
          duration: 0.2,
          repeat: currentStatus === "crashed" ? Infinity : 0,
        }}
      >
        {/* Server rack visualization */}
        <ServerRack status={currentStatus} />

        {/* Users count */}
        <div className="text-center mb-6">
          <motion.div
            key={users}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block"
          >
            <span className="text-6xl font-bold text-white font-mono">
              {users.toLocaleString()}
            </span>
            <span className="text-2xl text-white/70 ml-2">users</span>
          </motion.div>
        </div>

        {/* Status indicator */}
        <div className="text-center mb-6">
          <motion.div
            key={currentStatus}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-2xl font-bold ${config.color}`}
          >
            {config.label}
          </motion.div>
          <p className="text-white/70 mt-1">{config.description}</p>
          <div className="mt-2 text-sm">
            <span className="text-white/50">Response Time: </span>
            <span className={config.color}>
              {currentStatus === "crashed"
                ? "∞ (Timeout)"
                : `${Math.round(responseTime)}ms`}
            </span>
          </div>
        </div>

        {/* Slider */}
        <div className="px-4">
          <Slider
            value={[users]}
            onValueChange={(value) => setUsers(value[0])}
            min={0}
            max={1500}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-white/60 mt-2">
            <span>0</span>
            <span className="text-green-300">500 (OK)</span>
            <span className="text-yellow-300">800 (Chậm)</span>
            <span className="text-red-300">1000 (CRASH!)</span>
            <span>1500</span>
          </div>
        </div>

        {/* Threshold warning */}
        <AnimatePresence>
          {isAtThreshold && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 p-4 bg-red-500/30 border border-red-500/50 rounded-lg text-center"
            >
              <span className="text-red-300 font-bold">
                ⚠️ CẢNH BÁO: ĐIỂM NÚT!
              </span>
              <p className="text-white/80 text-sm mt-1">
                Server đang ở ngưỡng! Chỉ cần thêm {1000 - users} user nữa sẽ
                gây CRASH!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Philosophy explanation */}
      <div className="mt-6 p-4 bg-card rounded-xl border border-border">
        <h4 className="font-semibold text-foreground mb-2">
          💻 Quy Luật Lượng - Chất trong IT
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Khi số user tăng dần (<strong>tích lũy lượng</strong>), server vẫn
          hoạt động nhưng chậm dần. Đến <strong>điểm nút</strong> (1000 users),
          server không chịu nổi và xảy ra <strong>bước nhảy vọt về chất</strong>{" "}
          - từ "hoạt động" sang "crashed". Đây là lý do cần{" "}
          <strong>Auto-scaling</strong> và <strong>Load Balancer</strong>!
        </p>
      </div>
    </div>
  );
}
