"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-foreground mb-2">
          РЕГИСТРАЦИЯ
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Создайте аккаунт в SMIP Panel
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="email"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
          />
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
            placeholder="Минимум 8 символов"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            htmlFor="confirm-password"
            className="text-xs tracking-[0.1em] uppercase text-muted-foreground"
          >
            Повторите пароль
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 rounded-xl bg-secondary border-border focus:border-primary/50 text-foreground placeholder:text-muted-foreground/50"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
            className="mt-0.5 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
            Я согласен с{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              условиями использования
            </a>{" "}
            и{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              политикой конфиденциальности
            </a>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-sm font-semibold uppercase tracking-[0.1em] group mt-2"
          disabled={!agreed}
        >
          Зарегистрироваться
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Войти
        </Link>
      </p>
    </div>
  )
}
