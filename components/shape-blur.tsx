"use client"

import { useRef, useEffect, useCallback } from "react"

interface ShapeBlurProps {
  variation?: number
  pixelRatioProp?: number
  shapeSize?: number
  roundness?: number
  borderSize?: number
  circleSize?: number
  circleEdge?: number
  className?: string
}

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_shapeSize;
  uniform float u_roundness;
  uniform float u_borderSize;
  uniform float u_circleSize;
  uniform float u_circleEdge;
  uniform int u_variation;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  float sdCircle(vec2 p, float r) {
    return length(p) - r;
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);

    float t = u_time * 0.3;
    vec2 offset1 = vec2(sin(t * 0.7) * 0.3, cos(t * 0.5) * 0.25);
    vec2 offset2 = vec2(cos(t * 0.6) * 0.35, sin(t * 0.8) * 0.2);
    vec2 offset3 = vec2(sin(t * 0.4 + 1.0) * 0.25, cos(t * 0.9) * 0.3);

    float shape;
    if (u_variation == 0) {
      float d1 = sdRoundedBox(uv - offset1, vec2(u_shapeSize * 0.6), u_roundness * 0.5);
      float d2 = sdCircle(uv - offset2, u_circleSize);
      float d3 = sdRoundedBox(uv - offset3, vec2(u_shapeSize * 0.4, u_shapeSize * 0.7), u_roundness * 0.3);
      shape = min(min(d1, d2), d3);
    } else if (u_variation == 1) {
      float d1 = sdCircle(uv - offset1, u_circleSize * 1.2);
      float d2 = sdCircle(uv - offset2, u_circleSize * 0.8);
      float d3 = sdCircle(uv - offset3, u_circleSize * 1.0);
      shape = min(min(d1, d2), d3);
    } else {
      float d1 = sdRoundedBox(uv - offset1, vec2(u_shapeSize * 0.5, u_shapeSize * 0.8), u_roundness * 0.6);
      float d2 = sdRoundedBox(uv - offset2 * 0.8, vec2(u_shapeSize * 0.7, u_shapeSize * 0.3), u_roundness * 0.4);
      shape = min(d1, d2);
    }

    float border = smoothstep(-u_borderSize, u_borderSize, shape);
    float inner = 1.0 - smoothstep(-u_circleEdge * 0.1, u_circleEdge * 0.4, shape);

    vec3 col1 = vec3(0.0, 0.898, 0.69);
    vec3 col2 = vec3(0.0, 0.75, 0.85);
    vec3 col3 = vec3(0.15, 0.95, 0.7);

    vec3 shapeColor = mix(col1, col2, sin(t * 0.5) * 0.5 + 0.5);
    shapeColor = mix(shapeColor, col3, inner * 0.3);

    float alpha = (1.0 - border) * 0.35 + inner * 0.15;
    alpha *= 0.6;

    gl_FragColor = vec4(shapeColor * alpha, alpha);
  }
`

export function ShapeBlur({
  variation = 0,
  pixelRatioProp,
  shapeSize = 1,
  roundness = 0.5,
  borderSize = 0.05,
  circleSize = 0.25,
  circleEdge = 1,
  className = "",
}: ShapeBlurProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const startTime = useRef(Date.now())

  const initGL = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return false

    const dpr = pixelRatioProp ?? (typeof window !== "undefined" ? window.devicePixelRatio : 1)
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false })
    if (!gl) return false
    glRef.current = gl

    const vs = gl.createShader(gl.VERTEX_SHADER)!
    gl.shaderSource(vs, VERTEX_SHADER)
    gl.compileShader(vs)

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!
    gl.shaderSource(fs, FRAGMENT_SHADER)
    gl.compileShader(fs)

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)
    programRef.current = program

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const pos = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    return true
  }, [pixelRatioProp])

  const render = useCallback(() => {
    const gl = glRef.current
    const program = programRef.current
    const canvas = canvasRef.current
    if (!gl || !program || !canvas) return

    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    const t = (Date.now() - startTime.current) / 1000

    gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), canvas.width, canvas.height)
    gl.uniform1f(gl.getUniformLocation(program, "u_time"), t)
    gl.uniform1f(gl.getUniformLocation(program, "u_shapeSize"), shapeSize)
    gl.uniform1f(gl.getUniformLocation(program, "u_roundness"), roundness)
    gl.uniform1f(gl.getUniformLocation(program, "u_borderSize"), borderSize)
    gl.uniform1f(gl.getUniformLocation(program, "u_circleSize"), circleSize)
    gl.uniform1f(gl.getUniformLocation(program, "u_circleEdge"), circleEdge)
    gl.uniform1i(gl.getUniformLocation(program, "u_variation"), variation)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    animRef.current = requestAnimationFrame(render)
  }, [shapeSize, roundness, borderSize, circleSize, circleEdge, variation])

  useEffect(() => {
    if (initGL()) {
      animRef.current = requestAnimationFrame(render)
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [initGL, render])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const observer = new ResizeObserver(() => {
      const dpr = pixelRatioProp ?? window.devicePixelRatio
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [pixelRatioProp])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ filter: "blur(60px)" }}
    />
  )
}
