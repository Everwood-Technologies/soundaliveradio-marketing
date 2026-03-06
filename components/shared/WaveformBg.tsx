"use client";

import { motion } from "framer-motion";

/**
 * Subtle animated waveform / radio-wave background for hero sections.
 */
export function WaveformBg({ className }: { className?: string }) {
  const arcs = [
    { cx: "50%", cy: "50%", r: "40%", delay: 0 },
    { cx: "50%", cy: "50%", r: "55%", delay: 0.2 },
    { cx: "50%", cy: "50%", r: "70%", delay: 0.4 },
    { cx: "50%", cy: "50%", r: "85%", delay: 0.6 },
  ];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className ?? ""}`}
      aria-hidden
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave-red" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(230,0,35,0)" />
            <stop offset="50%" stopColor="rgba(230,0,35,0.14)" />
            <stop offset="100%" stopColor="rgba(230,0,35,0)" />
          </linearGradient>
          <linearGradient id="wave-red-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(204,0,0,0)" />
            <stop offset="50%" stopColor="rgba(204,0,0,0.1)" />
            <stop offset="100%" stopColor="rgba(204,0,0,0)" />
          </linearGradient>
        </defs>
        {arcs.map(({ cx, cy, r, delay }, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? "url(#wave-red)" : "url(#wave-red-dark)"}
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay,
            }}
          />
        ))}
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, var(--background) 70%)",
        }}
      />
    </div>
  );
}
