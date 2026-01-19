'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/api-service'
import { cn } from '@/lib/utils'
import {
  Download, FileText, Plus, Filter, Search, Calendar,
  CheckCircle, Clock, XCircle, Euro
} from 'lucide-react'

interface Invoice {
  id: string
  invoiceNumber: string
  patientName: string
  amount: number
  tax: number
  total: number
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  dueDate: string
  createdAt: string
}

export default function BillingPage() {
  const { user } = useAuth()
  const [invoices, setInvoices] = React.useState<Invoice[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [showInvoiceModal, setShowInvoiceModal] = React.useState(false)

  React.useEffect(() => {
    loadInvoices()
  }, [])

  const loadInvoices = async () => {
    try {
      const response = await fetch('/api/billing/invoices')
      if (response.ok) {
        const data = await response.json()
        setInvoices(data)
      }
    } catch (error) {
      toast.error('Error al cargar facturas')
    } finally {
      setLoading(false)
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'pending':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
      case 'overdue':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      case 'cancelled':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
    }
  }

  const getStatusLabel = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'Pagada'
      case 'pending':
        return 'Pendiente'
      case 'overdue':
        return 'Vencida'
      case 'cancelled':
        return 'Cancelada'
    }
  }

  const getStatusIcon = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'overdue':
        return <XCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
    }
  }

  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0)

  const pendingAmount = invoices
    .filter(inv => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.total, 0)

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-bold">Facturación</h1>
                <p className="text-muted-foreground mt-1">
                  Gestiona las facturas y pagos de tu clínica
                </p>
              </div>
              <Button onClick={() => setShowInvoiceModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Factura
              </Button>
            </div>
          </motion.div>

          {/* Invoice Modal */}
          {showInvoiceModal && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowInvoiceModal(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Nueva Factura</h2>
                  <button onClick={() => setShowInvoiceModal(false)}>
                    <XCircle className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Paciente</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary outline-none" placeholder="Buscar paciente..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Concepto</label>
                    <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary outline-none" placeholder="Consulta dermatológica" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1.5">Importe (€)</label>
                      <input type="number" className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary outline-none" placeholder="0.00" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1.5">Fecha Venc.</label>
                      <input type="date" className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setShowInvoiceModal(false)}>Cancelar</Button>
                    <Button onClick={() => {
                      toast.success('Factura creada correctamente');
                      setShowInvoiceModal(false);
                    }}>Crear Factura</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                  <p className="text-2xl font-bold mt-1">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(totalRevenue)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Euro className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pendiente</p>
                  <p className="text-2xl font-bold mt-1">
                    {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(pendingAmount)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Facturas</p>
                  <p className="text-2xl font-bold mt-1">{invoices.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Filters */}
          <GlassCard className="mb-6 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar facturas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos los estados</option>
                <option value="paid">Pagadas</option>
                <option value="pending">Pendientes</option>
                <option value="overdue">Vencidas</option>
                <option value="cancelled">Canceladas</option>
              </select>
            </div>
          </GlassCard>

          {/* Invoices List */}
          <GlassCard>
            {loading ? (
              <div className="p-6 text-center text-muted-foreground">
                Cargando facturas...
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg text-muted-foreground">No se encontraron facturas</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Crea tu primera factura para comenzar
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left p-4 font-medium text-muted-foreground">Factura</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Paciente</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Fecha</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Vencimiento</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Total</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((invoice, index) => (
                      <motion.tr
                        key={invoice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="p-4">
                          <p className="font-medium">{invoice.invoiceNumber}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium">{invoice.patientName}</p>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(invoice.createdAt).toLocaleDateString('es-ES')}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(invoice.dueDate).toLocaleDateString('es-ES')}
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                            getStatusColor(invoice.status)
                          )}>
                            {getStatusIcon(invoice.status)}
                            {getStatusLabel(invoice.status)}
                          </span>
                        </td>
                        <td className="p-4 text-right font-medium">
                          {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(invoice.total)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toast.info('Descargando factura...')}
                              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </main>
      </div>
    </div>
  )
}
