"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isAuthenticated, user, isLoading } = useAuth()

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
    <section ref={sectionRef} className="relative px-6 pt-32 pb-24 lg:px-8 lg:pt-44 lg:pb-32">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 animate-glow-pulse pointer-events-none" style={{ animationDelay: "3s" }} />

      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-8 lg:p-16 relative overflow-hidden">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10">
            {/* Header row */}
            <div
              data-animate
              className="flex items-center justify-between mb-16 lg:mb-24 opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">S</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-border" />
                <span className="hidden sm:block text-muted-foreground text-xs tracking-[0.2em] uppercase">
                  Intelligence Platform
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground text-xs tracking-[0.15em] uppercase">
                  Автоматизация 2026
                </span>
              </div>
            </div>

            {/* Main headline */}
            <div className="max-w-6xl">
              <div
                data-animate
                className="opacity-0"
                style={{ animationDelay: "0.3s" }}
              >
                <h1 className="text-5xl sm:text-7xl lg:text-[7rem] xl:text-[8.5rem] font-bold tracking-[-0.03em] uppercase leading-[0.85] mb-8 text-balance">
                  <span className="text-foreground">SMIP</span>
                  <span className="text-muted-foreground font-light mx-4">{"--"}</span>
                  <br className="hidden lg:block" />
                  <span className="text-foreground">SOCIAL</span>{" "}
                  <span className="text-foreground/60">MEDIA</span>
                  <br />
                  <span className="text-primary/90">INTELLIGENCE</span>
                  <br />
                  <span className="text-foreground">PLATFORM</span>
                </h1>
              </div>

              {/* Accent line with animation */}
              <div
                data-animate
                className="mb-12 opacity-0"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="h-px w-full bg-border relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-primary animate-line-draw h-full" />
                </div>
              </div>

              <div
                data-animate
                className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 opacity-0"
                style={{ animationDelay: "0.7s" }}
              >
                <div>
                  <p className="text-muted-foreground text-base lg:text-lg max-w-lg leading-relaxed mb-4">
                    SMIP Panel: Глубокая аналитика блогеров для вашего роста.
                    Автоматический парсинг, детальные инсайты и генерация контента с AI.
                  </p>

                  {/* Welcome message for authenticated users */}
                  {isAuthenticated && user && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Добро пожаловать, {user.username}!</span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-shrink-0 gap-4">
                  {!isLoading && (
                    <>
                      {isAuthenticated ? (
                        // Buttons for authenticated users
                        <Button
                          size="lg"
                          className="rounded-full px-8 h-14 text-sm font-semibold uppercase tracking-[0.1em] group"
                          asChild
                        >
                          <Link href="/dashboard">
                            Открыть дашборд
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </Button>
                      ) : (
                        // Buttons for non-authenticated users
                        <>
                          <Button
                            size="lg"
                            className="rounded-full px-8 h-14 text-sm font-semibold uppercase tracking-[0.1em] group"
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
                            className="rounded-full px-8 h-14 text-sm font-semibold uppercase tracking-[0.1em] border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent text-foreground"
                            asChild
                          >
                            <Link href="#features">Узнать больше</Link>
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
