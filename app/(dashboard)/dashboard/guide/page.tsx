"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  FileSpreadsheet,
  HelpCircle,
  Link2,
  Rocket,
  Settings,
  Table2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/* ─── Template URL (replace with real Google Sheets /copy link) ─── */
const TEMPLATE_URL =
  "https://docs.google.com/spreadsheets/d/ВАША_ССЫЛКА_НА_ШАБЛОН/copy"

/* ─── localStorage keys ─── */
const LS_TEMPLATE_COPIED = "smip_template_copied"
const LS_SHEET_URL = "smip_google_sheet_url"
const LS_PARSING_VISITED = "smip_parsing_visited"

/* ─── Quick-start steps ─── */
const quickStartSteps = [
  {
    number: "01",
    title: "Скопируйте шаблон таблицы",
    description:
      "Нажмите кнопку ниже -- Google автоматически создаст копию готового шаблона в вашем аккаунте. Таблица уже содержит нужные столбцы и формат данных.",
    link: {
      label: "Скопировать шаблон",
      href: TEMPLATE_URL,
      external: true,
    },
  },
  {
    number: "02",
    title: "Вставьте URL таблицы в Профиль",
    description:
      "Откройте вашу копию таблицы, скопируйте URL из адресной строки браузера и вставьте его в разделе Профиль в поле Google Таблица.",
    link: {
      label: "Перейти в Профиль",
      href: "/dashboard/profile",
      external: false,
    },
  },
  {
    number: "03",
    title: "Запустите парсинг",
    description:
      "Перейдите в раздел Парсинг -- таблица подгрузится автоматически. Вы можете работать с данными прямо в интерфейсе или открыть таблицу в Google Sheets.",
    link: {
      label: "Открыть Парсинг",
      href: "/dashboard/parsing",
      external: false,
    },
  },
]

/* ─── What's inside the template ─── */
const templateFeatures = [
  "Готовые столбцы: имя, ссылка, подписчики, охват, ER и др.",
  "Форматирование и валидация данных для корректного парсинга",
  "Примеры заполнения для быстрого старта",
]

/* ─── FAQ ─── */
const faqItems = [
  {
    q: "Как скопировать шаблон Google Sheets?",
    a: 'Нажмите кнопку "Скопировать шаблон" в разделе выше. Google откроет диалог создания копии -- нажмите "Создать копию". Таблица появится на вашем Google Диске.',
  },
  {
    q: "Где взять URL моей таблицы?",
    a: "Откройте скопированную таблицу в браузере. URL в адресной строке -- это и есть нужная ссылка. Скопируйте весь адрес (он начинается с docs.google.com/spreadsheets).",
  },
  {
    q: "Можно ли использовать свою таблицу, а не шаблон?",
    a: "Да, но структура столбцов должна совпадать с шаблоном. Рекомендуем начать с шаблона, чтобы избежать ошибок при парсинге.",
  },
  {
    q: "Данные не подгружаются на странице Парсинг?",
    a: "Проверьте, что URL таблицы корректно сохранён в Профиле (раздел Google Таблица), а доступ к таблице открыт (Файл -> Настройки доступа -> Все, у кого есть ссылка).",
  },
  {
    q: "Как часто обновляются данные?",
    a: "Данные обновляются при каждом запуске парсинга. Частота зависит от вашего тарифного плана: бесплатный -- 1 раз в день, Стандарт и Премиум -- без ограничений.",
  },
]

/* ─── Component ─── */
export default function GuidePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
    false,
  ])

  const checkSteps = useCallback(() => {
    const templateCopied =
      localStorage.getItem(LS_TEMPLATE_COPIED) === "true"
    const sheetUrlSet = Boolean(localStorage.getItem(LS_SHEET_URL)?.trim())
    const parsingVisited =
      localStorage.getItem(LS_PARSING_VISITED) === "true"
    setCompletedSteps([templateCopied, sheetUrlSet, parsingVisited])
  }, [])

  useEffect(() => {
    checkSteps()

    const handleStorage = () => checkSteps()
    window.addEventListener("storage", handleStorage)

    // Re-check on focus (user might have done something in another tab or navigated away)
    const handleFocus = () => checkSteps()
    window.addEventListener("focus", handleFocus)

    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("focus", handleFocus)
    }
  }, [checkSteps])

  const handleTemplateCopy = () => {
    localStorage.setItem(LS_TEMPLATE_COPIED, "true")
    window.dispatchEvent(new Event("storage"))
  }

  const doneCount = completedSteps.filter(Boolean).length
  const progress = Math.round(
    (doneCount / quickStartSteps.length) * 100
  )

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-12">
      {/* ── Hero banner ── */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-8 lg:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-[80px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] tracking-[0.15em] uppercase">
              Инструкция
            </Badge>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold uppercase tracking-[0.02em] text-foreground mb-3 text-balance">
            Начните работу за 3 шага
          </h2>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-2xl">
            Скопируйте готовый шаблон таблицы, подключите его к платформе и
            запустите парсинг. Весь процесс занимает пару минут.
          </p>
        </div>
      </section>

      {/* ── Template download card ── */}
      <section className="rounded-2xl border border-primary/20 bg-primary/[0.03] backdrop-blur-sm p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
                Шаблон Google Sheets
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Готовая таблица с правильной структурой данных. Нажмите кнопку --
              Google создаст копию в вашем аккаунте.
            </p>

            <ul className="flex flex-col gap-2 mb-5 lg:mb-0">
              {templateFeatures.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-muted-foreground/80"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0">
            <Button
              size="lg"
              className="rounded-xl text-sm tracking-[0.05em] uppercase gap-2.5 w-full lg:w-auto"
              asChild
            >
              <a
                href={TEMPLATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTemplateCopy}
              >
                <Copy className="w-4 h-4" />
                Скопировать шаблон
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Quick start with progress ── */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
              Быстрый старт
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {progress === 100
                ? "Все шаги выполнены!"
                : "Прогресс обновляется автоматически"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-mono ${
                progress === 100
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {doneCount}/{quickStartSteps.length}
            </span>
            <div className="w-28 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${
                  progress === 100 ? "bg-primary" : "bg-primary/70"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
            {progress === 100 && (
              <CheckCircle2 className="w-4 h-4 text-primary" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {quickStartSteps.map((step, index) => {
            const done = completedSteps[index]
            return (
              <div
                key={step.number}
                className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
                  done
                    ? "border-primary/20 bg-primary/[0.03]"
                    : "border-border bg-secondary/20 hover:bg-secondary/30"
                }`}
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      done
                        ? "bg-primary/10 border border-primary/40"
                        : "bg-secondary border border-border"
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
                </div>

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
                  {step.link.external ? (
                    <a
                      href={step.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleTemplateCopy}
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {step.link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={step.link.href}
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      {step.link.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Как это работает
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: FileSpreadsheet,
              title: "Шаблон",
              description:
                "Вы копируете готовую таблицу с нужной структурой. Данные парсинга записываются именно в неё.",
            },
            {
              icon: Link2,
              title: "Подключение",
              description:
                "Платформа считывает URL вашей таблицы и получает доступ к данным через Google Sheets API.",
            },
            {
              icon: Table2,
              title: "Парсинг",
              description:
                "Собранные данные блогеров автоматически заполняют таблицу. Вы видите результат в реальном времени.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-secondary/20"
            >
              <div className="w-12 h-12 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-[0.05em] text-foreground mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Частые вопросы
          </h3>
        </div>

        <div className="flex flex-col gap-2">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm text-foreground font-medium pr-4">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="rounded-2xl border border-primary/20 bg-primary/[0.03] backdrop-blur-sm p-6 lg:p-8 text-center">
        <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-2">
          Нужна помощь?
        </h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          Если что-то не получается, проверьте настройки подключения или
          напишите нам.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase border-border bg-transparent text-foreground hover:bg-secondary gap-2"
            asChild
          >
            <Link href="/dashboard/profile">
              <Settings className="w-3.5 h-3.5" />
              Профиль
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
