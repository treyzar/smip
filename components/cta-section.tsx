"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function CtaSection() {
  return (
    <section id="cta" className="px-6 py-20 lg:px-8 lg:py-28 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/30 relative overflow-hidden bg-gradient-to-br from-card/85 via-card/65 to-card/85 backdrop-blur-sm"
        >
          {/* Inner glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-b from-primary/8 to-transparent blur-[80px] pointer-events-none" />

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
            backgroundSize: "36px 36px",
          }} />

          <div className="relative z-10 p-8 lg:p-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] mb-5 text-foreground text-balance"
            >
              Получите демо, в котором видно
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300"> реальную ценность SMIP</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-foreground/70 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              За 30 минут покажем live-дашборд, разберем ваш сценарий и объясним, где команда быстрее всего
              получит эффект: в отчетности, контроле блогеров или ROMI по интеграциям.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-base font-semibold tracking-wide group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98]"
                asChild
              >
                <a href="https://t.me/smip_support">
                  Запросить персональное демо
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-base font-semibold tracking-wide border border-primary/30 hover:border-primary/50 hover:bg-primary/8 bg-transparent text-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                asChild
              >
                <a href="#demo">Сначала посмотреть live-дашборд</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-foreground/60"
            >
              <div className="rounded-full border border-border/60 bg-card/45 px-4 py-2">30 минут на созвон</div>
              <div className="rounded-full border border-border/60 bg-card/45 px-4 py-2">Без сложной интеграции на старте</div>
              <div className="rounded-full border border-border/60 bg-card/45 px-4 py-2">Покажем на вашем сценарии</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
