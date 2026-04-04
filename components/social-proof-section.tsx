"use client"

import { motion } from "framer-motion"
import { Clock3, SearchCheck, TrendingUp, Users } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { ShapeBlur } from "./shape-blur"

const stats = [
  { icon: Clock3, value: 10, suffix: "x", label: "Быстрее отчетность", description: "Команда меньше времени тратит на сводки" },
  { icon: SearchCheck, value: 24, suffix: "/7", label: "Авто парсинг соцсетей", description: "Сбор метрик без ручной проверки" },
  { icon: Users, value: 100, suffix: "+", label: "Блогеров под контролем", description: "Можно вести много интеграций параллельно" },
  { icon: TrendingUp, value: 347, suffix: "%", label: "ROI в live-дашборде", description: "Результат видно сразу в одном окне" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 50
        const inc = value / steps
        let cur = 0
        const t = setInterval(() => {
          cur += inc
          if (cur >= value) { setDisplay(value); clearInterval(t) }
          else setDisplay(Math.round(cur))
        }, 30)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return <div ref={ref}><span className="tabular-nums">{display.toLocaleString()}</span>{suffix}</div>
}

export function SocialProofSection() {
  return (
    <section id="proof" className="px-6 py-16 lg:px-8 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <ShapeBlur
          variation={0}
          shapeSize={1}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.25}
          circleEdge={1}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs tracking-[0.15em] uppercase mb-5 font-medium">
            Что получает команда
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-4 text-balance">
            Самая сильная ценность SMIP -{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              решения по цифрам, а не по ощущениям
            </span>
          </h2>
          <p className="text-foreground/70 text-base lg:text-lg">
            Уже на первом месяце команда видит, какие блогеры и интеграции действительно окупаются, а где
            бюджет уходит в шум.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ transform: i % 2 === 1 ? "translateY(12px)" : "translateY(0)" }}
              className="group text-center p-4 lg:p-5 rounded-xl border border-border/70 bg-card/65 backdrop-blur-sm hover:border-primary/45 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative overflow-hidden"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/18 transition-colors">
                  <stat.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent mb-1">
                  {stat.value !== null ? (
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  ) : (
                    <span className="text-xl">⚡</span>
                  )}
                </div>
                <div className="text-foreground font-medium text-sm mb-0.5">{stat.label}</div>
                <div className="text-xs text-foreground/60">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
