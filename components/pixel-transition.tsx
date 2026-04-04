"use client"

import { useState, useRef, useCallback, useEffect } from "react"

interface PixelTransitionProps {
  firstContent: React.ReactNode
  secondContent: React.ReactNode
  gridSize?: number
  pixelColor?: string
  animationStepDuration?: number
  className?: string
  style?: React.CSSProperties
}

export function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 8,
  pixelColor = "#00e5b0",
  animationStepDuration = 0.3,
  className = "",
  style,
}: PixelTransitionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showSecond, setShowSecond] = useState(false)
  const [pixels, setPixels] = useState<{ row: number; col: number; delay: number }[]>([])
  const [animating, setAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimeouts = useCallback(() => {
    timeoutRef.current.forEach(clearTimeout)
    timeoutRef.current = []
  }, [])

  const generatePixelOrder = useCallback(() => {
    const allPixels: { row: number; col: number; delay: number }[] = []
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        allPixels.push({ row: r, col: c, delay: 0 })
      }
    }
    for (let i = allPixels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[allPixels[i], allPixels[j]] = [allPixels[j], allPixels[i]]
    }
    return allPixels.map((p, i) => ({ ...p, delay: i }))
  }, [gridSize])

  const startTransition = useCallback((toSecond: boolean) => {
    clearTimeouts()
    setAnimating(true)
    const ordered = generatePixelOrder()
    setPixels(ordered)

    const totalPixels = gridSize * gridSize
    const perPixelDuration = (animationStepDuration * 1000) / totalPixels

    const midTimeout = setTimeout(() => {
      setShowSecond(toSecond)
    }, (totalPixels * perPixelDuration) / 2)
    timeoutRef.current.push(midTimeout)

    const endTimeout = setTimeout(() => {
      setPixels([])
      setAnimating(false)
    }, totalPixels * perPixelDuration + 100)
    timeoutRef.current.push(endTimeout)
  }, [clearTimeouts, generatePixelOrder, gridSize, animationStepDuration])

  const handleEnter = useCallback(() => {
    setIsHovered(true)
    if (!animating) startTransition(true)
  }, [animating, startTransition])

  const handleLeave = useCallback(() => {
    setIsHovered(false)
    if (!animating) startTransition(false)
  }, [animating, startTransition])

  useEffect(() => {
    if (!animating) {
      if (isHovered && !showSecond) startTransition(true)
      else if (!isHovered && showSecond) startTransition(false)
    }
  }, [animating, isHovered, showSecond, startTransition])

  useEffect(() => clearTimeouts, [clearTimeouts])

  const totalPixels = gridSize * gridSize
  const perPixelDuration = (animationStepDuration * 1000) / totalPixels
  const cellSize = 100 / gridSize

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Content layers */}
      <div className="absolute inset-0" style={{ opacity: showSecond ? 0 : 1, transition: "opacity 0ms" }}>
        {firstContent}
      </div>
      <div className="absolute inset-0" style={{ opacity: showSecond ? 1 : 0, transition: "opacity 0ms" }}>
        {secondContent}
      </div>

      {/* Pixel overlay */}
      {pixels.length > 0 && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {pixels.map((pixel) => (
            <div
              key={`${pixel.row}-${pixel.col}`}
              style={{
                position: "absolute",
                left: `${pixel.col * cellSize}%`,
                top: `${pixel.row * cellSize}%`,
                width: `${cellSize + 0.5}%`,
                height: `${cellSize + 0.5}%`,
                backgroundColor: pixelColor,
                animation: `pixelFade ${perPixelDuration * 3}ms ease-in-out ${pixel.delay * perPixelDuration}ms both`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes pixelFade {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </div>
  )
}
