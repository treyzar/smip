"use client"

import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei"
import { Suspense } from "react"

function OrganicSphere({
  position,
  scale,
  color = "#00d9a5",
  distort = 0.4,
  speed = 2,
  opacity = 0.5,
}: {
  position: [number, number, number]
  scale: number
  color?: string
  distort?: number
  speed?: number
  opacity?: number
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          distort={distort}
          speed={speed}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  )
}

function SoftTorus({
  position,
  scale,
  rotation = [Math.PI / 4, 0, 0],
}: {
  position: [number, number, number]
  scale: number
  rotation?: [number, number, number]
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh position={position} scale={scale} rotation={rotation}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <MeshDistortMaterial
          color="#00ffb3"
          roughness={0.2}
          metalness={0.85}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

function SoftBlob({
  position,
  scale,
  color = "#5eead4",
}: {
  position: [number, number, number]
  scale: number
  color?: string
}) {
  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          distort={0.5}
          speed={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#00d9a5" />
      <pointLight position={[8, -3, 2]} intensity={0.3} color="#00ffb3" />

      {/* Main hero sphere - top right */}
      <OrganicSphere position={[5, 3, -2]} scale={1.8} color="#00d9a5" distort={0.35} opacity={0.55} />

      {/* Soft torus - left mid */}
      <SoftTorus position={[-6, -2, -4]} scale={1.3} rotation={[0.8, 0.3, 0]} />

      {/* Large background blob */}
      <SoftBlob position={[0, -6, -8]} scale={3} color="#2dd4bf" />

      {/* Small accent sphere - top left */}
      <OrganicSphere position={[-4, 5, -5]} scale={0.7} color="#5eead4" distort={0.5} speed={3} opacity={0.4} />

      {/* Medium sphere - bottom right */}
      <OrganicSphere position={[7, -5, -3]} scale={1.2} color="#00ffb3" distort={0.3} speed={1.5} opacity={0.35} />

      {/* Far background torus */}
      <SoftTorus position={[-3, -8, -10]} scale={2} rotation={[1, 0.5, 0.3]} />

      {/* Tiny accent */}
      <OrganicSphere position={[3, 6, -6]} scale={0.5} color="#99f6e4" distort={0.6} speed={4} opacity={0.3} />
    </>
  )
}

export function Floating3DObjects() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
