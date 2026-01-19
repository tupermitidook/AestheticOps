'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import { useEffect, useState } from 'react'

/**
 * Componente de notificaciones toast premium
 */
export function Toaster() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Sonner
      theme={theme as 'light' | 'dark' | 'system'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast group-[.toaster]:bg-white/90 
            group-[.toaster]:dark:bg-slate-900/90 
            group-[.toaster]:backdrop-blur-xl 
            group-[.toaster]:border-white/20 
            group-[.toaster]:dark:border-white/10 
            group-[.toaster]:shadow-2xl 
            group-[.toaster]:rounded-2xl
            group-[.toaster]:py-4
            group-[.toaster]:px-6
            font-sans
          `,
          description: `
            group-[.toast]:text-slate-500 
            group-[.toast]:dark:text-slate-400
          `,
          actionButton: `
            group-[.toast]:bg-primary 
            group-[.toast]:text-primary-foreground
            group-[.toast]:rounded-xl
            group-[.toast]:px-4
            group-[.toast]:py-2
          `,
          cancelButton: `
            group-[.toast]:bg-muted 
            group-[.toast]:text-muted-foreground
            group-[.toast]:rounded-xl
            group-[.toast]:px-4
            group-[.toast]:py-2
          `,
          success: `
            group-[.toast]:border-l-4 
            group-[.toast]:border-l-green-500
          `,
          error: `
            group-[.toast]:border-l-4 
            group-[.toast]:border-l-red-500
          `,
          warning: `
            group-[.toast]:border-l-4 
            group-[.toast]:border-l-amber-500
          `,
          info: `
            group-[.toast]:border-l-4 
            group-[.toast]:border-l-blue-500
          `,
        },
      }}
    />
  )
}
