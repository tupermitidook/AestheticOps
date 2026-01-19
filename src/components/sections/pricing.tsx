'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/card'

/**
 * Sección de precios con toggle mensual/anual y efecto de tarjeta destacada
 */
export function PricingSection() {
  const [isAnnual, setIsAnnual] = React.useState(false)

  const plans = [
    {
      name: 'Starter',
      description: 'Perfecto para clínicas que están comenzando',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        { text: 'Gestión de pacientes', included: true },
        { text: 'Calendario de citas', included: true },
        { text: 'Recordatorios automáticos', included: true },
        { text: 'Informes básicos', included: true },
        { text: '1 usuario', included: true },
        { text: 'Análisis avanzado', included: false },
        { text: 'Marketing automation', included: false },
        { text: 'API access', included: false },
        { text: 'Soporte 24/7', included: false },
      ],
      highlight: false,
    },
    {
      name: 'Professional',
      description: 'Para clínicas en crecimiento que buscan escalar',
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        { text: 'Gestión de pacientes', included: true },
        { text: 'Calendario de citas', included: true },
        { text: 'Recordatorios automáticos', included: true },
        { text: 'Informes avanzados', included: true },
        { text: '5 usuarios', included: true },
        { text: 'Análisis avanzado', included: true },
        { text: 'Marketing automation', included: true },
        { text: 'API access', included: false },
        { text: 'Soporte prioritario', included: true },
      ],
      highlight: true,
      badge: 'Más popular',
    },
    {
      name: 'Enterprise',
      description: 'Solución completa para cadenas y franquicias',
      monthlyPrice: 249,
      annualPrice: 199,
      features: [
        { text: 'Pacientes ilimitados', included: true },
        { text: 'Múltiples ubicaciones', included: true },
        { text: 'Calendario inteligente', included: true },
        { text: 'IA predictiva', included: true },
        { text: 'Usuarios ilimitados', included: true },
        { text: 'Análisis predictivo', included: true },
        { text: 'Suite completa de marketing', included: true },
        { text: 'API completa + webhooks', included: true },
        { text: 'Gerente de cuenta dedicado', included: true },
      ],
      highlight: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-50/50 to-transparent dark:via-sky-950/20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-rose-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Inversión que{' '}
            <span className="text-gradient">se convierte en resultados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Elige el plan que mejor se adapte a las necesidades de tu clínica. 
            Sin compromiso, cancela cuando quieras.
          </p>

          {/* Toggle mensual/anual */}
          <div className="inline-flex items-center gap-4 p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <span className={cn('text-sm font-medium px-4 py-2 rounded-xl transition-colors', !isAnnual && 'bg-primary text-primary-foreground')}>
              Mensual
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors"
            >
              <motion.div
                className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
                animate={{ x: isAnnual ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={cn('text-sm font-medium px-4 py-2 rounded-xl transition-colors', isAnnual && 'bg-primary text-primary-foreground')}>
              Anual
              <span className="ml-2 text-xs text-green-500 font-bold">-20%</span>
            </span>
          </div>
        </motion.div>

        {/* Tarjetas de precios */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              plan={plan}
              isAnnual={isAnnual}
              index={index}
            />
          ))}
        </div>

        {/* Garantía */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
            <span className="text-xl">🛡️</span>
            <span className="font-medium">Garantía de satisfacción 30 días o te devolvemos el dinero</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type Plan = {
  name: string
  description: string
  monthlyPrice: number
  annualPrice: number
  features: Array<{ text: string; included: boolean }>
  highlight: boolean
  badge?: string
}

/**
 * Tarjeta individual de precio
 */
function PricingCard({ 
  plan, 
  isAnnual, 
  index 
}: { 
  plan: Plan
  isAnnual: boolean
  index: number
}) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice
  const savings = (plan.monthlyPrice - plan.annualPrice) * 12

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Badge de "Más popular" */}
      {plan.highlight && plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium shadow-lg">
            {plan.badge}
          </span>
        </div>
      )}

      <GlassCard
        variant={plan.highlight ? 'default' : 'default'}
        hover={true}
        glow={plan.highlight}
        className={cn(
          'h-full flex flex-col',
          plan.highlight && 'ring-2 ring-primary/50 scale-105 relative bg-white dark:bg-slate-900',
          !plan.highlight && 'bg-white/90 dark:bg-slate-900/90'
        )}
        padding="lg"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{plan.name}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">{plan.description}</p>
        </div>

        {/* Precio */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              {price}
            </span>
            <span className="text-slate-600 dark:text-slate-400">€/mes</span>
          </div>
          {isAnnual && plan.annualPrice !== plan.monthlyPrice && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
              Ahorras {savings}€/año
            </p>
          )}
        </div>

        {/* Features */}
        <div className="flex-1 space-y-3 mb-8">
          {plan.features.map((feature, featureIndex) => (
            <div key={featureIndex} className="flex items-start gap-3">
              {feature.included ? (
                <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
              ) : (
                <X className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0" />
              )}
              <span className={cn(
                'text-sm',
                feature.included 
                  ? 'text-slate-900 dark:text-slate-100 font-medium' 
                  : 'text-slate-500 dark:text-slate-400'
              )}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          variant={plan.highlight ? 'shimmer' : 'default'}
          size="lg"
          className="w-full"
        >
          {plan.highlight ? 'Comenzar prueba gratuita' : 'Elegir plan'}
        </Button>
      </GlassCard>
    </motion.div>
  )
}
