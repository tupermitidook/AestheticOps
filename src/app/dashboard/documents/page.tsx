'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
      FileText, Upload, Download, Trash2, Search,
      File, FolderOpen, MoreVertical
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Doc {
      id: string
      name: string
      type: 'pdf' | 'doc' | 'img'
      size: string
      date: string
      category: string
}

const MOCK_DOCS: Doc[] = [
      { id: '1', name: 'Consentimiento Informado - Botox.pdf', type: 'pdf', size: '2.4 MB', date: '2024-01-15', category: 'Legal' },
      { id: '2', name: 'Instrucciones Post-Peeling.pdf', type: 'pdf', size: '1.1 MB', date: '2024-01-10', category: 'Pacientes' },
      { id: '3', name: 'Plantilla Historia Clínica.docx', type: 'doc', size: '500 KB', date: '2023-12-20', category: 'Administración' },
      { id: '4', name: 'Lista de Precios 2024.pdf', type: 'pdf', size: '3.2 MB', date: '2024-01-01', category: 'Administración' },
      { id: '5', name: 'Foto Antes/Después - Caso 124.jpg', type: 'img', size: '4.5 MB', date: '2024-01-18', category: 'Clínico' },
]

export default function DocumentsPage() {
      const [docs, setDocs] = React.useState<Doc[]>(MOCK_DOCS)
      const [searchQuery, setSearchQuery] = React.useState('')
      const [activeTab, setActiveTab] = React.useState('Todos')

      const handleDelete = (id: string) => {
            if (confirm('¿Estás seguro?')) {
                  setDocs(docs.filter(d => d.id !== id))
                  toast.success('Documento eliminado')
            }
      }

      const filteredDocs = docs.filter(doc =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (activeTab === 'Todos' || doc.category === activeTab)
      )

      const getIcon = (type: string) => {
            switch (type) {
                  case 'pdf': return <FileText className="w-8 h-8 text-rose-500" />
                  case 'doc': return <FileText className="w-8 h-8 text-blue-500" />
                  case 'img': return <File className="w-8 h-8 text-purple-500" />
                  default: return <File className="w-8 h-8 text-slate-500" />
            }
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
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                          <div>
                                                <h1 className="text-3xl font-heading font-bold">Documentos</h1>
                                                <p className="text-muted-foreground mt-1">Biblioteca digital de tu clínica</p>
                                          </div>
                                          <Button onClick={() => toast.info('Función de subida simulada')}>
                                                <Upload className="w-4 h-4 mr-2" />
                                                Subir Documento
                                          </Button>
                                    </div>
                              </motion.div>

                              {/* Search and Filter */}
                              <GlassCard className="mb-6 p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                          <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                      type="text"
                                                      placeholder="Buscar documentos..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                          </div>
                                          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                                                {['Todos', 'Legal', 'Pacientes', 'Administración', 'Clínico'].map(tab => (
                                                      <button
                                                            key={tab}
                                                            onClick={() => setActiveTab(tab)}
                                                            className={cn(
                                                                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                                                                  activeTab === tab
                                                                        ? 'bg-white dark:bg-slate-700 shadow-sm text-foreground'
                                                                        : 'text-muted-foreground hover:text-foreground'
                                                            )}
                                                      >
                                                            {tab}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                              </GlassCard>

                              {/* Grid View */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredDocs.map((doc, index) => (
                                          <motion.div
                                                key={doc.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                          >
                                                <GlassCard className="group h-full flex flex-col hover:border-primary/50 transition-colors">
                                                      <div className="p-6 flex-1 flex flex-col items-center text-center">
                                                            <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                                  {getIcon(doc.type)}
                                                            </div>
                                                            <h3 className="font-semibold text-sm line-clamp-2 mb-1">{doc.name}</h3>
                                                            <p className="text-xs text-muted-foreground">{doc.size} • {doc.date}</p>
                                                      </div>
                                                      <div className="border-t border-slate-100 dark:border-slate-800 p-2 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                                                            <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => toast.success('Descargando...')}>
                                                                  <Download className="w-3 h-3 mr-2" />
                                                                  Descargar
                                                            </Button>
                                                            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2" />
                                                            <Button variant="ghost" size="sm" className="w-10 px-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => handleDelete(doc.id)}>
                                                                  <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                      </div>
                                                </GlassCard>
                                          </motion.div>
                                    ))}

                                    {/* Upload Placeholder */}
                                    <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center p-6 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all h-[240px]">
                                          <Upload className="w-8 h-8 mb-2" />
                                          <span className="font-medium text-sm">Subir nuevo archivo</span>
                                    </button>
                              </div>
                        </main>
                  </div>
            </div>
      )
}
