'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button, MagneticButton } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/card'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Email o contraseña incorrectos')
        setIsLoading(false)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Error de conexión')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      const result = await signIn('credentials', {
        email: 'admin@aestheticops.com',
        password: 'admin123',
        redirect: false,
      })

      if (result?.error) {
        setError('Error al iniciar sesión')
        setIsLoading(false)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err) {
      setError('Error de conexión')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-heading font-bold text-2xl">
              Aesthetic<span className="text-gradient">Ops</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">¡Bienvenido de nuevo!</h1>
            <p className="text-muted-foreground">
              Inicia sesión para acceder a tu panel de control
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={cn(
                  'w-full px-4 py-3 rounded-xl',
                  'bg-slate-100 dark:bg-slate-800',
                  'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                  'placeholder:text-muted-foreground/50',
                  'transition-all duration-300'
                )}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={cn(
                    'w-full px-4 py-3 rounded-xl',
                    'bg-slate-100 dark:bg-slate-800',
                    'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                    'placeholder:text-muted-foreground/50',
                    'transition-all duration-300'
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-slate-300" />
                <span className="text-muted-foreground">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div className="space-y-3">
              <Button
                type="submit"
                variant="shimmer"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Iniciar sesión'
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
                    O
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  '🎮 Probar demo'
                )}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Regístrate gratis
            </Link>
          </p>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm"
          >
            <p className="font-medium mb-2">Credenciales de prueba:</p>
            <p className="text-muted-foreground">
              Email: <code className="text-primary">admin@aestheticops.com</code>
            </p>
            <p className="text-muted-foreground">
              Contraseña: <code className="text-primary">admin123</code>
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <AnimatedBackground intensity="medium">
          <div className="max-w-lg text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-4">
                Transforma tu clínica en una máquina de generar resultados
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Automatiza citas, fideliza pacientes y haz crecer tu negocio con inteligencia artificial aplicada.
              </p>
              <div className="flex justify-center gap-8 text-sm">
                <div>
                  <p className="text-3xl font-bold">500+</p>
                  <p className="opacity-75">Clínicas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="opacity-75">Pacientes</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">98%</p>
                  <p className="opacity-75">Satisfacción</p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </div>
    </div>
  )
}
