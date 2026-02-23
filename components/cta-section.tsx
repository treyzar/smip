"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"

export function CtaSection() {
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
      { threshold: 0.1 },
    )
    const children = sectionRef.current?.querySelectorAll("[data-animate]")
    children?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/[0.03]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-20 text-center">
            <div data-animate className="opacity-0" style={{ animationDelay: "0.1s" }}>
              <span className="text-primary text-xs tracking-[0.2em] uppercase mb-6 block font-medium">
                Готовы начать?
              </span>
            </div>

            <div data-animate className="opacity-0" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-4xl lg:text-7xl font-bold uppercase tracking-[-0.02em] mb-6 text-foreground text-balance">
                БУДУЩЕЕ
                <br />
                <span className="text-primary">УЖЕ ЗДЕСЬ</span>
              </h2>
            </div>

            <div data-animate className="opacity-0" style={{ animationDelay: "0.5s" }}>
              <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                Присоединяйтесь к тысячам компаний, которые уже используют SMIP
                для глубокой аналитики блогеров.
              </p>
            </div>

            <div
              data-animate
              className="flex flex-wrap justify-center gap-4 opacity-0"
              style={{ animationDelay: "0.7s" }}
            >
              <Button
                size="lg"
                className="rounded-full px-10 h-14 text-sm font-semibold uppercase tracking-[0.1em] group"
                asChild
              >
                <Link href="/login">
                  Получить доступ
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-14 text-sm font-semibold uppercase tracking-[0.1em] border-primary/30 hover:border-primary hover:bg-primary/10 bg-transparent text-foreground"
                asChild
              >
                <a href="mailto:hello@smip.panel">Связаться с нами</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
