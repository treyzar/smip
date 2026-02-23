"use client"

import { useState } from "react"
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ParsingPage() {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div className={`flex flex-col ${fullscreen ? "fixed inset-0 z-50 bg-background p-4" : "h-[calc(100vh-7rem)]"}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-[0.05em] text-foreground">
            Google Таблица
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Данные парсинга блогеров в реальном времени
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs tracking-[0.05em] uppercase border-border bg-transparent text-foreground hover:bg-secondary rounded-lg gap-2"
            onClick={() =>
              window.open(
                "https://docs.google.com/spreadsheets",
                "_blank",
              )
            }
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Открыть в Google
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-border bg-transparent text-foreground hover:bg-secondary rounded-lg"
            onClick={() => setFullscreen(!fullscreen)}
            aria-label={fullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим"}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Google Sheets iframe container */}
      <div className="flex-1 rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden relative">
        {/* Placeholder when no sheet URL is configured */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="3" y1="15" x2="21" y2="15" />
              <line x1="9" y1="3" x2="9" y2="21" />
              <line x1="15" y1="3" x2="15" y2="21" />
            </svg>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-[0.05em] text-foreground mb-2">
            GOOGLE SHEETS
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
            Вставьте URL вашей Google Таблицы в настройках, чтобы встроить её здесь.
            Таблица будет занимать всё доступное пространство с возможностью прокрутки.
          </p>
          <Button
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase"
            asChild
          >
            <a href="/dashboard/settings">Настроить подключение</a>
          </Button>
        </div>

        {/* Uncomment and set src to embed a real Google Sheet:
        <iframe
          src="YOUR_GOOGLE_SHEET_EMBED_URL"
          className="w-full h-full border-0"
          title="Google Таблица парсинга"
          loading="lazy"
        /> */}
      </div>
    </div>
  )
}
