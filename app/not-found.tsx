"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {glitching && (
        <>
          <span
            className="absolute inset-0 text-primary/60 z-20"
            style={{ transform: "translate(-3px, -2px)", clipPath: "inset(20% 0 60% 0)" }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute inset-0 text-destructive/40 z-20"
            style={{ transform: "translate(3px, 2px)", clipPath: "inset(50% 0 10% 0)" }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}

function FloatingParticle({ delay, x, size }: { delay: number; x: number; size: number }) {
  return (
    <div
      className="absolute rounded-full bg-primary/20 animate-float-particle pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        bottom: "-10%",
        animationDelay: `${delay}s`,
        animationDuration: `${8 + Math.random() * 6}s`,
      }}
    />
  )
}

export default function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const columns = Math.floor(canvas.width / 20)
    const drops: number[] = Array(columns).fill(1)
    const chars = "01SMIP404ERROR{}[]<>/\\|~"

    const draw = () => {
      ctx.fillStyle = "rgba(26, 31, 46, 0.08)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(0, 217, 165, 0.06)"
      ctx.font = "14px monospace"

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 20, drops[i] * 20)
        if (drops[i] * 20 > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 80)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden="true"
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 animate-glow-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 animate-glow-pulse pointer-events-none"
        style={{ animationDelay: "3s" }}
      />

      {/* Floating particles */}
      <FloatingParticle delay={0} x={10} size={4} />
      <FloatingParticle delay={1.5} x={25} size={3} />
      <FloatingParticle delay={3} x={45} size={5} />
      <FloatingParticle delay={2} x={65} size={3} />
      <FloatingParticle delay={4} x={80} size={4} />
      <FloatingParticle delay={1} x={90} size={3} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Top badge */}
        <div className="flex items-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-mono">
            {"// "}Ошибка навигации
          </span>
        </div>

        {/* 404 number */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-[10rem] sm:text-[14rem] lg:text-[18rem] font-bold leading-none tracking-[-0.04em] text-foreground/5 select-none relative">
            <GlitchText text="404" />
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-primary/[0.02] animate-scan-line pointer-events-none" />
          </h1>
        </div>

        {/* Decorative line */}
        <div className="w-24 h-px bg-border mb-8 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="absolute inset-y-0 left-0 bg-primary animate-line-draw h-full" />
        </div>

        {/* Text content */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.1em] text-foreground mb-4">
            Страница не найдена
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-4">
            Запрашиваемая страница не существует или была перемещена.
            Возможно, ссылка устарела.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
          <Button
            size="lg"
            className="rounded-full px-8 h-14 text-sm font-semibold uppercase tracking-[0.1em] group"
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 h-14 text-sm font-semibold uppercase tracking-[0.1em] border-border hover:border-primary/50 hover:bg-primary/5 bg-transparent text-foreground group"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back()
              }
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Назад
          </Button>
        </div>

        {/* Bottom SMIP branding */}
        <div className="mt-16 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "1s" }}>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-primary/40 flex items-center justify-center group-hover:border-primary/80 transition-colors">
              <span className="text-primary font-bold text-xs">S</span>
            </div>
            <span className="font-bold text-xs tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors">
              SMIP
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
