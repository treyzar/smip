"use client"

import { motion } from "framer-motion"
import { BarChart3, BriefcaseBusiness, ShoppingBag, Users } from "lucide-react"

const keyPoints = [
  { icon: ShoppingBag, label: "E-commerce бренды" },
  { icon: BriefcaseBusiness, label: "Маркетинговые агентства" },
  { icon: Users, label: "In-house команды influencer marketing" },
  { icon: BarChart3, label: "Селлеры с фокусом на Wildberries" },
]

export function AboutSection() {
  return (
    <section className="px-6 py-20 lg:px-8 lg:py-28 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Left column - header + key points */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs tracking-[0.15em] uppercase mb-5 font-medium">
              Кому подходит
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-[-0.02em] text-foreground mb-8 text-balance leading-tight">
              SMIP нужен командам, которым важно{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
                видеть окупаемость, а не просто метрики
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {keyPoints.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-border/70 bg-card/55 hover:border-primary/35 hover:bg-card/75 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column - descriptive text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-5 text-foreground/80 text-base leading-relaxed lg:pt-4"
          >
            <p>
              Если команда работает с блогерами регулярно, то главный вопрос не в том, как собрать лайки и
              просмотры, а в том, как быстро понять,{" "}
              <span className="text-foreground font-semibold relative">
                что действительно окупается
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary/40 rounded-full" />
              </span>
              . SMIP сокращает путь от интеграции до решения: оставить блогера, масштабировать связку или
              остановить расход.
            </p>
            <p>
              Платформа собирает метрики из соцсетей, подтягивает продажи и связывает их в{" "}
              <mark className="bg-primary/15 text-primary font-semibold px-1.5 py-0.5 rounded-md not-italic">Wildberries</mark>{" "}
              и других рабочих выгрузках. В итоге команда получает не хаос из таблиц, а готовую аналитику в{" "}
              <mark className="bg-primary/15 text-primary font-semibold px-1.5 py-0.5 rounded-md not-italic">Yandex DataLens</mark>{" "}
              с понятной логикой ROMI и эффективности по каждому размещению.
            </p>
            <p>
              Это особенно полезно командам, которым важно быстро сверять интеграции, следить за
              конкурентами и объяснять руководителю, почему одна кампания сработала, а другая нет. Вместо
              ручной сводки по понедельникам у вас уже есть{" "}
              <span className="text-foreground font-semibold relative">
                готовый отчет для принятия решений
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary/40 rounded-full" />
              </span>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
