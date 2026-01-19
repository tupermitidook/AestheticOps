'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/25',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        glass: 'bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/30 dark:hover:bg-white/20 shadow-lg',
        shimmer: 'bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 bg-[length:200%_100%] text-white shadow-lg shadow-indigo-500/25 animate-shimmer',
        glow: 'bg-primary text-primary-foreground shadow-lg shadow-primary/40 hover:shadow-2xl hover:shadow-primary/50',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-3 text-xs',
        lg: 'h-14 rounded-2xl px-8 text-base',
        xl: 'h-16 rounded-2xl px-10 text-lg',
        icon: 'h-10 w-10',
        'icon-lg': 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Cargando...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

/**
 * Botón con efecto magnético que sigue al cursor
 */
interface MagneticButtonProps extends ButtonProps {
  strength?: number
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, children, strength = 20, ...props }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = React.useState(false)

    const handleMouse = (e: React.MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = buttonRef.current!.getBoundingClientRect()
      const middleX = clientX - (left + width / 2)
      const middleY = clientY - (top + height / 2)
      setPosition({
        x: middleX * (strength / 100),
        y: middleY * (strength / 100),
      })
    }

    const reset = () => {
      setPosition({ x: 0, y: 0 })
      setIsHovered(false)
    }

    const { onAnimationStart, onAnimationEnd, onAnimationIteration, onDragStart, onDrag, onDragEnd, ...restProps } = props as any

    return (
      <motion.button
        ref={buttonRef}
        className={cn(buttonVariants({ className }), 'relative')}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...restProps}
      >
        <motion.span
          className="relative z-10"
          animate={{ x: -position.x * 0.5, y: -position.y * 0.5 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  }
)
MagneticButton.displayName = 'MagneticButton'

/**
 * Botón CTA con efecto shimmer prominente
 */
const ShimmerButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'shimmer', size = 'lg', children, ...props }, ref) => {
    const { onAnimationStart, onAnimationEnd, onAnimationIteration, onDragStart, onDrag, onDragEnd, ...restProps } = props as any

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          'relative overflow-hidden group'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...restProps}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>
    )
  }
)
ShimmerButton.displayName = 'ShimmerButton'

export { Button, buttonVariants, MagneticButton, ShimmerButton }
