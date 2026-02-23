"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: "99.9", suffix: "%", label: "UPTIME ПЛАТФОРМЫ" },
  { value: "2M", suffix: "+", label: "ПОСТОВ В ДЕНЬ" },
  { value: "500K", suffix: "", label: "АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ" },
  { value: "<50", suffix: "ms", label: "ЛАТЕНТНОСТЬ API" },
]

function AnimatedStat({
  stat,
  index,
  isVisible,
}: {
  stat: (typeof stats)[0]
  index: number
  isVisible: boolean
}) {
  return (
    <div
      className="relative p-8 lg:p-10 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Top border accent */}
      <div
        className="absolute top-0 left-8 right-8 h-px bg-primary/30 transition-all duration-1000"
        style={{
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transitionDelay: `${index * 150 + 300}ms`,
        }}
      />

      <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-3 font-mono tracking-tight">
        {stat.value}
        <span className="text-primary/60">{stat.suffix}</span>
      </div>
      <div className="text-xs text-muted-foreground tracking-[0.2em] uppercase">{stat.label}</div>
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden relative">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            {/* Section header */}
            <div className="p-8 lg:p-16 pb-0 lg:pb-0">
              <span className="text-primary text-xs tracking-[0.2em] uppercase mb-4 block font-medium">
                Метрики
              </span>
              <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-[-0.02em] text-foreground">
                МАСШТАБ ПЛАТФОРМЫ
              </h2>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 mt-12 lg:mt-16 border-t border-border">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={index < stats.length - 1 ? "border-r border-border" : ""}
                >
                  <AnimatedStat stat={stat} index={index} isVisible={isVisible} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
