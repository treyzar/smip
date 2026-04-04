"use client"

import { motion } from "framer-motion"
import { BarChart3, ExternalLink, Maximize2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function DatalensDemoSection() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <section id="live-demo" className="px-6 py-24 lg:px-8 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
            <BarChart3 className="w-4 h-4" />
            Live Demo
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-[-0.02em] text-foreground mb-6 text-balance">
            Посмотрите как работает
            <span className="text-primary"> аналитика SMIP</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Фильтруйте блогеров, анализируйте рекламу и получайте данные за секунды.
          </p>
        </motion.div>

        {/* Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50 p-4 bg-background' : ''}`}
        >
          {/* Browser Chrome */}
          <div className={`rounded-t-2xl bg-card border border-border p-4 flex items-center gap-3 ${isFullscreen ? 'rounded-t-xl' : ''}`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-muted rounded-lg px-4 py-1.5 text-sm text-foreground/70 flex items-center gap-2">
                <span className="text-primary">●</span>
                datalens.yandex / smip-analytics
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-foreground/60 hover:text-foreground"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
              <a
                href="https://datalens.yandex/d92n82jkmrlmx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Открыть</span>
              </a>
            </div>
          </div>

          {/* Iframe Container */}
          <div className={`rounded-b-2xl border border-t-0 border-border overflow-hidden bg-card ${isFullscreen ? 'rounded-b-xl h-[calc(100vh-8rem)]' : ''}`}>
            <div className={`relative ${isFullscreen ? 'h-full' : 'aspect-[16/9] lg:aspect-[21/9]'}`}>
              {/* Loading State Background */}
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
                  <p className="text-foreground/60 text-sm">Загрузка дашборда...</p>
                </div>
              </div>
              
              {/* DataLens Iframe */}
              <iframe
                src="https://datalens.yandex/d92n82jkmrlmx?_no_controls=1"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                title="SMIP Analytics Dashboard"
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>

          {/* Close Fullscreen */}
          {isFullscreen && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFullscreen(false)}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full"
            >
              Закрыть полноэкранный режим
            </Button>
          )}
        </motion.div>


      </div>
    </section>
  )
}
