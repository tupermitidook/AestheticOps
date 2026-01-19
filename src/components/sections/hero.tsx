'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ShimmerButton } from '@/components/ui/button'

/**
 * Sección Hero principal con diseño premium
 * Incluye título con gradiente, subtítulo magnético y CTA con shimmer
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 shadow-lg mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            🚀 Nueva versión 3.0 disponible
          </span>
        </motion.div>

        {/* Título principal con gradiente animado */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6"
        >
          El{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-gradient">
              Sistema Operativo
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-rose-500/20 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </span>
          <br />
          para la Medicina Estética Moderna
        </motion.h1>

        {/* Subtítulo magnético */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Transforma tu clínica en una máquina de generar resultados excepcionales. 
          Automatiza citas, fideliza pacientes y haz crecer tu negocio con{' '}
          <MagneticText>inteligencia artificial</MagneticText> aplicada.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <ShimmerButton size="xl" className="group">
            Iniciar prueba gratuita
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </ShimmerButton>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 text-lg font-medium rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Ver demostración
          </motion.button>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Texto magnético que reacciona al cursor
 */
function MagneticText({ children }: { children: React.ReactNode }) {
  const textRef = React.useRef<HTMLSpanElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouse = (e: React.MouseEvent) => {
    if (!textRef.current) return
    const rect = textRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * 0.1
    const y = (e.clientY - centerY) * 0.1
    setPosition({ x, y })
  }

  return (
    <span
      ref={textRef}
      className="relative inline-block cursor-default"
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setPosition({ x: 0, y: 0 })
      }}
    >
      <motion.span
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        className={cn(
          'bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500 bg-clip-text text-transparent',
          isHovered && 'bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500'
        )}
      >
        {children}
      </motion.span>
    </span>
  )
}

/**
 * Logos de empresas (Social Proof) en carrusel infinito
 */
export function LogoCarousel() {
  const logos = [
    { name: 'Clínica Madrid', icon: '🏥' },
    { name: 'Beauty Group', icon: '✨' },
    { name: 'Dermcare', icon: '🔬' },
    { name: 'Estética Plus', icon: '💫' },
    { name: 'MediSpa Luxury', icon: '🧴' },
    { name: 'Aesthetic Center', icon: '🎀' },
    { name: 'Wellness Clinic', icon: '🌿' },
    { name: 'Skin Experts', icon: '👩‍⚕️' },
  ]

  // Duplicar logos para efecto infinito
  const extendedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-12 border-y border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          Confiado por más de 500 clínicas líderes en España y Latinoamérica
        </motion.p>
        
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center justify-center"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {extendedLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 whitespace-nowrap text-muted-foreground/60 hover:text-muted-foreground/100 transition-colors"
              >
                <span className="text-2xl">{logo.icon}</span>
                <span className="font-medium">{logo.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
