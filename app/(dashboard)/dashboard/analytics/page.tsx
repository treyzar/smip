"use client"

import { useState } from "react"
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsPage() {
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div className={`flex flex-col ${fullscreen ? "fixed inset-0 z-50 bg-background p-4" : "h-[calc(100vh-7rem)]"}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold uppercase tracking-[0.05em] text-foreground">
            DataLens Дашборд
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Визуализация данных и аналитика
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs tracking-[0.05em] uppercase border-border bg-transparent text-foreground hover:bg-secondary rounded-lg gap-2"
            onClick={() =>
              window.open("https://datalens.yandex.cloud", "_blank")
            }
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Открыть в DataLens
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

      {/* DataLens iframe container */}
      <div className="flex-1 rounded-2xl border border-border bg-card/30 backdrop-blur-sm overflow-hidden relative">
        {/* Placeholder */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="12" width="4" height="9" rx="1" />
              <rect x="10" y="6" width="4" height="15" rx="1" />
              <rect x="17" y="3" width="4" height="18" rx="1" />
            </svg>
          </div>
          <h3 className="text-lg font-bold uppercase tracking-[0.05em] text-foreground mb-2">
            YANDEX DATALENS
          </h3>
          <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
            Подключите ваш дашборд DataLens в настройках.
            Визуализация будет встроена с полной интерактивностью и адаптивным масштабированием.
          </p>
          <Button
            size="sm"
            className="rounded-lg text-xs tracking-[0.05em] uppercase"
            asChild
          >
            <a href="/dashboard/settings">Настроить подключение</a>
          </Button>
        </div>

        {/* Uncomment and set src to embed a real DataLens dashboard:
        <iframe
          src="YOUR_DATALENS_EMBED_URL"
          className="w-full h-full border-0"
          title="DataLens дашборд"
          loading="lazy"
        /> */}
      </div>
    </div>
  )
}
