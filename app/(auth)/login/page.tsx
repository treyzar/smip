"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import { useAuth, getReturnUrl } from "@/lib/auth"
import { VALIDATION_CONSTRAINTS } from "@/lib/auth/config"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    console.log('Login Page: Auth state changed', { isAuthenticated, isRedirecting })
    
    if (isAuthenticated && !isRedirecting) {
      setIsRedirecting(true)
      const returnUrl = getReturnUrl(searchParams)
      console.log('Login Page: Redirecting authenticated user to:', returnUrl)
      
      // Use replace to avoid back button issues
      setTimeout(() => {
        router.replace(returnUrl)
      }, 100) // Small delay to ensure state is fully updated
    }
  }, [isAuthenticated, router, searchParams, isRedirecting])

  // Clear errors when user starts typing
  useEffect(() => {
    if (error) {
      clearError()
    }
    setFieldErrors({})
  }, [username, password, clearError, error])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    // Validate username
    if (!username.trim()) {
      errors.username = "Поле обязательно для заполнения"
    } else if (username.length > VALIDATION_CONSTRAINTS.USERNAME_MAX_LENGTH) {
      errors.username = `Максимальная длина ${VALIDATION_CONSTRAINTS.USERNAME_MAX_LENGTH} символов`
    }

    // Validate password
    if (!password.trim()) {
      errors.password = "Поле обязательно для заполнения"
    } else if (password.length > VALIDATION_CONSTRAINTS.PASSWORD_MAX_LENGTH) {
      errors.password = `Максимальная длина ${VALIDATION_CONSTRAINTS.PASSWORD_MAX_LENGTH} символов`
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      console.log('Attempting login...')
      await login({ username: username.trim(), password })
      console.log('Login successful, waiting for redirect...')
      // Navigation will be handled by the useEffect above when isAuthenticated becomes true
    } catch (error) {
      console.error('Login failed:', error)
      // Error is already handled by the Auth Context and displayed via the error state
    }
  }

  // Show loading state during redirect
  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-muted-foreground">Перенаправление...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-foreground mb-2">
          ВХОД
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Введите учётные данные компании для входа в SMIP Panel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="username"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground"
          >
            Логин или Email
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="company@email.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`h-12 rounded-xl bg-secondary border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 ${
              fieldErrors.username ? 'border-destructive focus:border-destructive' : ''
            }`}
            disabled={isLoading}
            maxLength={VALIDATION_CONSTRAINTS.USERNAME_MAX_LENGTH}
          />
          {fieldErrors.username && (
            <span className="text-sm text-destructive">{fieldErrors.username}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground"
          >
            Пароль
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`h-12 rounded-xl bg-secondary border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50 ${
              fieldErrors.password ? 'border-destructive focus:border-destructive' : ''
            }`}
            disabled={isLoading}
            maxLength={VALIDATION_CONSTRAINTS.PASSWORD_MAX_LENGTH}
          />
          {fieldErrors.password && (
            <span className="text-sm text-destructive">{fieldErrors.password}</span>
          )}
        </div>

        {error && (
          <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl text-sm font-semibold uppercase tracking-[0.1em] group mt-2"
        >
          {isLoading ? (
            <>
              <svg
                className="w-4 h-4 mr-2 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Проверка...
            </>
          ) : (
            <>
              Войти
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 pt-8 border-t border-border">
        <p className="text-center text-xs text-muted-foreground tracking-[0.1em] uppercase">
          Нет учётных данных?
        </p>
        <p className="text-center text-sm text-muted-foreground mt-2">
          Обратитесь к менеджеру для получения логина и пароля, либо напишите на{" "}
          <a
            href="mailto:hello@smip.panel"
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            hello@smip.panel
          </a>
        </p>
      </div>
    </div>
  )
}