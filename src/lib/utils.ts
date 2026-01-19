import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Función para formatear moneda
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Función para formatear fecha
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

/**
 * Función para formatear fecha completa
 */
export function formatFullDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

/**
 * Generador de colores para avatares
 */
export function getAvatarColor(name: string): string {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
    'bg-rose-500',
  ]
  
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

/**
 * Iniciales del nombre
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Calcula el porcentaje de cambio
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return 100
  return Math.round(((current - previous) / previous) * 100)
}

/**
 * Genera datos aleatorios para gráficos demo
 */
export function generateChartData(months: number = 12): { month: string; value: number; previous?: number }[] {
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const data = []
  
  for (let i = 0; i < months; i++) {
    const baseValue = 15000 + Math.random() * 10000
    const variation = Math.random() * 3000 - 1500
    const previousValue = baseValue - variation
    
    data.push({
      month: monthNames[i],
      value: Math.round(baseValue),
      previous: Math.round(previousValue),
    })
  }
  
  return data
}
