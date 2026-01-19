'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/**
 * Interruptor de tema Dark/Light con animación premium
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-700', className)} />
    )
  }

  const isDark = theme === 'dark'

  return (
    <motion.button
      className={cn(
        'relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        isDark ? 'bg-slate-800' : 'bg-slate-200'
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileTap={{ scale: 0.95 }}
      initial={false}
      animate={{ backgroundColor: isDark ? 'hsl(222.2 84% 4.9%)' : 'hsl(210 40% 96.1%)' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-slate-800" />
          ) : (
            <Sun className="w-3 h-3 text-amber-500" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Efecto de brillo */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          isDark ? 'opacity-0' : 'opacity-100'
        )}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12" />
      </motion.div>
    </motion.button>
  )
}

/**
 * Versión alternativa del toggle con íconos flotantes
 */
export function ThemeToggleAlternative({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={cn('w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700', className)} />
    )
  }

  return (
    <motion.button
      className={cn(
        'relative w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 shadow-xl',
        'bg-white/50 dark:bg-slate-800/50',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Sun className="w-5 h-5 text-amber-500 absolute" />
        <Moon className="w-5 h-5 text-sky-500 absolute" />
      </motion.div>
    </motion.button>
  )
}
