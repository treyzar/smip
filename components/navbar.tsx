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
  { label: "ПРЕИМУЩЕСТВА", href: "#features" },
  { label: "ТАРИФЫ", href: "#pricing" },
  { label: "КАК ЭТО РАБОТАЕТ", href: "#process" },
  { label: "КОНТАКТЫ", href: "#cta" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, user, logout, isLoading } = useAuth()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-sm tracking-[0.2em] uppercase text-foreground">
              SMIP
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full px-4 text-xs tracking-[0.1em] uppercase"
                      asChild
                    >
                      <Link href="/dashboard">Дашборд</Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full hover:bg-secondary/50 transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs text-foreground">
                            {user?.username || "Пользователь"}
                          </span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-card border-border text-foreground"
                      >
                        <DropdownMenuItem asChild className="text-xs">
                          <Link href="/dashboard/settings">
                            <User className="w-4 h-4 mr-2" />
                            Настройки
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          className="text-xs text-destructive cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Выйти
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="rounded-full px-6 text-xs tracking-[0.1em] uppercase"
                    asChild
                  >
                    <Link href="/login">Войти</Link>
                  </Button>
                )}
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground text-sm tracking-[0.15em] uppercase hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-2 py-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm text-foreground">
                          {user?.username || "Пользователь"}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs tracking-[0.1em] uppercase"
                        asChild
                      >
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                          Дашборд
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full text-xs tracking-[0.1em] uppercase"
                        asChild
                      >
                        <Link href="/dashboard/profile" onClick={() => setMobileOpen(false)}>
                          Профиль
                        </Link>
                      </Button>
                      <Button
                        variant="destructive"
                        className="rounded-full text-xs tracking-[0.1em] uppercase"
                        onClick={() => {
                          handleLogout()
                          setMobileOpen(false)
                        }}
                      >
                        Выйти
                      </Button>
                    </>
                  ) : (
                    <Button className="rounded-full text-xs tracking-[0.1em] uppercase" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        Войти
                      </Link>
                    </Button>
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
