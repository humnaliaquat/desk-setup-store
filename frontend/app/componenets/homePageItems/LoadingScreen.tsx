"use client";
import { motion } from "motion/react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-white flex items-center justify-center px-8">
      <div className="relative flex items-center justify-center">
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main text with letter-by-letter animation */}
        <motion.h1 className="relative text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-medium tracking-wider">
          {"DESKIO".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 80, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
              }}
              className="inline-block"
            >
              <span className="inline-block bg-orange-500 bg-clip-text text-transparent">
                {letter === " " ? "\u00A0" : letter}
              </span>
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtle pulsing underline or loader below */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-36 h-1 bg-orange-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 128, opacity: [0.4, 1, 0.4] }}
          transition={{
            width: { delay: 0.8, duration: 0.6 },
            opacity: { delay: 1.4, duration: 2, repeat: Infinity },
          }}
        />
      </div>

      {/* Optional: tiny "Loading..." text */}
    </div>
  );
}
