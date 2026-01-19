'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

/**
 * Componente de tarjeta con efecto glassmorphism premium
 */
interface GlassCardProps {
  variant?: 'default' | 'dark' | 'light' | 'bordered'
  hover?: boolean
  glow?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

export function GlassCard({
  variant = 'default',
  hover = false,
  glow = false,
  padding = 'md',
  className,
  children,
}: GlassCardProps) {
  const variants = {
    default: 'bg-white dark:bg-slate-900 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-slate-100',
    dark: 'bg-slate-900 dark:bg-slate-950 backdrop-blur-xl border-slate-800 dark:border-slate-800 text-white',
    light: 'bg-white dark:bg-slate-900 backdrop-blur-2xl border-slate-200 dark:border-slate-700 shadow-xl text-slate-900 dark:text-slate-100',
    bordered: 'bg-transparent backdrop-blur-0 border-2 border-primary/20',
  }

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  }

  return (
    <motion.div
      className={cn(
        'rounded-2xl border shadow-xl',
        variants[variant],
        paddingStyles[padding],
        hover && 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer',
        glow && 'shadow-lg shadow-primary/10',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Tarjeta estándar con variantes
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-5',
      lg: 'p-7',
    }

    const variants = {
      default: 'bg-card text-card-foreground',
      glass: 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-white/10',
      elevated: 'bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow',
      outline: 'border-2 border-border bg-transparent',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border',
          paddingStyles[padding],
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-5', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-5 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

/**
 * Componente de borde con efecto beam (brillo)
 */
interface BorderBeamProps {
  className?: string
  duration?: number
  borderWidth?: number
  containerRef?: React.RefObject<HTMLDivElement>
}

export function BorderBeam({
  className,
  duration = 3,
  borderWidth = 2,
  containerRef,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 rounded-2xl overflow-hidden',
        className
      )}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            transparent 0deg,
            hsl(var(--primary)) 90deg,
            transparent 180deg
          )`,
          rotate: 360,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
