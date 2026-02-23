import Link from "next/link"
import { RouteGuard } from "@/lib/auth"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-card/50" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-sm tracking-[0.2em] uppercase text-foreground">
              SMIP
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl xl:text-6xl font-bold uppercase tracking-[-0.02em] leading-[0.95] text-foreground mb-6">
            SOCIAL
            <br />
            MEDIA
            <br />
            <span className="text-primary">INTELLIGENCE</span>
            <br />
            PLATFORM
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Глубокая аналитика блогеров для вашего роста. Автоматический парсинг, детальная аналитика, генерация контента.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground tracking-[0.1em] uppercase">
            Автоматизация 2026
          </span>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-sm tracking-[0.2em] uppercase text-foreground">
                SMIP
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
    </RouteGuard>
  )
}
