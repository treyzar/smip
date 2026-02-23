"use client"

import { useEffect, useRef } from "react"

const steps = [
  {
    number: "01",
    title: "ПОДКЛЮЧЕНИЕ",
    description:
      "Свяжите все ваши социальные сети в единую экосистему за считанные минуты. Безопасная OAuth-авторизация.",
  },
  {
    number: "02",
    title: "АНАЛИЗ",
    description:
      "AI изучает вашу аудиторию, контент-историю и конкурентов. Формирует индивидуальную стратегию.",
  },
  {
    number: "03",
    title: "АВТОМАТИЗАЦИЯ",
    description:
      "Система запускает автоматическое управление контентом, ответами и модерацией 24/7.",
  },
  {
    number: "04",
    title: "МАСШТАБ",
    description:
      "Платформа масштабирует результаты, оптимизирует стратегию и увеличивает охват.",
  },
]

export function ProcessSection() {
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
      { threshold: 0.1 }
    )
    const children = sectionRef.current?.querySelectorAll("[data-animate]")
    children?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div
          data-animate
          className="mb-16 lg:mb-20 opacity-0"
        >
          <span className="text-primary text-xs tracking-[0.2em] uppercase mb-4 block font-medium">
            Процесс
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-[-0.02em] text-foreground text-balance">
            КАК ЭТО РАБОТАЕТ
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              data-animate
              className="relative opacity-0"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" />
              )}

              <div className="relative z-10 lg:pr-8">
                {/* Step number with dot */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-center">
                    <span className="text-primary text-xl font-bold font-mono">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex-1 h-px bg-border" />
                  )}
                </div>

                <h3 className="text-lg font-bold uppercase tracking-[0.05em] mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
