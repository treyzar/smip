"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Table2,
  BarChart3,
  Settings,
  User,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Brain,
  Link2,
  Rocket,
  Shield,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ─── Quick-start steps ─── */
const quickStartSteps = [
  {
    number: "01",
    title: "Зарегистрируйтесь",
    description:
      "Создайте аккаунт на платформе SMIP, используя email и пароль. После регистрации вы сразу попадёте в личный кабинет.",
    link: { label: "Регистрация", href: "/register" },
  },
  {
    number: "02",
    title: "Подключите Google Sheets",
    description:
      "Перейдите в раздел Настройки и добавьте URL вашей Google-таблицы. Именно в ней будут храниться и обновляться данные парсинга блогеров.",
    link: { label: "Настройки", href: "/dashboard/settings" },
  },
  {
    number: "03",
    title: "Запустите парсинг",
    description:
      "Откройте раздел Парсинг -- встроенная таблица покажет данные в реальном времени. Используйте полноэкранный режим для удобной работы.",
    link: { label: "Парсинг", href: "/dashboard/parsing" },
  },
  {
    number: "04",
    title: "Подключите DataLens",
    description:
      "Для визуализации данных настройте Yandex DataLens: создайте дашборд, получите ссылку для встраивания и добавьте её в Настройки.",
    link: { label: "Дашборд", href: "/dashboard/analytics" },
  },
]

/* ─── Sections of the dashboard ─── */
const sections = [
  {
    icon: Table2,
    title: "Парсинг",
    href: "/dashboard/parsing",
    description:
      "Основной рабочий инструмент. Здесь отображается встроенная Google-таблица с данными блогеров. Вы можете:",
    features: [
      "Просматривать и редактировать данные в реальном времени",
      "Переключаться в полноэкранный режим для удобства",
      "Открывать таблицу напрямую в Google Sheets",
    ],
  },
  {
    icon: BarChart3,
    title: "Дашборд (Аналитика)",
    href: "/dashboard/analytics",
    description:
      "Визуализация данных через Yandex DataLens. После подключения вы получите:",
    features: [
      "Интерактивные графики и диаграммы",
      "Метрики вовлечённости, охвата и роста аудитории",
      "Автоматическую синхронизацию с данными парсинга",
    ],
  },
  {
    icon: User,
    title: "Профиль",
    href: "/dashboard/profile",
    description:
      "Управление вашей учётной записью. В профиле доступно:",
    features: [
      "Изменение имени, фамилии и аватара",
      "Обновление email-адреса",
      "Смена пароля с индикатором надёжности",
    ],
  },
  {
    icon: Settings,
    title: "Настройки",
    href: "/dashboard/settings",
    description:
      "Центр управления подключениями и конфигурацией сервиса:",
    features: [
      "Подключение Google Sheets API для парсинга",
      "Подключение Yandex DataLens для аналитики",
      "Настройка Telegram Bot API для уведомлений",
    ],
  },
]

/* ─── Key features ─── */
const keyFeatures = [
  {
    icon: Zap,
    title: "Автоматический парсинг",
    description:
      "Сбор данных блогеров из социальных сетей с автоматическим обновлением базы в Google-таблице.",
  },
  {
    icon: BarChart3,
    title: "Детальная аналитика",
    description:
      "Глубокие инсайты по вовлечённости, аудитории и росту каждого блогера через DataLens.",
  },
  {
    icon: Brain,
    title: "AI-генерация контента",
    description:
      "Создание уникальных текстов, хештегов и стратегий публикаций на основе анализа трендов.",
  },
  {
    icon: Link2,
    title: "Интеграции",
    description:
      "Бесшовная связь с Google Sheets, Yandex DataLens и Telegram для автоматизации работы.",
  },
]

/* ─── FAQ ─── */
const faqItems = [
  {
    q: "Как подключить Google-таблицу?",
    a: "Перейдите в Настройки, найдите секцию 'Статус подключений' и нажмите 'Подключить' напротив Google Sheets API. Вам нужно будет создать сервисный аккаунт в Google Cloud Console и предоставить доступ к нужной таблице.",
  },
  {
    q: "Что делать, если данные не обновляются?",
    a: "Проверьте статус подключения на странице Настройки. Если статус показывает 'Подключено', попробуйте нажать 'Обновить'. Убедитесь, что у сервисного аккаунта есть доступ к таблице.",
  },
  {
    q: "Как настроить дашборд DataLens?",
    a: "Создайте дашборд в Yandex DataLens (datalens.yandex.cloud), настройте подключение к вашему источнику данных, затем получите публичную ссылку для встраивания. Добавьте эту ссылку в Настройках платформы.",
  },
  {
    q: "Какие ограничения у бесплатного плана?",
    a: "Бесплатный план включает 1 парсинг в день. Стандартный план снимает ограничения на количество парсингов. Премиум-план добавляет приоритетную очередь и дополнительные возможности.",
  },
  {
    q: "Как изменить данные профиля?",
    a: "Перейдите в раздел Профиль через боковое меню или выпадающее меню пользователя в правом верхнем углу. Там можно обновить личные данные и сменить пароль.",
  },
]

/* ─── Component ─── */
export default function GuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const progress = Math.round((completedSteps.size / quickStartSteps.length) * 100)

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* Hero banner */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] tracking-[0.15em] uppercase">
              Руководство
            </Badge>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-[0.02em] text-foreground mb-3 text-balance">
            Добро пожаловать в SMIP
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-2xl">
            Это краткое руководство поможет вам быстро разобраться в платформе. Следуйте шагам
            ниже или изучите описания разделов, чтобы начать работу с аналитикой социальных сетей.
          </p>
        </div>
      </section>

      {/* Quick start with progress */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
              Быстрый старт
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Отмечайте шаги по мере выполнения
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground font-mono">{progress}%</span>
            <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {quickStartSteps.map((step, index) => {
            const done = completedSteps.has(index)
            return (
              <div
                key={step.number}
                className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  done
                    ? "border-primary/20 bg-primary/[0.03]"
                    : "border-border bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                {/* Step toggle */}
                <button
                  onClick={() => toggleStep(index)}
                  className="flex-shrink-0 mt-0.5"
                  aria-label={done ? `Отменить шаг ${step.number}` : `Выполнить шаг ${step.number}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      done
                        ? "bg-primary/10 border border-primary/40"
                        : "bg-secondary border border-border hover:border-primary/30"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    ) : (
                      <span className="text-xs text-muted-foreground font-mono font-bold">
                        {step.number}
                      </span>
                    )}
                  </div>
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-sm font-bold uppercase tracking-[0.05em] mb-1 transition-colors ${
                      done ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <Link
                    href={step.link.href}
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    {step.link.label}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section descriptions */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-2">
          Разделы платформы
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          Подробное описание каждого раздела и его возможностей
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group rounded-xl border border-border bg-secondary/20 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold uppercase tracking-[0.05em] text-foreground">
                    {section.title}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0" />
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {section.description}
              </p>

              <ul className="flex flex-col gap-1.5">
                {section.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground/80">
                    <CheckCircle2 className="w-3 h-3 text-primary/50 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* Key features overview */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Ключевые возможности
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {keyFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 p-4 rounded-xl border border-border bg-secondary/20"
            >
              <div className="w-10 h-10 rounded-lg border border-primary/20 bg-primary/5 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-[0.05em] text-foreground mb-1">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Часто задаваемые вопросы
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm text-foreground font-medium pr-4">{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="rounded-2xl border border-primary/20 bg-primary/[0.03] backdrop-blur-sm p-6 lg:p-8 text-center">
        <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-2">
          Нужна помощь?
        </h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          Если у вас остались вопросы, загляните в настройки или свяжитесь с нашей командой поддержки.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase border-border bg-transparent text-foreground hover:bg-secondary gap-2"
            asChild
          >
            <Link href="/dashboard/settings">
              <Settings className="w-3.5 h-3.5" />
              Настройки
            </Link>
          </Button>
          <Button
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase gap-2"
            asChild
          >
            <a href="mailto:support@smip.ru">
              <ExternalLink className="w-3.5 h-3.5" />
              Написать в поддержку
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
