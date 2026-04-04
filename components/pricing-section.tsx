"use client"

import { useState, useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "БЕСПЛАТНЫЙ",
    monthlyPrice: "0",
    yearlyPrice: "0",
    description: "Для знакомства с платформой",
    features: [
      "До 5 блогеров в базе",
      "Базовая аналитика",
      "1 парсинг в день",
      "Экспорт в CSV",
    ],
    cta: "Начать бесплатно",
    highlighted: false,
  },
  {
    name: "СТАНДАРТ",
    monthlyPrice: "2 990",
    yearlyPrice: "29 900",
    description: "Для растущих команд",
    features: [
      "До 100 блогеров в базе",
      "Детальная аналитика",
      "Безлимитный парсинг",
      "Генерация контента (AI)",
      "Google Sheets интеграция",
      "Email поддержка",
    ],
    cta: "Выбрать",
    highlighted: true,
  },
  {
    name: "ПРЕМИУМ",
    monthlyPrice: "9 990",
    yearlyPrice: "99 900",
    description: "Для агентств и брендов",
    features: [
      "Безлимитная база блогеров",
      "Прогнозная аналитика (AI)",
      "Безлимитный парсинг",
      "Генерация контента (AI Pro)",
      "DataLens интеграция",
      "API доступ",
      "Приоритетная поддержка",
      "Кастомные отчёты",
    ],
    cta: "Выбрать",
    highlighted: false,
  },
]

export function PricingSection() {
  const [yearly, setYearly] = useState(false)
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
    <section ref={sectionRef} id="pricing" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          data-animate
          className="mb-16 lg:mb-20 opacity-0"
        >
          <span className="text-primary text-xs tracking-[0.2em] uppercase mb-4 block font-medium">
            Тарифы
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-[-0.02em] text-foreground text-balance">
              ВЫБЕРИТЕ ПЛАН
            </h2>

            {/* Month/Year toggle */}
            <div className="flex items-center gap-3 self-start lg:self-auto">
              <span
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${!yearly ? "text-primary" : "text-muted-foreground"}`}
              >
                Месяц
              </span>
              <button
                onClick={() => setYearly(!yearly)}
                className={`relative w-14 h-7 rounded-full border transition-all duration-300 ${
                  yearly
                    ? "bg-primary/20 border-primary/40"
                    : "bg-secondary border-border"
                }`}
                aria-label="Переключить период оплаты"
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 ${
                    yearly
                      ? "left-[calc(100%-1.625rem)] bg-primary"
                      : "left-0.5 bg-muted-foreground"
                  }`}
                />
              </button>
              <span
                className={`text-xs tracking-[0.1em] uppercase transition-colors ${yearly ? "text-primary" : "text-muted-foreground"}`}
              >
                Год
              </span>
              {yearly && (
                <span className="text-[10px] tracking-[0.1em] uppercase text-primary bg-primary/10 rounded-full px-3 py-1">
                  -17%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              data-animate
              className={`relative rounded-2xl border p-8 lg:p-10 transition-all duration-500 opacity-0 flex flex-col ${
                plan.highlighted
                  ? "border-primary/40 bg-primary/[0.04]"
                  : "border-border bg-card/30 backdrop-blur-sm hover:border-border/80"
              }`}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-px left-8 right-8 h-px bg-primary" />
              )}

              <div className="mb-8">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1 mt-3 mb-2">
                  <span className="text-4xl lg:text-5xl font-bold text-foreground font-mono tracking-tight">
                    {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground text-sm ml-1">
                    {plan.monthlyPrice === "0"
                      ? ""
                      : yearly
                        ? "/ год"
                        : "/ мес"}
                  </span>
                </div>
                <p className="text-foreground/70 text-sm">{plan.description}</p>
              </div>

              <div className="border-t border-border pt-6 mb-8 flex-1">
                <ul className="flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                className={`w-full rounded-full h-12 text-xs tracking-[0.1em] uppercase font-semibold ${
                  plan.highlighted
                    ? ""
                    : "bg-transparent text-foreground border border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href="/register">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
