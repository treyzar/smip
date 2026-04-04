"use client"

import { motion } from "framer-motion"
import { Megaphone, Newspaper, LineChart, Building2, CheckCircle2 } from "lucide-react"

const audiences = [
  {
    icon: Megaphone,
    title: "Маркетинговые команды",
    description: "Анализ рекламных интеграций и блогеров.",
    useCases: [
      "Выбор блогеров для кампаний",
      "Анализ эффективности размещений",
      "Планирование контент-стратегии",
      "Отчётность для руководства"
    ],
    stat: "85%",
    statLabel: "экономия времени",
  },
  {
    icon: Building2,
    title: "Рекламные агентства",
    description: "Мониторинг эффективности кампаний.",
    useCases: [
      "Мультиклиентское управление",
      "White-label отчёты",
      "Сравнительный анализ ниш",
      "Масштабирование без команды"
    ],
    stat: "3x",
    statLabel: "больше клиентов",
  },
  {
    icon: Newspaper,
    title: "PR-команды",
    description: "Отслеживание активности блогеров и публикаций.",
    useCases: [
      "Мониторинг упоминаний",
      "Отслеживание кризисов",
      "Анализ тональности",
      "Медиапланирование"
    ],
    stat: "24/7",
    statLabel: "мониторинг",
  },
  {
    icon: LineChart,
    title: "Аналитики",
    description: "Сбор и анализ данных из соцсетей.",
    useCases: [
      "Исследования аудитории",
      "Конкурентный анализ",
      "Тренды и прогнозы",
      "Data-driven отчёты"
    ],
    stat: "10TB",
    statLabel: "данных доступно",
  },
]

export function AudienceSection() {
  return (
    <section id="audience" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-primary text-xs tracking-[0.2em] uppercase mb-4 block font-medium">
            Для кого
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-6 text-balance">
            Кто использует SMIP
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Решение для команд, работающих с инфлюенсер-маркетингом
          </p>
        </motion.div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <audience.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{audience.stat}</div>
                    <div className="text-xs text-foreground/50">{audience.statLabel}</div>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {audience.title}
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {audience.description}
                </p>

                {/* Use cases */}
                <div className="space-y-2">
                  {audience.useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
