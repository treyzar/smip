"use client"

import { motion } from "framer-motion"

export function ScrollGuideLine() {
  return (
    <div className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 w-px pointer-events-none z-0 hidden lg:block">
      {/* Статичная линия */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      
      {/* Анимированная точка */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60 shadow-lg shadow-primary/50"
        animate={{
          y: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Пульсирующие точки на разных высотах */}
      {[20, 40, 60, 80].map((position, index) => (
        <motion.div
          key={position}
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary/30"
          style={{ top: `${position}%` }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  )
}
