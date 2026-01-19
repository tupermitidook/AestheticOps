'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FloatingBubble {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

interface AnimatedBackgroundProps {
  children: React.ReactNode
  className?: string
  intensity?: 'low' | 'medium' | 'high'
  showBubbles?: boolean
}

/**
 * Fondo animado con efecto de burbujas que siguen el mouse
 * Utiliza GSAP para animaciones de alto rendimiento (60fps)
 */
export function AnimatedBackground({
  children,
  className,
  intensity = 'medium',
  showBubbles = true,
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [bubbles, setBubbles] = useState<FloatingBubble[]>([])
  
  // Configuración de intensidad
  const intensityConfig = {
    low: { bubbleCount: 5, blurRadius: 60, moveSpeed: 0.02 },
    medium: { bubbleCount: 8, blurRadius: 80, moveSpeed: 0.03 },
    high: { bubbleCount: 12, blurRadius: 100, moveSpeed: 0.04 },
  }
  
  const config = intensityConfig[intensity]
  
  // Colores para las burbujas
  const bubbleColors = [
    'rgba(56, 189, 248, 0.4)',  // Sky blue
    'rgba(139, 92, 246, 0.4)',  // Violet
    'rgba(244, 63, 94, 0.3)',   // Rose
    'rgba(99, 102, 241, 0.35)', // Indigo
    'rgba(20, 184, 166, 0.35)', // Teal
    'rgba(251, 146, 60, 0.3)',  // Orange
  ]

  // Generar burbujas iniciales
  useEffect(() => {
    const newBubbles: FloatingBubble[] = Array.from({ length: config.bubbleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 60,
      color: bubbleColors[i % bubbleColors.length],
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
    setBubbles(newBubbles)
  }, [config.bubbleCount, config.moveSpeed])

  // Tracking del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animación de las burbujas
  useEffect(() => {
    if (!showBubbles || !containerRef.current) return

    const animateBubbles = () => {
      setBubbles(prevBubbles =>
        prevBubbles.map(bubble => ({
          ...bubble,
          x: bubble.x + Math.sin(Date.now() * 0.001 * config.moveSpeed + bubble.delay) * 0.5,
          y: bubble.y + Math.cos(Date.now() * 0.001 * config.moveSpeed + bubble.delay) * 0.3,
        }))
      )
    }

    const animationId = setInterval(animateBubbles, 50)
    return () => clearInterval(animationId)
  }, [showBubbles, config.moveSpeed])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative min-h-screen overflow-hidden',
        className
      )}
    >
      {/* Capa de gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      
      {/* Mesh gradient animado */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float-bubble" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-float-bubble-delayed" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-float-bubble" style={{ animationDelay: '-1s' }} />
        <div className="absolute bottom-full right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulseGlow" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulseGlow" style={{ animationDelay: '-2s' }} />
      </div>

      {/* Burbujas interactivas que siguen el mouse */}
      {showBubbles && bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full pointer-events-none blur-2xl"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            background: bubble.color,
            filter: `blur(${config.blurRadius}px)`,
          }}
          animate={{
            x: (mouseRef.current.x - 50) * 0.1 * (bubble.id % 3 + 1),
            y: (mouseRef.current.y - 50) * 0.1 * (bubble.id % 3 + 1),
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
          }}
        />
      ))}

      {/* Capa de contenido con backdrop para legibilidad */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Overlay de ruido para textura (opcional, sutil) */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-20 mix-blend-overlay" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256" xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
           }} 
      />
    </div>
  )
}

/**
 * Componente simplificado de background para secciones internas
 */
export function SectionBackground({ 
  children, 
  className,
  variant = 'default'
}: { 
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'dark' | 'glass'
}) {
  const variantStyles = {
    default: 'bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-slate-900/50',
    dark: 'bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900',
    glass: 'bg-slate-900/30 backdrop-blur-3xl',
  }

  return (
    <div className={cn('relative', variantStyles[variant], className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      {children}
    </div>
  )
}
