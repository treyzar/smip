"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, BarChart3, Users, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Zap,
    title: "Автоматический трекинг",
    description: "SMIP автоматически отслеживает все рекламные интеграции блогеров в реальном времени. Никакого ручного мониторинга.",
    features: [
      "Мониторинг 24/7 без участия",
      "Автоматическое обнаружение рекламы",
      "Уведомления о новых интеграциях",
      "История всех публикаций"
    ],
    highlight: "Экономия 15+ часов в неделю"
  },
  {
    icon: BarChart3,
    title: "Аналитика эффективности",
    description: "Глубокий анализ каждой кампании: охваты, вовлечённость, конверсии и ROI в одном дашборде.",
    features: [
      "ROI в реальном времени",
      "Сравнение кампаний",
      "Прогнозы эффективности",
      "Автоматические отчёты"
    ],
    highlight: "Средний ROI клиентов +285%"
  },
  {
    icon: Users,
    title: "Сравнение инфлюенсеров",
    description: "Выбирайте лучших блогеров на основе данных, а не интуиции. Сравнивайте метрики и историю сотрудничества.",
    features: [
      "База 50,000+ блогеров",
      "История всех интеграций",
      "Рейтинг по нишам",
      "Проверка аудитории"
    ],
    highlight: "Точность выбора 94%"
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-24 lg:px-8 lg:py-32 bg-card/30">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6">
            <CheckCircle2 className="w-4 h-4" />
            Решение
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-6 text-balance">
            SMIP делает это
            <span className="text-primary"> автоматически</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Подключаете аккаунты — получаете данные. Без таблиц, без копирования, без рутины.
          </p>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group rounded-2xl border border-border bg-card p-8 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {benefit.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Highlight */}
                <div className="pt-4 border-t border-border">
                  <span className="text-primary font-semibold">{benefit.highlight}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-base font-semibold tracking-wide group"
            asChild
          >
            <a href="mailto:hello@smip.panel">
              Запросить демо
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 h-14 text-base font-semibold tracking-wide border-border hover:border-primary/50 hover:bg-primary/5"
            asChild
          >
            <a href="#features">Все возможности</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
