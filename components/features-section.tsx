"use client"

import { motion } from "framer-motion"
import { BarChart3, Bot, BriefcaseBusiness, Link2, SearchCheck, TrendingUp } from "lucide-react"
import { ShapeBlur } from "./shape-blur"

const BLUR_CARDS = new Set([0, 2, 4])

const features = [
  { icon: TrendingUp, title: "ROMI по каждому блогеру", description: "Сразу видно, какие размещения приносят продажи, а какие только расходуют бюджет.", stats: "Решения быстрее" },
  { icon: Link2, title: "Соцсети + Wildberries", description: "SMIP связывает данные кампаний и продаж в одном отчете без ручной сводки.", stats: "Одна картина" },
  { icon: BarChart3, title: "Готовый дашборд для команды", description: "Маркетинг, руководитель и аналитик смотрят на одни и те же цифры и статусы.", stats: "Без хаоса" },
  { icon: SearchCheck, title: "Мониторинг конкурентов", description: "Быстрее замечаете, кто работает с рынком, и не теряете полезные связки.", stats: "Видно рынок" },
  { icon: Bot, title: "Меньше ручной рутины", description: "Ежедневное обновление снимает с команды бесконечные таблицы и проверку метрик вручную.", stats: "24/7" },
  { icon: BriefcaseBusiness, title: "Удобно агентствам и брендам", description: "Подходит командам, которые ведут сразу много блогеров, интеграций и отчетов.", stats: "Масштабируемо" },
]

export function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-20 lg:px-8 lg:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:text-left text-center mb-12 lg:mb-14 lg:max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs tracking-[0.15em] uppercase mb-6 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Почему SMIP
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-4 text-balance">
            Почему команды переходят на <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">SMIP</span>
          </h2>
          <p className="text-foreground/70 text-base lg:text-lg max-w-xl">
            Не просто собираете метрики, а быстрее понимаете, куда масштабировать бюджет и где теряются
            деньги.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="group rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm p-5 transition-all duration-300 hover:border-primary/45 hover:bg-card/80 relative overflow-hidden hover:shadow-lg hover:shadow-primary/10"
            >
              {BLUR_CARDS.has(index) && (
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                  <ShapeBlur
                    variation={index % 3}
                    shapeSize={1}
                    roundness={0.5}
                    borderSize={0.05}
                    circleSize={0.25}
                    circleEdge={1}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0 group-hover:border-primary/45 group-hover:bg-primary/15 transition-all duration-300">
                  <feature.icon className="w-4 h-4 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-semibold border border-primary/20 shrink-0">
                      {feature.stats}
                    </span>
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
