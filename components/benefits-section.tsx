"use client"

import { motion } from "framer-motion"
import { ShapeBlur } from "./shape-blur"

const benefits = [
  { stat: "10x", text: "быстрее подготовка отчетности" },
  { stat: "100%", text: "прозрачность по интеграциям" },
  { stat: "0", text: "лишних ручных сверок в таблицах" },
  { stat: "100+", text: "блогеров и размещений под контролем" },
]

const resultCards = [
  {
    title: "Видите слабые интеграции раньше",
    description: "Не ждете финал месяца, чтобы понять, что блогер или связка не окупаются.",
  },
  {
    title: "Руководитель получает понятный отчет",
    description: "Не нужно вручную собирать презентацию из разных файлов и чатов.",
  },
  {
    title: "Команда масштабирует удачные кампании",
    description: "Бюджет уходит туда, где уже виден результат по продажам и вовлеченности.",
  },
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="px-6 py-20 lg:px-8 lg:py-28 relative overflow-hidden">
      {/* ShapeBlur background */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <ShapeBlur
          variation={2}
          shapeSize={0.8}
          roundness={0.4}
          borderSize={0.06}
          circleSize={0.2}
          circleEdge={0.8}
        />
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/25 bg-card/60 backdrop-blur-sm overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }} />

          <div className="relative z-10 p-6 lg:p-10">
            <div className="mb-8 lg:mb-10 lg:text-left text-center lg:max-w-xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f472b6]/25 bg-[#f472b6]/8 text-[#f472b6] text-xs tracking-[0.15em] uppercase mb-5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6] animate-pulse" />
                Результаты
              </span>
              <h2 className="text-2xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground text-balance mb-2">
                Что меняется в работе команды после внедрения <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">SMIP</span>
              </h2>
              <p className="text-foreground/70 text-sm lg:text-base max-w-lg">
                Лендинг должен продавать не набор функций, а итог для бизнеса. Поэтому ниже - самые важные
                результаты, которые видит команда уже на первых этапах.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group text-center p-4 rounded-xl border border-primary/25 bg-primary/6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 hover:-translate-y-0.5"
                >
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-emerald-300 bg-clip-text text-transparent mb-1.5 group-hover:scale-105 transition-transform duration-300">
                    {benefit.stat}
                  </div>
                  <p className="text-foreground/75 text-xs leading-relaxed">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-3 lg:grid-cols-3 mt-6">
              {resultCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="rounded-xl border border-border/70 bg-card/55 p-4 text-left"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/65">{card.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
