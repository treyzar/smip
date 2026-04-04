"use client"

import { motion } from "framer-motion"
import { BarChart3, Link2, Rocket, UploadCloud } from "lucide-react"

const steps = [
  { number: "01", icon: UploadCloud, title: "Передаёте кампании и блогеров", description: "Стартуем от ваших текущих интеграций и источников данных", duration: "30 мин" },
  { number: "02", icon: Link2, title: "SMIP связывает источники", description: "Метрики из соцсетей и продажи собираются в одном сценарии", duration: "Авто" },
  { number: "03", icon: BarChart3, title: "Получаете готовый дашборд", description: "Команда видит ROMI, динамику и статусы без ручной сводки", duration: "Каждый день" },
  { number: "04", icon: Rocket, title: "Принимаете решения быстрее", description: "Понимаете, кого масштабировать, а кого отключать", duration: "По цифрам" },
]

export function ProcessSection() {
  return (
    <section id="process" className="px-6 py-20 lg:px-8 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-transparent to-card/20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        {/* Left-aligned header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:max-w-lg"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs tracking-[0.15em] uppercase mb-5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Запуск без хаоса
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-foreground mb-3 text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">4 шага</span> от кампаний до понятного ROMI
            </h2>
            <p className="text-foreground/70 text-base lg:text-lg">
              Без долгого внедрения и ручной сборки отчетов под каждую интеграцию.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block w-32 h-px bg-gradient-to-r from-primary/40 to-transparent origin-left"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-1.5 w-3 z-10">
                  <div className="w-full h-px bg-gradient-to-r from-primary/30 to-primary/10" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/40" />
                </div>
              )}

              <div className="group rounded-xl border border-border/70 bg-card/65 backdrop-blur-sm p-4 h-full hover:border-primary/45 transition-all duration-300 relative overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="relative">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center group-hover:border-primary/45 group-hover:bg-primary/15 transition-all duration-300">
                      <step.icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-b from-foreground/25 to-foreground/10 bg-clip-text text-transparent font-mono">{step.number}</span>
                  </div>

                  <h3 className="text-sm font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 text-xs leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-semibold border border-primary/20">
                    {step.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
