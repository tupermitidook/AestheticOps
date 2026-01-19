'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Navbar, Footer } from '@/components/layout/navbar'
import { HeroSection, LogoCarousel } from '@/components/sections/hero'
import { PricingSection } from '@/components/sections/pricing'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Label } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChevronRight, Sparkles, Shield, Zap, Users, BarChart } from 'lucide-react'

/**
 * Página principal de la plataforma AestheticOps
 * Landing page de alto impacto con secciones de marketing
 */
export default function HomePage() {
  const [showLeadMagnet, setShowLeadMagnet] = React.useState(false)

  // Mostrar popup de lead magnet después de 10 segundos
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLeadMagnet(true)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <AnimatedBackground intensity="high">
        <HeroSection />
      </AnimatedBackground>

      {/* Social Proof */}
      <LogoCarousel />

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/30 to-transparent dark:via-sky-950/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
              Todo lo que tu clínica necesita para{' '}
              <span className="text-gradient">triunfar</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas diseñadas específicamente para centros de estética y clínicas privadas.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard padding="lg" hover={true} className="h-full">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    feature.bgColor
                  )}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500 opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-rose-500/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              ¿Listo para transformar tu clínica?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Únete a más de 500 clínicas que ya están optimizando sus operaciones con AestheticOps.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="shimmer" size="xl">
                Iniciar prueba gratuita de 14 días
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl">
                Agendar demo personalizada
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Sin compromiso. Sin tarjeta de crédito. Cancela cuando quieras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Lead Magnet Popup */}
      <AnimatePresence>
        {showLeadMagnet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLeadMagnet(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500 p-8 text-white text-center">
                <div className="text-4xl mb-4">🎁</div>
                <h3 className="text-2xl font-bold mb-2">
                  ¡Guía Gratuita!
                </h3>
                <p className="opacity-90">
                  Los 10 errores que impiden que tu clínica crezca
                </p>
              </div>

              {/* Contenido */}
              <div className="p-8">
                <ul className="space-y-3 mb-6">
                  {[
                    'Automatiza el 80% de tareas administrativas',
                    'Aumenta la tasa de confirmación de citas',
                    'Crea campañas que fidelizan pacientes',
                    'Reduce cancelaciones y no-shows',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <span className="text-green-500 text-xs">✓</span>
                      </span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <form className="space-y-4" onSubmit={e => {
                  e.preventDefault()
                  toast.success('¡Gracias! Revisa tu email 📧')
                  setShowLeadMagnet(false)
                }}>
                  <div>
                    <Label htmlFor="lead-email">Tu email profesional</Label>
                    <Input
                      id="lead-email"
                      type="email"
                      placeholder="tu@clinica.com"
                      variant="glass"
                      required
                    />
                  </div>
                  <Button type="submit" variant="shimmer" className="w-full">
                    Descargar guía gratis
                  </Button>
                </form>

                <button
                  onClick={() => setShowLeadMagnet(false)}
                  className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
                >
                  No gracias, prefiero perder ventas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Datos de características
const features = [
  {
    icon: '📅',
    title: 'Gestión de Citas Inteligente',
    description: 'Calendario visual con recordatorios automáticos y confirmación por WhatsApp y email.',
    bgColor: 'bg-sky-100 dark:bg-sky-900/30',
  },
  {
    icon: '👥',
    title: 'Historial de Pacientes',
    description: 'Ficha clínica digital completa con fotos, tratamientos realizados y preferencias.',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  {
    icon: '📊',
    title: 'Analíticas Avanzadas',
    description: 'Dashboards con métricas clave para tomar decisiones informadas sobre tu negocio.',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
  },
  {
    icon: '💬',
    title: 'Comunicación Multicanal',
    description: 'Envía promociones, recordatorios y seguimiento a través de WhatsApp, SMS y email.',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  {
    icon: '💳',
    title: 'Pagos y Facturación',
    description: 'Gestión completa de cobros, presupuestos y generación automática de facturas.',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    icon: '🤖',
    title: 'IA Predictiva',
    description: 'Predice tendencias de demanda y sugiere los mejores horarios para tu agenda.',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
]

// Datos de estadísticas
const stats = [
  { value: '500+', label: 'Clínicas activas' },
  { value: '50K+', label: 'Pacientes gestionados' },
  { value: '98%', label: 'Satisfacción' },
  { value: '15M€', label: 'En facturación procesada' },
]
