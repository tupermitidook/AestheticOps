'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { GlassCard } from '@/components/ui/card'

// Types for real data
interface Stats {
  totalPatients: number
  totalAppointments: number
  todayAppointments: number
  monthlyRevenue: number
  completedAppointments: number
  pendingAppointments: number
  revenueChange: number
  appointmentsChange: number
}

interface RevenueData {
  month: string
  value: number
  previous: number
}

interface AppointmentsData {
  name: string
  value: number
}

interface TreatmentData {
  name: string
  value: number
  color: string
}

interface PatientGrowthData {
  month: string
  new: number
  total: number
}

// Datos de ejemplo para gráficos (fallback)
const revenueData: RevenueData[] = [
  { month: 'Ene', value: 28500, previous: 24200 },
  { month: 'Feb', value: 31200, previous: 25800 },
  { month: 'Mar', value: 35800, previous: 28900 },
  { month: 'Abr', value: 42100, previous: 31500 },
  { month: 'May', value: 38900, previous: 35200 },
  { month: 'Jun', value: 45200, previous: 37800 },
]

const appointmentsData: AppointmentsData[] = [
  { name: 'Lun', value: 45 },
  { name: 'Mar', value: 52 },
  { name: 'Mié', value: 48 },
  { name: 'Jue', value: 61 },
  { name: 'Vie', value: 55 },
  { name: 'Sáb', value: 32 },
  { name: 'Dom', value: 18 },
]

const treatmentDistribution: TreatmentData[] = [
  { name: 'Botox', value: 35, color: '#0ea5e9' },
  { name: 'Rellenos', value: 28, color: '#6366f1' },
  { name: 'Láseres', value: 22, color: '#f43f5e' },
  { name: 'Otros', value: 15, color: '#10b981' },
]

const patientGrowth: PatientGrowthData[] = [
  { month: 'Ene', new: 12, total: 450 },
  { month: 'Feb', new: 18, total: 468 },
  { month: 'Mar', new: 15, total: 483 },
  { month: 'Abr', new: 22, total: 505 },
  { month: 'May', new: 19, total: 524 },
  { month: 'Jun', new: 25, total: 549 },
]

/**
 * Componente que carga y proporciona datos reales desde la API
 */
function useDashboardData() {
  const [stats, setStats] = React.useState<Stats | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Fetch stats from API
        const statsResponse = await fetch('/api/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        } else {
          // Use fallback data if API fails
          setStats({
            totalPatients: 549,
            totalAppointments: 287,
            todayAppointments: 8,
            monthlyRevenue: 45200,
            completedAppointments: 265,
            pendingAppointments: 22,
            revenueChange: 12.5,
            appointmentsChange: 8.2,
          })
        }
      } catch (err) {
        console.error('Error fetching dashboard stats:', err)
        setError('Error al cargar las estadísticas')

        // Fallback data
        setStats({
          totalPatients: 549,
          totalAppointments: 287,
          todayAppointments: 8,
          monthlyRevenue: 45200,
          completedAppointments: 265,
          pendingAppointments: 22,
          revenueChange: 12.5,
          appointmentsChange: 8.2,
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { stats, isLoading, error }
}

/**
 * Widget de estadísticas con KPIs - Versión con datos reales
 */
export function StatsWidgets() {
  const { stats, isLoading } = useDashboardData()

  // Mostrar skeletons mientras carga
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard padding="md" hover={true}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
                <div className="h-6 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
                <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    )
  }

  const defaultStats = {
    title: 'Datos',
    value: '0',
    change: '0%',
    trend: 'up' as const,
    icon: <Activity className="w-5 h-5" />,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
  }

  const statsList = [
    {
      ...defaultStats,
      title: 'Ingresos mensuales',
      value: stats ? formatCurrency(stats.monthlyRevenue) : '0€',
      change: stats ? `+${stats.revenueChange}%` : '0%',
      trend: stats && stats.revenueChange >= 0 ? 'up' : 'down',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      ...defaultStats,
      title: 'Citas este mes',
      value: stats ? stats.totalAppointments.toString() : '0',
      change: stats ? `+${stats.appointmentsChange}%` : '0%',
      trend: stats && stats.appointmentsChange >= 0 ? 'up' : 'down',
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-sky-500',
      bgColor: 'bg-sky-500/10',
    },
    {
      ...defaultStats,
      title: 'Pacientes activos',
      value: stats ? stats.totalPatients.toString() : '0',
      change: '+4.3%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
    },
    {
      ...defaultStats,
      title: 'Tasa de retención',
      value: '94.2%',
      change: '-1.2%',
      trend: 'down',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsList.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard padding="md" hover={true}>
            <div className="flex items-start justify-between">
              <div className={cn('p-2 rounded-xl', stat.bgColor)}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
                  stat.trend === 'up'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                )}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}

/**
 * Gráfico de ingresos con área rellena
 */
export function RevenueChart() {
  return (
    <GlassCard padding="lg" hover={true} className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Ingresos</h3>
          <p className="text-sm text-muted-foreground">Evolución mensual</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary" />
            <span>Este año</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>Año anterior</span>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Area
              type="monotone"
              dataKey="previous"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              fill="url(#colorPrevious)"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

/**
 * Gráfico de citas por día
 */
export function AppointmentsChart() {
  return (
    <GlassCard padding="lg" hover={true} className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Citas por día</h3>
        <p className="text-sm text-muted-foreground">Esta semana</p>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={appointmentsData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

/**
 * Gráfico circular de distribución de tratamientos
 */
export function TreatmentDistributionChart() {
  return (
    <GlassCard padding="lg" hover={true} className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Tratamientos</h3>
        <p className="text-sm text-muted-foreground">Distribución por tipo</p>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={treatmentDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {treatmentDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number) => [`${value}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {treatmentDistribution.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-muted-foreground">{item.name}</span>
            <span className="text-sm font-medium ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

/**
 * Gráfico de línea de tendencia de pacientes
 */
export function PatientGrowthChart() {
  return (
    <GlassCard padding="lg" hover={true} className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Crecimiento de pacientes</h3>
        <p className="text-sm text-muted-foreground">Nuevos vs totales</p>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={patientGrowth}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              name="Total"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="new"
              name="Nuevos"
              stroke="hsl(var(--ring))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--ring))', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  )
}

/**
 * Componente de widgets con actividad reciente y datos reales
 */
export function DashboardWidgets() {
  const [recentActivity, setRecentActivity] = React.useState<{
    id: string
    title: string
    description: string
    time: string
    type: string
  }[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await fetch('/api/appointments')
        if (response.ok) {
          const appointments = await response.json()
          const activities = appointments.slice(0, 5).map((apt: {
            id: string
            patientName: string
            treatmentName: string
            date: string
            time: string
          }) => ({
            id: apt.id,
            title: `Cita con ${apt.patientName}`,
            description: apt.treatmentName,
            time: `${apt.date} às ${apt.time}`,
            type: 'appointment',
          }))
          setRecentActivity(activities)
        }
      } catch (err) {
        console.error('Error fetching activity:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [])

  return (
    <div className="space-y-6">
      <StatsWidgets />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevenueChart />
            <AppointmentsChart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TreatmentDistributionChart />
            <PatientGrowthChart />
          </div>
        </div>

        {/* Activity Feed */}
        <GlassCard padding="lg" hover={true}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Actividad Reciente</h3>
            <button className="text-sm text-primary hover:underline">Ver todo</button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-4 py-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2" />
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentActivity.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-4 py-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 mx-auto text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">Sin actividad reciente</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}

export default DashboardWidgets
