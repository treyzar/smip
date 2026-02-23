"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl border border-primary/30 bg-primary/5 flex items-center justify-center mx-auto mb-6">
          <Send className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-foreground mb-3">
          ПИСЬМО ОТПРАВЛЕНО
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          Мы отправили инструкции по восстановлению пароля на{" "}
          <span className="text-foreground">{email}</span>. Проверьте входящие.
        </p>
        <Button
          variant="outline"
          className="rounded-xl h-12 px-8 text-xs tracking-[0.1em] uppercase border-border bg-transparent text-foreground hover:bg-secondary"
          asChild
        >
          <Link href="/login">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к входу
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-bold uppercase tracking-[-0.02em] text-foreground mb-2">
          ВОССТАНОВЛЕНИЕ
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Введите email, привязанный к вашему аккаунту
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
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

        <Button
          type="submit"
          className="w-full h-12 rounded-xl text-sm font-semibold uppercase tracking-[0.1em] group mt-2"
        >
          Отправить инструкции
          <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Вспомнили пароль?{" "}
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
