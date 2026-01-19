'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { DashboardWidgets } from '@/components/dashboard/widgets'
import { DataTable } from '@/components/dashboard/data-table'
import { TableSkeleton } from '@/components/ui/skeleton'
import { useAuth, fetchPatients } from '@/lib/api-service'

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth()
  const [loading, setLoading] = React.useState(true)
  const [patients, setPatients] = React.useState<any[]>([])

  React.useEffect(() => {
    async function loadData() {
      try {
        const patientsData = await fetchPatients()
        setPatients(patientsData.slice(0, 10)) // Solo mostrar los 10 más recientes
      } catch (error) {
        toast.error('Error al cargar datos de pacientes')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="lg:ml-[280px] transition-all duration-300">
        {/* Header */}
        <DashboardHeader />

        {/* Contenido del dashboard */}
        <main className="p-6">
          {/* Bienvenida */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-heading font-bold">
              ¡Buenos días, {user?.name?.split(' ')[0] || 'Admin'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Aquí está el resumen de tu clínica para hoy
            </p>
          </motion.div>

          {/* Widgets del dashboard con estadísticas y gráficos */}
          <DashboardWidgets />

          {/* Tabla de pacientes recientes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {loading ? (
              <div className="rounded-2xl border shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-48 rounded animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
                  <div className="flex gap-2">
                    <div className="h-9 w-64 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
                    <div className="h-9 w-24 rounded-xl animate-skeleton-pulse bg-slate-200 dark:bg-slate-700" />
                  </div>
                </div>
                <TableSkeleton rows={10} />
              </div>
            ) : (
              <DataTable
                title="Pacientes Recientes"
                data={patients}
                onView={(patient) => toast.info(`Viendo perfil de ${patient.name}`)}
                onEdit={(patient) => toast.info(`Editando ${patient.name}`)}
                onAdd={() => toast.success('Formulario de nuevo paciente')}
              />
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
