"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react"
import Image from "next/image"

interface FallingItem {
  id: number
  type: "bone" | "chart" | "metric" | "star"
  x: number
  y: number
  speed: number
  caught: boolean
  rotation: number
  scale: number
}

const GAME_DURATION = 5000
const SPAWN_INTERVAL = 140
const ITEM_TYPES: FallingItem["type"][] = ["bone", "bone", "chart", "metric", "star"]

const itemIcons: Record<FallingItem["type"], string> = {
  bone: "🦴",
  chart: "📊",
  metric: "📈",
  star: "⭐",
}

const itemColors: Record<FallingItem["type"], string> = {
  bone: "from-amber-200/25 to-amber-100/5 border-amber-200/30",
  chart: "from-primary/25 to-primary/5 border-primary/30",
  metric: "from-emerald-500/25 to-emerald-500/5 border-emerald-500/30",
  star: "from-amber-500/25 to-amber-500/5 border-amber-500/30",
}

export function CatchAnalyticsGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "finished">("intro")
  const [items, setItems] = useState<FallingItem[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [catchEffects, setCatchEffects] = useState<{id: number, x: number, y: number, emoji: string}[]>([])
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const itemIdRef = useRef(0)
  const animationFrameRef = useRef<number>()
  const lastUpdateRef = useRef<number>(0)
  const lastSpawnRef = useRef<number>(0)

  const spawnItem = useCallback(() => {
    const newItem: FallingItem = {
      id: itemIdRef.current++,
      type: ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)],
      x: 5 + Math.random() * 85,
      y: -5,
      speed: 20 + Math.random() * 16,
      caught: false,
      rotation: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }
    setItems(prev => [...prev, newItem])
  }, [])

  const catchItem = useCallback((id: number, x: number, y: number, type: FallingItem["type"]) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, caught: true } : item
    ))
    setScore(prev => prev + 1)
    const effectId = Date.now() + Math.random()
    setCatchEffects(prev => [...prev, { id: effectId, x, y, emoji: itemIcons[type] }])
    setTimeout(() => {
      setCatchEffects(prev => prev.filter(e => e.id !== effectId))
    }, 600)
  }, [])

  const gameLoop = useCallback(() => {
    const now = performance.now()
    if (lastUpdateRef.current === 0) {
      lastUpdateRef.current = now
      lastSpawnRef.current = now
    }
    const deltaTime = Math.min((now - lastUpdateRef.current) / 1000, 0.05)
    lastUpdateRef.current = now

    if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
      spawnItem()
      lastSpawnRef.current = now
    }

    setItems(prev => prev
      .map(item => ({
        ...item,
        y: item.y + item.speed * deltaTime,
        rotation: item.rotation + 40 * deltaTime,
      }))
      .filter(item => item.y < 110 && !item.caught)
    )

    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [spawnItem])

  const startGame = useCallback(() => {
    setGameState("playing")
    setScore(0)
    setItems([])
    setTimeLeft(GAME_DURATION)
    itemIdRef.current = 0
    lastUpdateRef.current = 0
    lastSpawnRef.current = 0
    animationFrameRef.current = requestAnimationFrame(gameLoop)
  }, [gameLoop])

  const resetGame = useCallback(() => {
    setGameState("intro")
    setScore(0)
    setItems([])
    setTimeLeft(GAME_DURATION)
  }, [])

  useEffect(() => {
    if (gameState !== "playing") return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          setGameState("finished")
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
          return 0
        }
        return prev - 100
      })
    }, 100)
    return () => clearInterval(timer)
  }, [gameState])

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const getResultMessage = () => {
    if (score >= 25) return { emoji: "🎉", title: "Легенда!", sub: "Невероятный результат" }
    if (score >= 20) return { emoji: "🔥", title: "Отлично!", sub: "Впечатляющая скорость" }
    if (score >= 10) return { emoji: "💪", title: "Хорошо!", sub: "Неплохая попытка" }
    return { emoji: "😅", title: "Непросто, да?", sub: "Вот зачем нужна автоматизация" }
  }

  return (
    <section id="game" className="px-6 py-20 lg:px-8 lg:py-28 scroll-mt-24">
      <div className="mx-auto max-w-7xl">
        {/* Section header - centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 lg:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-primary text-xs tracking-[0.2em] uppercase mb-4 font-medium">
            <Sparkles className="w-4 h-4" />
            Интерактив
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            Поймай косточку
          </h2>
          <p className="text-foreground/65 text-base lg:text-lg max-w-lg mx-auto mb-2">
            Поймайте кости и метрики за <span className="text-foreground font-medium">5 секунд</span> и
            почувствуйте, как быстро внимание уходит в хаос без автоматизации.
          </p>
          <p className="text-foreground/45 text-sm max-w-md mx-auto">
            Небольшая игра, чтобы лендинг оставался живым, а идея автоматизации читалась быстрее
          </p>
        </motion.div>

        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-5xl mx-auto"
        >
          <div
            ref={gameAreaRef}
            className="relative w-full h-[400px] lg:h-[480px] rounded-2xl border border-border/60 overflow-hidden select-none"
            style={{
              background: "linear-gradient(180deg, rgba(28,36,53,0.95) 0%, rgba(20,26,34,0.98) 100%)",
            }}
          >
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "radial-gradient(circle, rgba(0,229,176,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }} />

            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {/* INTRO */}
              {gameState === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {/* Floating background icons */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          y: [0, -20, 0],
                          scale: [0.85, 1.05, 0.85],
                        }}
                        transition={{
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="absolute text-xl lg:text-2xl"
                        style={{
                          left: `${5 + (i % 6) * 15}%`,
                          top: `${15 + Math.floor(i / 6) * 50}%`,
                        }}
                      >
                        {Object.values(itemIcons)[i % 4]}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center gap-4 mb-8 relative z-10"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20">
                      <Image
                        src="/images/analytics-cat.png"
                        alt="Analytics Cat"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-foreground font-semibold text-lg mb-1">Готов к испытанию?</p>
                      <p className="text-muted-foreground text-sm">Лови кости и метрики за 5 секунд!</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    <Button
                      size="lg"
                      onClick={startGame}
                      className="rounded-full px-10 h-14 text-base font-semibold shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all hover:scale-105 active:scale-95"
                    >
                      Поехали!
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              )}

              {/* PLAYING */}
              {gameState === "playing" && (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0"
                >
                  {/* Timer bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-border/30 z-20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 rounded-r"
                      style={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  {/* HUD */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <motion.div
                      initial={{ x: -16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="px-4 py-2 rounded-full bg-card/90 backdrop-blur-md border border-border/60 shadow-lg flex items-center gap-2"
                    >
                      <span className="text-muted-foreground text-xs">Собрано</span>
                      <motion.span
                        key={score}
                        initial={{ scale: 1.4, color: "#00e5b0" }}
                        animate={{ scale: 1, color: "#00e5b0" }}
                        className="font-bold text-lg text-primary"
                      >
                        {score}
                      </motion.span>
                    </motion.div>
                    <motion.div
                      initial={{ x: 16, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="px-4 py-2 rounded-full bg-card/90 backdrop-blur-md border border-border/60 shadow-lg flex items-center gap-2"
                    >
                      <span className="text-muted-foreground text-xs">Время</span>
                      <span className={`font-bold text-lg tabular-nums ${timeLeft <= 2000 ? "text-red-400" : "text-foreground"}`}>
                        {(timeLeft / 1000).toFixed(1)}с
                      </span>
                    </motion.div>
                  </div>

                  {/* Falling items */}
                  {items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => catchItem(item.id, item.x, item.y, item.type)}
                      className={`absolute w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-b ${itemColors[item.type]} border backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-transform duration-100 touch-manipulation shadow-lg`}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
                        willChange: "transform, top",
                      }}
                    >
                      <span
                        className="text-xl lg:text-2xl select-none pointer-events-none"
                        style={{ transform: `rotate(-${item.rotation}deg)` }}
                      >
                        {itemIcons[item.type]}
                      </span>
                    </button>
                  ))}

                  {/* Catch effects */}
                  {catchEffects.map(effect => (
                    <motion.div
                      key={effect.id}
                      initial={{ scale: 0.5, opacity: 1, y: 0 }}
                      animate={{ scale: 1.5, opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="absolute pointer-events-none z-30 flex flex-col items-center"
                      style={{
                        left: `${effect.x}%`,
                        top: `${effect.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <span className="text-primary font-bold text-sm">+1</span>
                      <div className="w-10 h-10 rounded-full bg-primary/20 blur-md" />
                    </motion.div>
                  ))}

                  {/* Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground/60 text-xs bg-card/50 backdrop-blur-sm px-3 py-1.5 rounded-full z-20"
                  >
                    Кликайте на кости и метрики
                  </motion.div>
                </motion.div>
              )}

              {/* FINISHED */}
              {gameState === "finished" && (
                <motion.div
                  key="finished"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6"
                >
                  {/* Celebration particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: "110%", x: `${Math.random() * 100}%`, opacity: 0 }}
                        animate={{ y: "-10%", opacity: [0, 0.8, 0] }}
                        transition={{ duration: 2.5 + Math.random(), delay: i * 0.12, repeat: Infinity }}
                        className="absolute text-lg"
                      >
                        {Object.values(itemIcons)[i % 4]}
                      </motion.div>
                    ))}
                  </div>

                  {/* Cat avatar with result */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.15 }}
                    className="relative mb-3"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20">
                      <Image
                        src="/images/analytics-cat.png"
                        alt="Analytics Cat"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.span
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="absolute -top-2 -right-2 text-2xl"
                    >
                      {getResultMessage().emoji}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="text-center mb-4"
                  >
                    <p className="text-foreground font-bold text-xl mb-1">{getResultMessage().title}</p>
                    <p className="text-muted-foreground text-sm">{getResultMessage().sub}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.35 }}
                    className="text-center mb-5"
                  >
                    <p className="text-muted-foreground text-sm mb-1">Вы поймали</p>
                    <p className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                      {score}
                    </p>
                    <p className="text-muted-foreground text-sm">костей и метрик за 5 секунд</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-primary/10 border border-primary/25 mb-5 max-w-sm text-center"
                  >
                    <p className="text-foreground font-semibold text-sm mb-1">SMIP делает это автоматически</p>
                    <p className="text-muted-foreground text-xs">Собирает тысячи метрик 24/7 без вашего участия</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button
                      size="lg"
                      className="rounded-full px-8 h-12 text-sm font-semibold shadow-lg shadow-primary/20"
                      asChild
                    >
                      <a href="mailto:hello@smip.panel">
                        Попробовать SMIP
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={resetGame}
                      className="rounded-full px-8 h-12 text-sm font-semibold border-border/60 hover:border-primary/40 hover:bg-primary/5 bg-transparent text-foreground"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Ещё раз
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
