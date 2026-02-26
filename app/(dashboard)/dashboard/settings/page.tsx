"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Save, RefreshCw, CheckCircle2, XCircle, HelpCircle, ChevronRight, Link2 } from "lucide-react"

const connections = [
  {
    name: "Google Sheets API",
    description: "Подключение к парсинг-таблице",
    connected: true,
  },
  {
    name: "Yandex DataLens",
    description: "Визуализация аналитики",
    connected: false,
  }
]

const faqItems = [
  {
    q: "Как подключить Google Sheets?",
    a: "Перейдите в Google Cloud Console, создайте сервисный аккаунт и предоставьте доступ к таблице. Вставьте URL таблицы в поле выше.",
  },
  {
    q: "Как настроить DataLens?",
    a: "Создайте дашборд в Yandex DataLens, получите публичную ссылку для встраивания и добавьте её в настройках подключения.",
  },
  {
    q: "Какие лимиты на парсинг?",
    a: "Бесплатный план: 1 парсинг/день. Стандарт: безлимитный. Премиум: безлимитный + приоритетная очередь.",
  },
]

export default function SettingsPage() {
  const [email, setEmail] = useState("user@example.com")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [sheetUrl, setSheetUrl] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("smip_google_sheet_url")
    if (stored) setSheetUrl(stored)
  }, [])

  const handleSaveSheetUrl = () => {
    localStorage.setItem("smip_google_sheet_url", sheetUrl)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    // Dispatch a storage event so other tabs/components pick it up
    window.dispatchEvent(new Event("storage"))
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">

      {/* Google Sheets URL */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Link2 className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Google Таблица
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Вставьте URL вашей Google Таблицы. Она будет отображаться на странице парсинга. Убедитесь, что таблица доступна по ссылке (Файл &rarr; Поделиться &rarr; Все, у кого есть ссылка).
        </p>
        <div className="flex flex-col gap-3">
          <Label htmlFor="sheet-url" className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
            URL таблицы
          </Label>
          <div className="flex gap-2">
            <Input
              id="sheet-url"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="flex-1 bg-secondary/30 border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSaveSheetUrl}
              size="sm"
              className="rounded-lg text-xs tracking-[0.05em] uppercase gap-2 min-w-[120px]"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Сохранено
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  Сохранить
                </>
              )}
            </Button>
          </div>
          {sheetUrl && (
            <p className="text-xs text-muted-foreground">
              Таблица будет встроена на странице &laquo;Парсинг&raquo;
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-6">
          Статус подключений
        </h2>
        <div className="flex flex-col gap-3">
          {connections.map((conn) => (
            <div
              key={conn.name}
              className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    conn.connected
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-muted border border-border"
                  }`}
                >
                  {conn.connected ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <XCircle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{conn.name}</p>
                  <p className="text-xs text-muted-foreground">{conn.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={conn.connected ? "default" : "secondary"}
                  className={`text-[10px] tracking-[0.1em] uppercase ${
                    conn.connected
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {conn.connected ? "Подключено" : "Не подключено"}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg text-xs border-border bg-transparent text-foreground hover:bg-secondary gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  {conn.connected ? "Обновить" : "Подключить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Support */}
      <section className="rounded-2xl border border-border bg-card/30 backdrop-blur-sm p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold uppercase tracking-[0.1em] text-foreground">
            Поддержка / FAQ
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
                className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm text-foreground font-medium">
                  {item.q}
                </span>
                <ChevronRight
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    expandedFaq === index ? "rotate-90" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
