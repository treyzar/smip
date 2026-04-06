"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"

const navLinks = [
  { label: "Почему SMIP", href: "#features" },
  { label: "Как работает", href: "#process" },
  { label: "Результаты", href: "#benefits" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async () => {
    try { await logout() } catch (e) { console.error("Logout error:", e) }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
        : "bg-transparent"
    }`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group relative">
            <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src="/logo.svg" 
              alt="SMIP Logo" 
              className="h-12 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/70 text-xs tracking-[0.1em] uppercase hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-2.5">
                    <Button size="sm" variant="outline" className="rounded-full px-4 text-xs tracking-[0.08em] uppercase border-border/50" asChild>
                      <Link href="/dashboard">Дашборд</Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-full hover:bg-secondary/40 transition-colors">
                          <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                            <User className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-xs text-foreground/70">{user?.username || "Пользователь"}</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 bg-card border-border text-foreground">
                        <DropdownMenuItem asChild className="text-xs">
                          <Link href="/dashboard/settings"><User className="w-3.5 h-3.5 mr-2" />Настройки</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem onClick={handleLogout} className="text-xs text-destructive cursor-pointer">
                          <LogOut className="w-3.5 h-3.5 mr-2" />Выйти
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-xs tracking-[0.08em] uppercase text-foreground/55 hover:text-foreground transition-colors duration-300"
                    >
                      Войти
                    </Link>
                    <Button
                      size="sm"
                      className="rounded-full px-6 text-xs tracking-[0.08em] uppercase bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                      asChild
                    >
                      <a href="#cta">Получить демо</a>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/80"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 text-sm tracking-[0.1em] uppercase hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 py-1">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80">{user?.username || "Пользователь"}</span>
                      </div>
                      <Button variant="outline" className="rounded-full text-xs tracking-[0.08em] uppercase" asChild>
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Дашборд</Link>
                      </Button>
                      <Button variant="destructive" className="rounded-full text-xs tracking-[0.08em] uppercase" onClick={() => { handleLogout(); setMobileOpen(false) }}>
                        Выйти
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="rounded-full text-xs tracking-[0.08em] uppercase" asChild>
                        <a href="#cta" onClick={() => setMobileOpen(false)}>Получить демо</a>
                      </Button>
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="text-center text-xs tracking-[0.08em] uppercase text-foreground/60 hover:text-foreground transition-colors"
                      >
                        Войти
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
