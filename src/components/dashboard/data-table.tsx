'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus
} from 'lucide-react'
import { cn, formatDate, getAvatarColor, getInitials } from '@/lib/utils'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Tipos de datos
interface Patient {
  id: string
  name: string
  email: string
  phone: string
  lastVisit: string
  status: 'active' | 'pending' | 'inactive'
  treatments: number
  totalSpent: number
}

interface DataTableProps {
  title: string
  data: Patient[]
  onEdit?: (patient: Patient) => void
  onView?: (patient: Patient) => void
  onDelete?: (patient: Patient) => void
  onAdd?: () => void
}

/**
 * Tabla de datos premium con búsqueda, filtros y paginación
 */
export function DataTable({ 
  title, 
  data, 
  onEdit, 
  onView, 
  onDelete,
  onAdd 
}: DataTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortField, setSortField] = React.useState<keyof Patient>('name')
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const itemsPerPage = 10

  // Datos de ejemplo
  const patients: Patient[] = data.length > 0 ? data : [
    { id: '1', name: 'María García López', email: 'maria.garcia@email.com', phone: '+34 612 345 678', lastVisit: '2024-01-15', status: 'active', treatments: 8, totalSpent: 2450 },
    { id: '2', name: 'Ana Martínez Ruiz', email: 'ana.martinez@email.com', phone: '+34 623 456 789', lastVisit: '2024-01-12', status: 'active', treatments: 5, totalSpent: 1200 },
    { id: '3', name: 'Carlos Sánchez Torres', email: 'carlos.sanchez@email.com', phone: '+34 634 567 890', lastVisit: '2024-01-10', status: 'pending', treatments: 3, totalSpent: 850 },
    { id: '4', name: 'Laura Díaz Hernández', email: 'laura.diaz@email.com', phone: '+34 645 678 901', lastVisit: '2024-01-08', status: 'active', treatments: 12, totalSpent: 3800 },
    { id: '5', name: 'Pedro Gómez Ruiz', email: 'pedro.gomez@email.com', phone: '+34 656 789 012', lastVisit: '2024-01-05', status: 'inactive', treatments: 2, totalSpent: 450 },
    { id: '6', name: 'Sofia Fernández Mora', email: 'sofia.fernandez@email.com', phone: '+34 667 890 123', lastVisit: '2024-01-03', status: 'active', treatments: 6, totalSpent: 1800 },
    { id: '7', name: 'Miguel Ángel López', email: 'miguel.lopez@email.com', phone: '+34 678 901 234', lastVisit: '2024-01-01', status: 'active', treatments: 4, totalSpent: 980 },
    { id: '8', name: 'Elena Rodríguez Gil', email: 'elena.rodriguez@email.com', phone: '+34 689 012 345', lastVisit: '2023-12-28', status: 'pending', treatments: 1, totalSpent: 250 },
    { id: '9', name: 'Javier Navarro Serrano', email: 'javier.navarro@email.com', phone: '+34 690 123 456', lastVisit: '2023-12-25', status: 'active', treatments: 7, totalSpent: 2100 },
    { id: '10', name: 'Carmen Castillo Vega', email: 'carmen.castillo@email.com', phone: '+34 601 234 567', lastVisit: '2023-12-22', status: 'inactive', treatments: 3, totalSpent: 650 },
    { id: '11', name: 'David Morales Pérez', email: 'david.morales@email.com', phone: '+34 602 345 678', lastVisit: '2023-12-20', status: 'active', treatments: 9, totalSpent: 2750 },
    { id: '12', name: 'Isabel Torres Rivera', email: 'isabel.torres@email.com', phone: '+34 603 456 789', lastVisit: '2023-12-18', status: 'active', treatments: 6, totalSpent: 1650 },
  ]

  // Filtrado
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Ordenamiento
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    return sortDirection === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number)
  })

  // Paginación
  const totalPages = Math.ceil(sortedPatients.length / itemsPerPage)
  const paginatedPatients = sortedPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Manejadores
  const handleSort = (field: keyof Patient) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const getStatusBadge = (status: Patient['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
    }
    
    const labels = {
      active: 'Activo',
      pending: 'Pendiente',
      inactive: 'Inactivo',
    }

    return (
      <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    )
  }

  return (
    <GlassCard padding="none" hover={false}>
      {/* Header de la tabla */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {sortedPatients.length} pacientes encontrados
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {onAdd && (
              <Button onClick={onAdd} variant="shimmer" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo paciente
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value)
                setCurrentPage(1)
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="pending">Pendiente</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Paciente
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                Contacto
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                <button
                  onClick={() => handleSort('lastVisit')}
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  Última visita
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                Estado
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground hidden lg:table-cell">
                <button
                  onClick={() => handleSort('totalSpent')}
                  className="flex items-center gap-2 ml-auto hover:text-foreground transition-colors"
                >
                  Gasto total
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">
                Acciones
              </th>
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
                      <p className="text-xs text-muted-foreground hidden sm:block">
                        {patient.treatments} tratamientos
                      </p>
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
                  {getStatusBadge(patient.status)}
                </td>
                <td className="p-4 hidden lg:table-cell text-right font-medium">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(patient.totalSpent)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    {onView && (
                      <button
                        onClick={() => onView(patient)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(patient)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(patient)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    )}
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
    </GlassCard>
  )
}
