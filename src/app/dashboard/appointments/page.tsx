'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X,
  Check,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientPhone: string
  treatmentId: string
  treatmentName: string
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  notes: string
  price: number
}

interface Treatment {
  id: string
  name: string
  duration: number
  price: number
}

interface Patient {
  id: string
  name: string
  phone: string
  email: string
}

// Mock data for initial state
const initialAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'María González',
    patientPhone: '+34 612 345 678',
    treatmentId: '1',
    treatmentName: 'Botox',
    date: '2026-01-20',
    time: '10:00',
    duration: 45,
    status: 'confirmed',
    notes: 'Primera vez, explicarle el proceso',
    price: 350,
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Carlos Ruiz',
    patientPhone: '+34 678 901 234',
    treatmentId: '2',
    treatmentName: 'Relleno Dérmico',
    date: '2026-01-20',
    time: '11:00',
    duration: 60,
    status: 'scheduled',
    notes: '',
    price: 450,
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Ana López',
    patientPhone: '+34 654 321 987',
    treatmentId: '3',
    treatmentName: 'Tratamiento Facial',
    date: '2026-01-20',
    time: '14:00',
    duration: 90,
    status: 'in-progress',
    notes: 'piel sensible, usar productos suaves',
    price: 180,
  },
  {
    id: '4',
    patientId: '4',
    patientName: 'Pedro Sánchez',
    patientPhone: '+34 666 777 888',
    treatmentId: '4',
    treatmentName: 'Limpieza Facial',
    date: '2026-01-19',
    time: '09:00',
    duration: 60,
    status: 'completed',
    notes: 'Cliente habitual',
    price: 120,
  },
  {
    id: '5',
    patientId: '5',
    patientName: 'Laura Martínez',
    patientPhone: '+34 699 888 777',
    treatmentId: '1',
    treatmentName: 'Botox',
    date: '2026-01-21',
    time: '16:00',
    duration: 45,
    status: 'scheduled',
    notes: 'recordar promo de temporada',
    price: 350,
  },
]

const treatments: Treatment[] = [
  { id: '1', name: 'Botox', duration: 45, price: 350 },
  { id: '2', name: 'Relleno Dérmico', duration: 60, price: 450 },
  { id: '3', name: 'Tratamiento Facial', duration: 90, price: 180 },
  { id: '4', name: 'Limpieza Facial', duration: 60, price: 120 },
  { id: '5', name: 'Mesoterapia', duration: 30, price: 200 },
  { id: '6', name: 'Peeling Químico', duration: 45, price: 150 },
]

const patients: Patient[] = [
  { id: '1', name: 'María González', phone: '+34 612 345 678', email: 'maria@email.com' },
  { id: '2', name: 'Carlos Ruiz', phone: '+34 678 901 234', email: 'carlos@email.com' },
  { id: '3', name: 'Ana López', phone: '+34 654 321 987', email: 'ana@email.com' },
  { id: '4', name: 'Pedro Sánchez', phone: '+34 666 777 888', email: 'pedro@email.com' },
  { id: '5', name: 'Laura Martínez', phone: '+34 699 888 777', email: 'laura@email.com' },
]

const statusColors = {
  scheduled: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  'in-progress': 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  completed: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}

const statusLabels = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  'in-progress': 'En Progreso',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = React.useState<Appointment[]>(initialAppointments)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [editingAppointment, setEditingAppointment] = React.useState<Appointment | null>(null)
  const [selectedAppointment, setSelectedAppointment] = React.useState<Appointment | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Form state
  const [formData, setFormData] = React.useState({
    patientId: '',
    treatmentId: '',
    date: '',
    time: '',
    notes: '',
    status: 'scheduled' as Appointment['status'],
  })

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.treatmentName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Sort by date and time
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateCompare = new Date(a.date).getTime() - new Date(b.date).getTime()
    if (dateCompare !== 0) return dateCompare
    return a.time.localeCompare(b.time)
  })

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const patient = patients.find((p) => p.id === formData.patientId)
    const treatment = treatments.find((t) => t.id === formData.treatmentId)

    if (!patient || !treatment) {
      setIsLoading(false)
      return
    }

    const newAppointment: Appointment = {
      id: editingAppointment?.id || Date.now().toString(),
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      treatmentId: treatment.id,
      treatmentName: treatment.name,
      date: formData.date,
      time: formData.time,
      duration: treatment.duration,
      status: formData.status,
      notes: formData.notes,
      price: treatment.price,
    }

    try {
      if (editingAppointment) {
        // Update existing appointment
        const response = await fetch(`/api/appointments/${editingAppointment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppointment),
        })
        if (response.ok) {
          setAppointments((prev) =>
            prev.map((apt) => (apt.id === editingAppointment.id ? newAppointment : apt))
          )
        } else {
          // Fallback to local update if API fails
          setAppointments((prev) =>
            prev.map((apt) => (apt.id === editingAppointment.id ? newAppointment : apt))
          )
        }
      } else {
        // Create new appointment
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newAppointment),
        })
        if (response.ok) {
          const created = await response.json()
          setAppointments((prev) => [...prev, created])
        } else {
          // Fallback to local update if API fails
          setAppointments((prev) => [...prev, newAppointment])
        }
      }
      closeModal()
    } catch (error) {
      // Fallback to local update on error
      if (editingAppointment) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === editingAppointment.id ? newAppointment : apt))
        )
      } else {
        setAppointments((prev) => [...prev, newAppointment])
      }
      closeModal()
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta cita?')) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setAppointments((prev) => prev.filter((apt) => apt.id !== id))
      } else {
        // Fallback to local update
        setAppointments((prev) => prev.filter((apt) => apt.id !== id))
      }
    } catch (error) {
      // Fallback to local update on error
      setAppointments((prev) => prev.filter((apt) => apt.id !== id))
    } finally {
      setIsLoading(false)
      setSelectedAppointment(null)
    }
  }

  // Handle status change
  const handleStatusChange = async (id: string, status: Appointment['status']) => {
    const appointment = appointments.find((apt) => apt.id === id)
    if (!appointment) return

    const updatedAppointment = { ...appointment, status }

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppointment),
      })
      if (response.ok) {
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
        )
      } else {
        // Fallback
        setAppointments((prev) =>
          prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
        )
      }
    } catch (error) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? updatedAppointment : apt))
      )
    }
  }

  const openModal = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment)
      setFormData({
        patientId: appointment.patientId,
        treatmentId: appointment.treatmentId,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes,
        status: appointment.status,
      })
    } else {
      setEditingAppointment(null)
      setFormData({
        patientId: '',
        treatmentId: '',
        date: '',
        time: '',
        notes: '',
        status: 'scheduled',
      })
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAppointment(null)
  }

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />
      case 'confirmed':
        return <Check className="w-4 h-4" />
      case 'in-progress':
        return <User className="w-4 h-4" />
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'cancelled':
        return <X className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-heading font-bold">Citas</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona las citas de tu clínica aesthetic
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl',
              'bg-primary text-white font-medium',
              'hover:opacity-90 transition-all',
              'shadow-lg shadow-primary/25'
            )}
          >
            <Plus className="w-5 h-5" />
            Nueva Cita
          </button>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col md:flex-row gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por paciente o tratamiento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-xl',
              'bg-white dark:bg-slate-800/50',
              'border border-white/20',
              'focus:outline-none focus:ring-2 focus:ring-primary/50',
              'placeholder:text-muted-foreground'
            )}
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={cn(
            'px-4 py-2.5 rounded-xl',
            'bg-white dark:bg-slate-800/50',
            'border border-white/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'cursor-pointer'
          )}
        >
          <option value="all">Todos los estados</option>
          <option value="scheduled">Programada</option>
          <option value="confirmed">Confirmada</option>
          <option value="in-progress">En Progreso</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <div
          className={cn(
            'p-4 rounded-2xl',
            'bg-white dark:bg-slate-800/50',
            'border border-white/20',
            'backdrop-blur-sm'
          )}
        >
          <p className="text-sm text-muted-foreground">Total Citas</p>
          <p className="text-2xl font-bold mt-1">{appointments.length}</p>
        </div>
        <div
          className={cn(
            'p-4 rounded-2xl',
            'bg-white dark:bg-slate-800/50',
            'border border-white/20',
            'backdrop-blur-sm'
          )}
        >
          <p className="text-sm text-muted-foreground">Hoy</p>
          <p className="text-2xl font-bold mt-1 text-emerald-600">
            {appointments.filter((a) => a.date === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div
          className={cn(
            'p-4 rounded-2xl',
            'bg-white dark:bg-slate-800/50',
            'border border-white/20',
            'backdrop-blur-sm'
          )}
        >
          <p className="text-sm text-muted-foreground">Confirmadas</p>
          <p className="text-2xl font-bold mt-1 text-sky-600">
            {appointments.filter((a) => a.status === 'confirmed').length}
          </p>
        </div>
        <div
          className={cn(
            'p-4 rounded-2xl',
            'bg-white dark:bg-slate-800/50',
            'border border-white/20',
            'backdrop-blur-sm'
          )}
        >
          <p className="text-sm text-muted-foreground">Ingresos Hoy</p>
          <p className="text-2xl font-bold mt-1 text-primary">
            {appointments
              .filter(
                (a) =>
                  a.date === new Date().toISOString().split('T')[0] &&
                  a.status === 'completed'
              )
              .reduce((sum, a) => sum + a.price, 0)}
            €
          </p>
        </div>
      </motion.div>

      {/* Appointments Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-4"
      >
        <AnimatePresence mode="popLayout">
          {sortedAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'p-4 rounded-2xl',
                'bg-white dark:bg-slate-800/50',
                'border border-white/20',
                'backdrop-blur-sm',
                'hover:shadow-lg hover:shadow-primary/5',
                'transition-all duration-200'
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Main Info */}
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      'bg-gradient-to-br from-sky-500/10 to-indigo-500/10',
                      'text-primary'
                    )}
                  >
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{appointment.patientName}</h3>
                      <span
                        className={cn(
                          'px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                          statusColors[appointment.status]
                        )}
                      >
                        {getStatusIcon(appointment.status)}
                        {statusLabels[appointment.status]}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-0.5">
                      {appointment.treatmentName} • {appointment.duration} min
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.date} às {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {appointment.patientPhone}
                      </span>
                    </div>
                    {appointment.notes && (
                      <p className="text-sm text-muted-foreground mt-2 italic">
                        "{appointment.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="text-xl font-bold text-primary">{appointment.price}€</p>
                  </div>

                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      handleStatusChange(appointment.id, e.target.value as Appointment['status'])
                    }
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-sm',
                      'bg-slate-100 dark:bg-slate-700',
                      'border-none cursor-pointer',
                      'focus:outline-none focus:ring-2 focus:ring-primary/50'
                    )}
                  >
                    <option value="scheduled">Programada</option>
                    <option value="confirmed">Confirmada</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Completada</option>
                    <option value="cancelled">Cancelada</option>
                  </select>

                  <button
                    onClick={() => setSelectedAppointment(appointment)}
                    className={cn(
                      'p-2 rounded-lg',
                      'hover:bg-slate-100 dark:hover:bg-slate-700',
                      'transition-colors'
                    )}
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => openModal(appointment)}
                    className={cn(
                      'p-2 rounded-lg',
                      'hover:bg-slate-100 dark:hover:bg-slate-700',
                      'transition-colors'
                    )}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className={cn(
                      'p-2 rounded-lg',
                      'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500',
                      'transition-colors'
                    )}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sortedAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <p className="mt-4 text-lg text-muted-foreground">No se encontraron citas</p>
            <p className="text-sm text-muted-foreground">
              Crea una nueva cita para comenzar
            </p>
          </div>
        )}
      </motion.div>

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <div
                className={cn(
                  'w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl',
                  'bg-white dark:bg-slate-900',
                  'border border-white/20',
                  'backdrop-blur-xl',
                  'shadow-2xl',
                  'p-6'
                )}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold">
                    {editingAppointment ? 'Editar Cita' : 'Nueva Cita'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className={cn(
                      'p-2 rounded-lg',
                      'hover:bg-slate-100 dark:hover:bg-slate-800',
                      'transition-colors'
                    )}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Patient Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Paciente</label>
                    <select
                      required
                      value={formData.patientId}
                      onChange={(e) =>
                        setFormData({ ...formData, patientId: e.target.value })
                      }
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'border border-white/20',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        'cursor-pointer'
                      )}
                    >
                      <option value="">Seleccionar paciente</option>
                      {patients.map((patient) => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} - {patient.phone}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Treatment Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tratamiento</label>
                    <select
                      required
                      value={formData.treatmentId}
                      onChange={(e) =>
                        setFormData({ ...formData, treatmentId: e.target.value })
                      }
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'border border-white/20',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        'cursor-pointer'
                      )}
                    >
                      <option value="">Seleccionar tratamiento</option>
                      {treatments.map((treatment) => (
                        <option key={treatment.id} value={treatment.id}>
                          {treatment.name} - {treatment.duration}min - {treatment.price}€
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Fecha</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl',
                          'bg-slate-100 dark:bg-slate-800',
                          'border border-white/20',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50'
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Hora</label>
                      <input
                        type="time"
                        required
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className={cn(
                          'w-full px-4 py-2.5 rounded-xl',
                          'bg-slate-100 dark:bg-slate-800',
                          'border border-white/20',
                          'focus:outline-none focus:ring-2 focus:ring-primary/50'
                        )}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Estado</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as Appointment['status'],
                        })
                      }
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'border border-white/20',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        'cursor-pointer'
                      )}
                    >
                      <option value="scheduled">Programada</option>
                      <option value="confirmed">Confirmada</option>
                      <option value="in-progress">En Progreso</option>
                      <option value="completed">Completada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Notas</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      rows={3}
                      placeholder="Notas adicionales..."
                      className={cn(
                        'w-full px-4 py-2.5 rounded-xl resize-none',
                        'bg-slate-100 dark:bg-slate-800',
                        'border border-white/20',
                        'focus:outline-none focus:ring-2 focus:ring-primary/50',
                        'placeholder:text-muted-foreground'
                      )}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className={cn(
                        'flex-1 px-4 py-2.5 rounded-xl',
                        'bg-slate-100 dark:bg-slate-800',
                        'hover:bg-slate-200 dark:hover:bg-slate-700',
                        'transition-colors'
                      )}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        'flex-1 px-4 py-2.5 rounded-xl',
                        'bg-primary text-white font-medium',
                        'hover:opacity-90 transition-all',
                        'disabled:opacity-50'
                      )}
                    >
                      {isLoading
                        ? 'Guardando...'
                        : editingAppointment
                          ? 'Actualizar'
                          : 'Crear Cita'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Appointment Detail Modal */}
      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setSelectedAppointment(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            >
              <div
                className={cn(
                  'm-4 p-6 rounded-2xl',
                  'bg-white dark:bg-slate-900',
                  'border border-white/20',
                  'backdrop-blur-xl'
                )}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold">Detalles de la Cita</h2>
                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className={cn(
                      'p-2 rounded-lg',
                      'hover:bg-slate-100 dark:hover:bg-slate-800',
                      'transition-colors'
                    )}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-14 h-14 rounded-xl flex items-center justify-center',
                        'bg-gradient-to-br from-sky-500/20 to-indigo-500/20',
                        'text-primary'
                      )}
                    >
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedAppointment.patientName}</h3>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium mt-1',
                          statusColors[selectedAppointment.status]
                        )}
                      >
                        {getStatusIcon(selectedAppointment.status)}
                        {statusLabels[selectedAppointment.status]}
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'p-4 rounded-xl',
                      'bg-slate-100 dark:bg-slate-800/50',
                      'space-y-3'
                    )}
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span>{selectedAppointment.date}</span>
                      <span className="text-muted-foreground">às</span>
                      <span>{selectedAppointment.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span>
                        {selectedAppointment.treatmentName} - {selectedAppointment.duration} minutos
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="w-5 h-5 text-muted-foreground" />
                      <span>{selectedAppointment.patientPhone}</span>
                    </div>
                  </div>

                  {selectedAppointment.notes && (
                    <div
                      className={cn(
                        'p-4 rounded-xl',
                        'bg-amber-50 dark:bg-amber-900/20',
                        'border border-amber-200 dark:border-amber-800'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Notas
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            {selectedAppointment.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      'p-4 rounded-xl',
                      'bg-gradient-to-r from-primary/10 to-indigo-500/10',
                      'flex items-center justify-between'
                    )}
                  >
                    <span className="text-sm font-medium">Precio Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {selectedAppointment.price}€
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      openModal(selectedAppointment)
                      setSelectedAppointment(null)
                    }}
                    className={cn(
                      'flex-1 px-4 py-2.5 rounded-xl',
                      'bg-primary text-white font-medium',
                      'hover:opacity-90 transition-all'
                    )}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(selectedAppointment.id)}
                    className={cn(
                      'flex-1 px-4 py-2.5 rounded-xl',
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium',
                      'hover:bg-red-200 dark:hover:bg-red-900/50 transition-all'
                    )}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
