'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Button, ShimmerButton } from '@/components/ui/button'
import { TableSkeleton, FormSkeleton } from '@/components/ui/skeleton'
import { useAuth, fetchPatients, createPatient, updatePatient, deletePatient } from '@/lib/api-service'
import { cn, formatDate, getAvatarColor, getInitials } from '@/lib/utils'
import {
      Search, Plus, Download, Filter, Eye, Edit, Trash2,
      ChevronLeft, ChevronRight, ArrowUpDown, X, Check, Loader2, Tag
} from 'lucide-react'

interface Patient {
      id: string
      name: string
      email: string
      phone: string
      lastVisit: string
      status: 'active' | 'pending' | 'inactive'
      treatments: number
      totalSpent: number
      createdAt: string
      tags?: string[]
}

const getPatientTags = (patient: Patient) => {
      const tags = patient.tags || []
      if (patient.totalSpent > 1000 && !tags.includes('VIP')) tags.push('VIP')
      if (patient.status === 'active' && !tags.includes('Recurrente')) tags.push('Recurrente')
      if (patient.status === 'inactive' && !tags.includes('Inactivo')) tags.push('Inactivo')
      return tags
}

export default function PatientsPage() {
      const { isLoading: authLoading } = useAuth()
      const [loading, setLoading] = React.useState(true)
      const [patients, setPatients] = React.useState<Patient[]>([])
      const [searchQuery, setSearchQuery] = React.useState('')
      const [statusFilter, setStatusFilter] = React.useState<string>('all')
      const [currentPage, setCurrentPage] = React.useState(1)
      const [showModal, setShowModal] = React.useState(false)
      const [editingPatient, setEditingPatient] = React.useState<Patient | null>(null)
      const [formData, setFormData] = React.useState({
            name: '',
            email: '',
            phone: '',
      })
      const [submitting, setSubmitting] = React.useState(false)
      const itemsPerPage = 10

      React.useEffect(() => {
            loadPatients()
      }, [])

      const loadPatients = async () => {
            try {
                  const data = await fetchPatients()
                  setPatients(data)
            } catch (error) {
                  toast.error('Error al cargar pacientes')
            } finally {
                  setLoading(false)
            }
      }

      const filteredPatients = patients.filter(patient => {
            const matchesSearch =
                  patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  patient.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
            return matchesSearch && matchesStatus
      })

      const totalPages = Math.ceil(filteredPatients.length / itemsPerPage)
      const paginatedPatients = filteredPatients.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
      )

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault()
            setSubmitting(true)

            try {
                  if (editingPatient) {
                        await updatePatient(editingPatient.id, formData)
                        toast.success('Paciente actualizado correctamente')
                  } else {
                        await createPatient(formData)
                        toast.success('Paciente creado correctamente')
                  }
                  setShowModal(false)
                  setEditingPatient(null)
                  setFormData({ name: '', email: '', phone: '' })
                  loadPatients()
            } catch (error) {
                  toast.error('Error al guardar paciente')
            } finally {
                  setSubmitting(false)
            }
      }

      const handleDelete = async (patient: Patient) => {
            if (confirm(`¿Estás seguro de eliminar a ${patient.name}?`)) {
                  try {
                        await deletePatient(patient.id)
                        toast.success('Paciente eliminado correctamente')
                        loadPatients()
                  } catch (error) {
                        toast.error('Error al eliminar paciente')
                  }
            }
      }

      const openEditModal = (patient: Patient) => {
            setEditingPatient(patient)
            setFormData({
                  name: patient.name,
                  email: patient.email,
                  phone: patient.phone,
            })
            setShowModal(true)
      }

      if (authLoading) {
            return (
                  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                        <div className="text-center">
                              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center mx-auto mb-4 animate-pulse">
                                    <span className="text-white font-bold text-2xl">A</span>
                              </div>
                              <p className="text-muted-foreground">Cargando...</p>
                        </div>
                  </div>
            )
      }

      return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                  <Sidebar />

                  <div className="lg:ml-[280px] transition-all duration-300">
                        <DashboardHeader />

                        <main className="p-6">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8"
                              >
                                    <h1 className="text-3xl font-heading font-bold">Pacientes</h1>
                                    <p className="text-muted-foreground mt-1">
                                          Gestiona tu base de pacientes
                                    </p>
                              </motion.div>

                              {/* Controles */}
                              <GlassCard className="mb-6 p-5">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                          <div className="flex-1 max-w-md">
                                                <div className="relative">
                                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                      <input
                                                            type="text"
                                                            placeholder="Buscar pacientes..."
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                      />
                                                </div>
                                          </div>

                                          <div className="flex items-center gap-3">
                                                <select
                                                      value={statusFilter}
                                                      onChange={(e) => setStatusFilter(e.target.value)}
                                                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                                >
                                                      <option value="all">Todos los estados</option>
                                                      <option value="active">Activo</option>
                                                      <option value="pending">Pendiente</option>
                                                      <option value="inactive">Inactivo</option>
                                                </select>

                                                <Button variant="outline" size="sm">
                                                      <Download className="w-4 h-4 mr-2" />
                                                      Exportar
                                                </Button>

                                                <ShimmerButton size="sm" onClick={() => {
                                                      setEditingPatient(null)
                                                      setFormData({ name: '', email: '', phone: '' })
                                                      setShowModal(true)
                                                }}>
                                                      <Plus className="w-4 h-4 mr-2" />
                                                      Nuevo paciente
                                                </ShimmerButton>
                                          </div>
                                    </div>
                              </GlassCard>

                              {/* Tabla */}
                              <GlassCard hover={false}>
                                    {loading ? (
                                          <div className="p-6">
                                                <TableSkeleton rows={10} />
                                          </div>
                                    ) : (
                                          <>
                                                <div className="overflow-x-auto">
                                                      <table className="w-full">
                                                            <thead>
                                                                  <tr className="border-b border-slate-200 dark:border-slate-700">
                                                                        <th className="text-left p-4 font-medium text-muted-foreground">Paciente</th>
                                                                        <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Contacto</th>
                                                                        <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Última visita</th>
                                                                        <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
                                                                        <th className="text-right p-4 font-medium text-muted-foreground hidden lg:table-cell">Gasto total</th>
                                                                        <th className="text-right p-4 font-medium text-muted-foreground">Acciones</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {paginatedPatients.map((patient, index) => (
                                                                        <motion.tr
                                                                              key={patient.id}
                                                                              initial={{ opacity: 0, y: 10 }}
                                                                              animate={{ opacity: 1, y: 0 }}
                                                                              transition={{ delay: index * 0.05 }}
                                                                              className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                                                        >
                                                                              <td className="p-4">
                                                                                    <div className="flex items-center gap-3">
                                                                                          <div className={cn(
                                                                                                'w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm',
                                                                                                getAvatarColor(patient.name)
                                                                                          )}>
                                                                                                {getInitials(patient.name)}
                                                                                          </div>
                                                                                          <div>
                                                                                                <p className="font-medium">{patient.name}</p>
                                                                                                <div className="flex gap-1 mt-1">
                                                                                                      {getPatientTags(patient).map(tag => (
                                                                                                            <span key={tag} className={cn(
                                                                                                                  "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium",
                                                                                                                  tag === 'VIP' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                                                                                                                        tag === 'Recurrente' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                                                                                                              "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                                                                                                            )}>
                                                                                                                  {tag}
                                                                                                            </span>
                                                                                                      ))}
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="p-4 hidden md:table-cell">
                                                                                    <div>
                                                                                          <p className="text-sm">{patient.email}</p>
                                                                                          <p className="text-xs text-muted-foreground">{patient.phone}</p>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                                                                                    {formatDate(patient.lastVisit)}
                                                                              </td>
                                                                              <td className="p-4">
                                                                                    <span className={cn(
                                                                                          'px-2.5 py-1 rounded-full text-xs font-medium',
                                                                                          patient.status === 'active' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                                                                                          patient.status === 'pending' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                                                                                          patient.status === 'inactive' && 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
                                                                                    )}>
                                                                                          {patient.status === 'active' ? 'Activo' : patient.status === 'pending' ? 'Pendiente' : 'Inactivo'}
                                                                                    </span>
                                                                              </td>
                                                                              <td className="p-4 hidden lg:table-cell text-right font-medium">
                                                                                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(patient.totalSpent)}
                                                                              </td>
                                                                              <td className="p-4">
                                                                                    <div className="flex items-center justify-end gap-1">
                                                                                          <button
                                                                                                onClick={() => toast.info(`Viendo perfil de ${patient.name}`)}
                                                                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                                                          >
                                                                                                <Eye className="w-4 h-4 text-muted-foreground" />
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => openEditModal(patient)}
                                                                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                                                                                          >
                                                                                                <Edit className="w-4 h-4 text-muted-foreground" />
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => handleDelete(patient)}
                                                                                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                                                          >
                                                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                                                          </button>
                                                                                    </div>
                                                                              </td>
                                                                        </motion.tr>
                                                                  ))}
                                                            </tbody>
                                                      </table>
                                                </div>

                                                {/* Paginación */}
                                                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                                      <p className="text-sm text-muted-foreground">
                                                            Página {currentPage} de {totalPages || 1}
                                                      </p>
                                                      <div className="flex items-center gap-2">
                                                            <Button
                                                                  variant="outline"
                                                                  size="sm"
                                                                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                                  disabled={currentPage === 1}
                                                            >
                                                                  <ChevronLeft className="w-4 h-4 mr-1" />
                                                                  Anterior
                                                            </Button>
                                                            <Button
                                                                  variant="outline"
                                                                  size="sm"
                                                                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                                  disabled={currentPage === totalPages || totalPages === 0}
                                                            >
                                                                  Siguiente
                                                                  <ChevronRight className="w-4 h-4 ml-1" />
                                                            </Button>
                                                      </div>
                                                </div>
                                          </>
                                    )}
                              </GlassCard>
                        </main>
                  </div>

                  {/* Modal de crear/editar */}
                  {showModal && (
                        <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                              onClick={() => setShowModal(false)}
                        >
                              <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                                    onClick={e => e.stopPropagation()}
                              >
                                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                                          <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-semibold">
                                                      {editingPatient ? 'Editar paciente' : 'Nuevo paciente'}
                                                </h2>
                                                <button
                                                      onClick={() => setShowModal(false)}
                                                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                >
                                                      <X className="w-5 h-5" />
                                                </button>
                                          </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Nombre completo</label>
                                                <input
                                                      type="text"
                                                      value={formData.name}
                                                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                      placeholder="María García López"
                                                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                      required
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <input
                                                      type="email"
                                                      value={formData.email}
                                                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                      placeholder="maria@email.com"
                                                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                      required
                                                />
                                          </div>

                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Teléfono</label>
                                                <input
                                                      type="tel"
                                                      value={formData.phone}
                                                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                      placeholder="+34 612 345 678"
                                                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                                      required
                                                />
                                          </div>

                                          <div className="flex gap-3 pt-4">
                                                <Button
                                                      type="button"
                                                      variant="outline"
                                                      className="flex-1"
                                                      onClick={() => setShowModal(false)}
                                                >
                                                      Cancelar
                                                </Button>
                                                <ShimmerButton
                                                      type="submit"
                                                      className="flex-1"
                                                      disabled={submitting}
                                                >
                                                      {submitting ? (
                                                            <>
                                                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                  Guardando...
                                                            </>
                                                      ) : (
                                                            'Guardar'
                                                      )}
                                                </ShimmerButton>
                                          </div>
                                    </form>
                              </motion.div>
                        </motion.div>
                  )}
            </div>
      )
}
