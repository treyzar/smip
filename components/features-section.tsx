"use client"

import { Zap, BarChart3, Brain, Link2 } from "lucide-react"
import { useEffect, useRef } from "react"

const features = [
  {
    icon: Zap,
    title: "АВТОМАТИЧЕСКИЙ ПАРСИНГ",
    description:
      "Сбор и структурирование данных блогеров из всех популярных платформ в реальном времени. Автоматическое обновление базы.",
    tag: "01",
  },
  {
    icon: BarChart3,
    title: "ДЕТАЛЬНАЯ АНАЛИТИКА",
    description:
      "Глубокие инсайты по вовлечённости, аудитории и росту каждого блогера. Прогнозные метрики и кастомные отчёты.",
    tag: "02",
  },
  {
    icon: Brain,
    title: "ГЕНЕРАЦИЯ КОНТЕНТА",
    description:
      "AI создаёт уникальный контент на основе анализа трендов и аудитории. Тексты, хештеги, стратегии публикаций.",
    tag: "03",
  },
  {
    icon: Link2,
    title: "ИНТЕГРАЦИЯ С DATALENS",
    description:
      "Визуализируйте данные в Yandex DataLens. Готовые дашборды, автоматическая синхронизация и живые графики.",
    tag: "04",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        }
      },
      { threshold: 0.05 },
    )
    const children = sectionRef.current?.querySelectorAll("[data-animate]")
    children?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          data-animate
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20 opacity-0"
        >
          <div>
            <span className="text-primary text-xs tracking-[0.2em] uppercase mb-4 block font-medium">
              Преимущества
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-[-0.02em] text-foreground text-balance">
              ГЛУБОКАЯ АНАЛИТИКА
              <br />
              <span className="text-foreground/40">ДЛЯ ВАШЕГО РОСТА</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-md leading-relaxed lg:text-right">
            Четыре ключевых модуля, которые работают как единый интеллектуальный организм
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, index) => (
            <div
              key={feature.tag}
              data-animate
              className="group rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 lg:p-10 transition-all duration-500 hover:border-primary/30 hover:bg-card/60 relative overflow-hidden opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground/50 tracking-[0.2em] font-mono">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-[0.05em] mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
