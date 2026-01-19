'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    clinicName: '',
    phone: '',
  })
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [step, setStep] = React.useState(1)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.clinicName.trim()) {
      newErrors.clinicName = 'El nombre de la clínica es requerido'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
      }
      return
    }
    
    if (!validateStep2()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          clinicName: formData.clinicName,
          phone: formData.phone,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear la cuenta')
      }

      toast.success('¡Cuenta creada exitosamente!')
      
      // Auto login after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        router.push('/login')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la cuenta')
      setErrors({ submit: error.message })
    } finally {
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

          {/* Progress Steps */}
          <div className="mb-8 flex items-center gap-2">
            <div className={cn(
              'flex-1 h-1 rounded-full',
              step >= 1 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
            )} />
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              step >= 1 
                ? 'bg-primary text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            )}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <div className={cn(
              'flex-1 h-1 rounded-full',
              step >= 2 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
            )} />
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              step >= 2 
                ? 'bg-primary text-white' 
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
            )}>
              2
            </div>
            <div className={cn(
              'flex-1 h-1 rounded-full',
              'bg-slate-200 dark:bg-slate-700'
            )} />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {step === 1 ? 'Crea tu cuenta' : 'Información de tu clínica'}
            </h1>
            <p className="text-muted-foreground">
              {step === 1 
                ? 'Comienza tu prueba gratuita de 14 días'
                : 'Cuéntanos sobre tu clínica'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Nombre completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Juan Pérez"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl',
                      'bg-slate-100 dark:bg-slate-800',
                      'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                      'placeholder:text-muted-foreground/50',
                      'transition-all duration-300',
                      errors.name && 'ring-2 ring-red-500'
                    )}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl',
                      'bg-slate-100 dark:bg-slate-800',
                      'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                      'placeholder:text-muted-foreground/50',
                      'transition-all duration-300',
                      errors.email && 'ring-2 ring-red-500'
                    )}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                        'placeholder:text-muted-foreground/50',
                        'transition-all duration-300',
                        errors.password && 'ring-2 ring-red-500'
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
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="confirmPassword">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className={cn(
                        'w-full px-4 py-3 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                        'placeholder:text-muted-foreground/50',
                        'transition-all duration-300',
                        errors.confirmPassword && 'ring-2 ring-red-500'
                      )}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="clinicName">
                    Nombre de la clínica
                  </label>
                  <input
                    id="clinicName"
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                    placeholder="Clínica de Estética Premium"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl',
                      'bg-slate-100 dark:bg-slate-800',
                      'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                      'placeholder:text-muted-foreground/50',
                      'transition-all duration-300',
                      errors.clinicName && 'ring-2 ring-red-500'
                    )}
                    required
                  />
                  {errors.clinicName && (
                    <p className="text-sm text-red-500">{errors.clinicName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="phone">
                    Teléfono de contacto
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 612 345 678"
                    className={cn(
                      'w-full px-4 py-3 rounded-xl',
                      'bg-slate-100 dark:bg-slate-800',
                      'border-0 focus:outline-none focus:ring-2 focus:ring-primary',
                      'placeholder:text-muted-foreground/50',
                      'transition-all duration-300',
                      errors.phone && 'ring-2 ring-red-500'
                    )}
                    required
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800">
                  <p className="text-sm text-sky-800 dark:text-sky-200">
                    <strong>Prueba gratuita:</strong> Disfruta de 14 días gratis sin tarjeta de crédito. 
                    Cancela cuando quieras.
                  </p>
                </div>
              </>
            )}

            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm"
              >
                {errors.submit}
              </motion.div>
            )}

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
                    {step === 1 ? 'Validando...' : 'Creando cuenta...'}
                  </>
                ) : (
                  step === 1 ? 'Continuar' : 'Crear cuenta'
                )}
              </Button>

              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Volver
                </Button>
              )}
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
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
                Únete a más de 500 clínicas
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Gestiona tu clínica de estética de forma profesional y eficiente.
              </p>
              <div className="flex justify-center gap-8 text-sm">
                <div>
                  <p className="text-3xl font-bold">14 días</p>
                  <p className="opacity-75">Prueba gratis</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">Sin tarjeta</p>
                  <p className="opacity-75">Sin compromiso</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="opacity-75">Soporte</p>
                </div>
              </div>
            </motion.div>
          </div>
        </AnimatedBackground>
      </div>
    </div>
  )
}
