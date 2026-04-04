"use client"

import { motion } from "framer-motion"
import { 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingDown,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight
} from "lucide-react"

const chaosPoints = [
  { icon: Clock, text: "Часы на сбор данных вручную" },
  { icon: AlertTriangle, text: "Устаревшая статистика" },
  { icon: Users, text: "Выгорание сотрудников" },
  { icon: TrendingDown, text: "Невозможно масштабировать" },
]

const smipPoints = [
  { icon: Zap, text: "Автоматический сбор за секунды" },
  { icon: CheckCircle2, text: "Данные в реальном времени" },
  { icon: Users, text: "Команда на стратегических задачах" },
  { icon: TrendingDown, text: "Масштабирование без границ" },
]

const problems = [
  {
    icon: Clock,
    title: "Часы уходят на сбор данных",
    description: "Сотрудники вручную проверяют посты, сторис, охваты и рекламу. Каждый день — одно и то же.",
    stat: "15+",
    statLabel: "часов/неделю",
  },
  {
    icon: AlertTriangle,
    title: "Данные устаревают мгновенно",
    description: "Пока собираете информацию — посты удаляются, статистика меняется. Отчёт уже неактуален.",
    stat: "48ч",
    statLabel: "актуальность данных",
  },
  {
    icon: Users,
    title: "Сотрудники выгорают",
    description: "Копировать ссылки и обновлять таблицы — не то, ради чего люди приходят в маркетинг.",
    stat: "67%",
    statLabel: "текучка кадров",
  },
  {
    icon: TrendingDown,
    title: "Невозможно масштабировать",
    description: "10 блогеров — ещё терпимо. 100+ — процесс разваливается. Ручной сбор не масштабируется.",
    stat: "10x",
    statLabel: "рост затрат",
  },
]

export function ProblemSection() {
  return (
    <section id="problem" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-destructive/30 bg-destructive/5 text-destructive text-sm font-medium mb-6">
            <XCircle className="w-4 h-4" />
            Проблема
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-6 text-balance">
            Ручной сбор данных
            <br />
            <span className="text-foreground/40">больше не работает</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Маркетинговые команды тратят часы на рутину вместо стратегических задач. 
            Вот что происходит каждый день:
          </p>
        </motion.div>

        {/* Split comparison - Chaos vs SMIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-6 mb-20"
        >
          {/* Chaos side */}
          <div className="rounded-2xl border border-destructive/30 bg-destructive/[0.02] p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-destructive/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Без SMIP</h3>
                  <p className="text-sm text-foreground/60">Ручной хаос</p>
                </div>
              </div>
              <div className="space-y-4">
                {chaosPoints.map((point, i) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="text-foreground/80">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* SMIP side */}
          <div className="rounded-2xl border border-primary/30 bg-primary/[0.02] p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">С SMIP</h3>
                  <p className="text-sm text-foreground/60">Автоматизация</p>
                </div>
              </div>
              <div className="space-y-4">
                {smipPoints.map((point, i) => (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <point.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground/80">{point.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border bg-card/50 p-8 lg:p-10 transition-all duration-300 hover:border-destructive/30 hover:bg-destructive/[0.02] relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl border border-border bg-muted flex items-center justify-center group-hover:bg-destructive/10 group-hover:border-destructive/30 transition-all duration-300">
                  <problem.icon className="w-6 h-6 text-foreground/70 group-hover:text-destructive transition-colors" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-destructive">{problem.stat}</div>
                  <div className="text-xs text-foreground/50">{problem.statLabel}</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
