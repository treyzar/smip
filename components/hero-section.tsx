"use client"

import { useState } from "react"
import { ArrowRight, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth"
import { DashboardDemoFrame } from "./dashboard-demo-frame"
import { ShapeBlur } from "./shape-blur"
import Image from "next/image"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const companies = ["Likato", "Easyclean", "VegaNova", "EcomGroup"]

const quickProof = [
  "Для e-commerce брендов, селлеров и агентств",
  "Показывает ROMI по каждому блогеру",
  "Убирает ручные таблицы и сверки",
]

export function HeroSection() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const [catVisible, setCatVisible] = useState(true)

  const scrollToGame = () => {
    document.getElementById("game")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="relative px-6 pt-28 pb-16 lg:px-8 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <ShapeBlur
          variation={1}
          shapeSize={1.2}
          roundness={0.6}
          borderSize={0.04}
          circleSize={0.3}
          circleEdge={1}
        />
      </div>

      <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-primary/6 blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="mx-auto max-w-7xl relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-sm font-medium text-primary tracking-wide">Аналитика блогеров для e-commerce и агентств</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-[-0.03em] leading-[1.08] mb-6 text-balance"
          >
            <span className="text-foreground">Сократите аналитику блогеров </span>
            <br />
            <span className="text-foreground">в </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-emerald-300">10 раз быстрее</span>
            <span className="text-foreground"> и сразу видьте результат</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-foreground/74 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6"
          >
            SMIP ежедневно собирает метрики из соцсетей, связывает их с{" "}
            <span className="text-foreground font-medium">Wildberries</span> и показывает, какие интеграции
            реально приносят продажи. Без ручных таблиц, долгих сверок и слепых отчетов.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            {quickProof.map((item) => (
              <div
                key={item}
                className="rounded-full border border-border/60 bg-card/55 px-4 py-2 text-sm text-foreground/72"
              >
                {item}
              </div>
            ))}
          </motion.div>

          {isAuthenticated && user && (
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-2 text-sm text-primary mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>С возвращением, {user.username}!</span>
            </motion.div>
          )}

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-semibold tracking-wide group"
                    asChild
                  >
                    <Link href="/dashboard">
                      Открыть дашборд
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="rounded-full px-10 h-14 text-base font-semibold tracking-wide group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98]"
                      asChild
                    >
                      <a href="#demo">
                        Посмотреть live-дашборд
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 h-14 text-base font-medium border-primary/30 bg-transparent text-foreground/78 hover:text-foreground hover:border-primary/50 hover:bg-primary/8 group transition-all duration-300"
                      asChild
                    >
                      <a href="mailto:hello@smip.panel?subject=Хочу%20получить%20пример%20отчета%20SMIP">
                        <PlayCircle className="mr-2 h-4 w-4 text-primary group-hover:text-primary transition-colors" />
                        Получить пример отчета
                      </a>
                    </Button>
                  </>
                )}
              </>
            )}
          </motion.div>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-sm text-foreground/52 mt-4"
          >
            Покажем, как SMIP выглядит на реальном отчете и где вы быстрее всего получите эффект.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-14 lg:mb-16"
        >
          <p className="text-foreground/50 text-xs tracking-[0.15em] uppercase text-center mb-2">
            Команды брендов и агентств уже работают в SMIP
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 mt-5">
            {companies.map((company, i) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + i * 0.06 }}
                className="group px-5 py-2.5 rounded-xl bg-card/60 border border-border/60 text-foreground/75 font-medium text-sm hover:border-primary/40 hover:text-foreground hover:bg-card/80 transition-all duration-300"
              >
                {company}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              className="px-5 py-2.5 rounded-xl bg-primary/14 border border-primary/40 text-primary font-semibold text-sm"
            >
              и др. 5+
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          id="demo"
          className="scroll-mt-20"
        >
          <div className="relative">
            <DashboardDemoFrame />
          </div>
        </motion.div>

        {catVisible && (
          <motion.div
            initial={{ opacity: 0, x: 32, y: 24 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.45, delay: 1 }}
            className="fixed bottom-24 right-6 z-40 hidden lg:flex flex-col items-end gap-2"
          >
            <button
              type="button"
              onClick={() => setCatVisible(false)}
              className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border/70 bg-card text-foreground/65 shadow-lg transition-colors hover:text-foreground"
              aria-label="Close cat widget"
            >
              x
            </button>

            <button
              type="button"
              onClick={scrollToGame}
              className="group max-w-[220px] rounded-2xl border border-primary/25 bg-background/92 p-3 text-right shadow-xl shadow-black/20 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-xs font-semibold text-foreground">Catch the cat game</p>
              <p className="mt-1 text-[11px] leading-relaxed text-foreground/60">
                Нажми на кота и перейди к игре с косточками.
              </p>
            </button>

            <button
              type="button"
              onClick={scrollToGame}
              className="group relative overflow-hidden rounded-2xl border-2 border-primary/30 shadow-xl shadow-primary/15 transition-transform duration-300 hover:scale-[1.03]"
              aria-label="Open game section"
            >
              <Image
                src="/images/analytics-cat.png"
                alt="SMIP cat"
                width={140}
                height={140}
                className="h-[120px] w-[120px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-medium tracking-[0.12em] text-primary uppercase">
                Play
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
