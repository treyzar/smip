"use client"

import { motion } from "framer-motion"
import { Instagram, Youtube, Pin, MessageCircle } from "lucide-react"

const platforms = [
  { name: "Instagram", icon: Instagram },
  { name: "YouTube", icon: Youtube },
  { name: "VK", icon: MessageCircle },
  { name: "TikTok", icon: MessageCircle },
  { name: "Pinterest", icon: Pin },
  { name: "Threads", icon: MessageCircle },
]

export function PlatformsSection() {
  return (
    <section id="platforms" className="px-6 py-20 lg:px-8 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4">
            Платформы, которые мы <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">парсим</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm p-6 text-center transition-all duration-300 hover:border-primary/45 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/18 transition-colors">
                <platform.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">{platform.name}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-foreground/70 text-base lg:text-lg"
        >
          Объединяем данные соцсетей с продажами маркетплейсов
        </motion.p>
      </div>
    </section>
  )
}
