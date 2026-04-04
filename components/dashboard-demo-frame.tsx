"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function DashboardDemoFrame() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-2xl shadow-black/25">
        <div className="p-4 lg:p-6">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/55">
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="ml-2 text-xs font-medium text-foreground/62">real product screen</span>
              </div>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                how it looks
              </span>
            </div>

            <div className="p-3 lg:p-4">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="overflow-hidden rounded-xl border border-border/60 bg-white"
              >
                <Image
                  src="/dashboard-real-preview.png"
                  alt="Реальный экран аналитики SMIP по блогеру"
                  width={1024}
                  height={685}
                  className="h-auto w-full object-cover"
                  quality={100}
                  unoptimized
                  priority
                />
              </motion.div>

              <div className="grid gap-3 border-t border-border/60 px-1 pt-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-background/65 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-primary/85">Что это</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">
                    Реальный экран аналитики по блогеру, а не абстрактный mockup.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/65 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-primary/85">Что видно</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">
                    Охват, лайки, комментарии, репосты, ER, конверсии и платформы в одном интерфейсе.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/65 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-primary/85">Почему это важно</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/68">
                    Пользователь сразу понимает, как выглядит продукт внутри и за что именно он платит.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-r from-primary/8 via-transparent to-primary/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -z-10 h-[250px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
    </div>
  )
}
