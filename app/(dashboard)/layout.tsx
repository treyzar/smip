"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Table2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  User,
  BookOpen
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const sidebarItems = [
  { label: "Парсинг", href: "/dashboard/parsing", icon: Table2 },
  { label: "Дашборд", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Инструкция", href: "/dashboard/guide", icon: BookOpen },
  { label: "Профиль", href: "/dashboard/profile", icon: User },
  { label: "Настройки", href: "/dashboard/settings", icon: Settings },
]

const pageTitles: Record<string, string> = {
  "/dashboard/parsing": "Парсинг",
  "/dashboard/analytics": "Дашборд",
  "/dashboard/guide": "Инструкция",
  "/dashboard/profile": "Профиль",
  "/dashboard/settings": "Настройки",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const currentTitle = pageTitles[pathname] || "Личный кабинет"

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:flex flex-col border-r border-border bg-sidebar transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-3 group relative">
              <div className="absolute -inset-2 bg-primary/15 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src="/logo.svg" 
                alt="SMIP Logo" 
                className="h-10 w-auto relative z-10"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="mx-auto group relative block">
              <div className="absolute -inset-2 bg-primary/15 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img 
                src="/logo.svg" 
                alt="SMIP Logo" 
                className="h-10 w-auto relative z-10"
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors ${collapsed ? "hidden" : ""}`}
            aria-label="Свернуть меню"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-sidebar-primary" : ""}`} />
                {!collapsed && (
                  <span className="text-xs tracking-[0.05em] uppercase">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle at bottom (when collapsed) */}
        {collapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <button
              onClick={() => setCollapsed(false)}
              className="w-full flex items-center justify-center py-2 text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
              aria-label="Развернуть меню"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
            aria-label="Закрыть меню"
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3 group relative">
                <div className="absolute -inset-2 bg-primary/15 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src="/logo.svg" 
                  alt="SMIP Logo" 
                  className="h-10 w-auto relative z-10"
                  style={{ imageRendering: 'crisp-edges' }}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-sidebar-foreground/60"
                aria-label="Закрыть меню"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-sidebar-primary" : ""}`} />
                    <span className="text-xs tracking-[0.05em] uppercase">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-foreground"
              onClick={() => setMobileOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-bold uppercase tracking-[0.1em] text-foreground">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs text-foreground hidden sm:block">
                    {user?.username || "Пользователь"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-card border-border text-foreground"
              >
                <DropdownMenuItem asChild className="text-xs cursor-pointer">
                  <Link href="/dashboard/profile">
                    <User className="w-4 h-4 mr-2" />
                    Профиль
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-xs cursor-pointer">
                  <Link href="/dashboard/settings">
                    <Settings className="w-4 h-4 mr-2" />
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
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
