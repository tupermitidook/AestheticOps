'use client'

import { cn } from '@/lib/utils'

/**
 * Componente de esqueleto para表格 con efecto pulse
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header skeleton */}
      <div className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 rounded animate-skeleton-pulse',
              i === 0 ? 'w-48' : i === 4 ? 'w-24 ml-auto' : 'flex-1'
            )}
            style={{ opacity: 1 - i * 0.1 }}
          />
        ))}
      </div>
      
      {/* Rows skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-4 py-4 border-b border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-full animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
              <div className="h-3 w-24 rounded animate-skeleton-pulse bg-slate-100 dark:bg-slate-800" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 flex-1">
            <div className="h-4 w-40 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="hidden lg:flex items-center w-24">
            <div className="h-4 w-20 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="w-24">
            <div className="h-6 w-16 rounded-full animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="hidden lg:flex items-center justify-end w-24">
            <div className="h-4 w-16 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="w-20 flex justify-end gap-1">
            <div className="w-8 h-8 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
            <div className="w-8 h-8 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Componente de esqueleto para tarjetas KPI
 */
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 w-16 rounded-full animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-24 rounded animate-skeleton-pulse bg-slate-100 dark:bg-slate-800" />
            <div className="h-6 w-28 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Componente de esqueleto para gráfico
 */
export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="rounded-2xl border shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-5 w-32 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded animate-skeleton-pulse bg-slate-100 dark:bg-slate-800" />
        </div>
        <div className="flex gap-2">
          <div className="h-4 w-16 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-16 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div 
        className="w-full animate-skeleton-pulse bg-slate-100 dark:bg-slate-800 rounded-lg"
        style={{ height }}
      />
    </div>
  )
}

/**
 * Componente de esqueleto para formulario
 */
export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 w-24 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        <div className="h-11 w-full rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        <div className="h-11 w-full rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-11 w-full rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="h-11 w-full rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
      <div className="h-11 w-40 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}

/**
 * Componente de esqueleto para botón
 */
export function ButtonSkeleton({ width = 'w-32' }: { width?: string }) {
  return (
    <div className={`h-11 ${width} rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700`} />
  )
}

/**
 * Componente de esqueleto para página completa
 */
export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-64 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-48 rounded animate-skeleton-pulse bg-slate-100 dark:bg-slate-800" />
      </div>
      <StatsSkeleton />
      <div className="grid lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <div className="rounded-2xl border shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-48 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          <div className="flex gap-2">
            <div className="h-9 w-64 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
            <div className="h-9 w-24 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
        <TableSkeleton rows={8} />
      </div>
    </div>
  )
}
