'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
      Plus, Search, Filter, MoreVertical, Clock,
      Banknote, Tag, Syringe, Sparkles, X, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Treatment {
      id: string
      name: string
      description: string
      duration: number // minutes
      price: number
      category: 'facial' | 'corporal' | 'capilar' | 'consulta'
      popular: boolean
}

const INITIAL_TREATMENTS: Treatment[] = [
      { id: '1', name: 'Toxina Botulínica (3 zonas)', description: 'Tratamiento completo tercio superior', duration: 30, price: 350, category: 'facial', popular: true },
      { id: '2', name: 'Rinomodelación', description: 'Corrección nasal sin cirugía con ácido hialurónico', duration: 45, price: 450, category: 'facial', popular: true },
      { id: '3', name: 'Mesoterapia Facial', description: 'Cóctel de vitaminas para luminosidad', duration: 30, price: 120, category: 'facial', popular: false },
      { id: '4', name: 'Drenaje Linfático', description: 'Masaje corporal para retención de líquidos', duration: 60, price: 80, category: 'corporal', popular: false },
      { id: '5', name: 'PRP Capilar', description: 'Plasma Rico en Plaquetas para fortalecimiento', duration: 45, price: 200, category: 'capilar', popular: false },
      { id: '6', name: 'Primera Consulta', description: 'Valoración inicial y plan de tratamiento', duration: 30, price: 50, category: 'consulta', popular: false },
]

export default function TreatmentsPage() {
      const [treatments, setTreatments] = React.useState<Treatment[]>(INITIAL_TREATMENTS)
      const [searchQuery, setSearchQuery] = React.useState('')
      const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
      const [showModal, setShowModal] = React.useState(false)
      const [loading, setLoading] = React.useState(false)

      // New Treatment Form State
      const [newTreatment, setNewTreatment] = React.useState<Partial<Treatment>>({
            name: '', description: '', price: 0, duration: 30, category: 'facial', popular: false
      })

      const filteredTreatments = treatments.filter(t => {
            const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory
            return matchesSearch && matchesCategory
      })

      const handleAddTreatment = (e: React.FormEvent) => {
            e.preventDefault()
            setLoading(true)
            setTimeout(() => {
                  const treatment: Treatment = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: newTreatment.name || 'Nuevo tratamiento',
                        description: newTreatment.description || '',
                        price: Number(newTreatment.price) || 0,
                        duration: Number(newTreatment.duration) || 30,
                        category: newTreatment.category as any,
                        popular: newTreatment.popular || false
                  }
                  setTreatments([...treatments, treatment])
                  setShowModal(false)
                  setLoading(false)
                  setNewTreatment({ name: '', description: '', price: 0, duration: 30, category: 'facial', popular: false })
                  toast.success('Tratamiento añadido correctamente')
            }, 1000)
      }

      const getCategoryColor = (category: string) => {
            const colors: Record<string, string> = {
                  facial: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
                  corporal: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
                  capilar: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                  consulta: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
            }
            return colors[category] || colors.consulta
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
                                                <h1 className="text-3xl font-heading font-bold">Tratamientos</h1>
                                                <p className="text-muted-foreground mt-1">Gestiona tu catálogo de servicios</p>
                                          </div>
                                          <Button onClick={() => setShowModal(true)} className="shadow-lg shadow-primary/20">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Nuevo Tratamiento
                                          </Button>
                                    </div>
                              </motion.div>

                              <GlassCard className="mb-6 p-4">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                          <div className="relative flex-1">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <input
                                                      type="text"
                                                      placeholder="Buscar tratamientos..."
                                                      value={searchQuery}
                                                      onChange={(e) => setSearchQuery(e.target.value)}
                                                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                                                />
                                          </div>
                                          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                                {['all', 'facial', 'corporal', 'capilar', 'consulta'].map(cat => (
                                                      <button
                                                            key={cat}
                                                            onClick={() => setSelectedCategory(cat)}
                                                            className={cn(
                                                                  'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors',
                                                                  selectedCategory === cat
                                                                        ? 'bg-primary text-primary-foreground'
                                                                        : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700'
                                                            )}
                                                      >
                                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                              </GlassCard>

                              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredTreatments.map((treatment, index) => (
                                          <motion.div
                                                key={treatment.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                          >
                                                <GlassCard className="h-full hover:border-primary/50 transition-colors group relative overflow-hidden">
                                                      {treatment.popular && (
                                                            <div className="absolute top-0 right-0 p-4">
                                                                  <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                                                                        <Sparkles className="w-3 h-3" />
                                                                        Popular
                                                                  </span>
                                                            </div>
                                                      )}

                                                      <div className="p-6">
                                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                                  <Syringe className="w-6 h-6 text-primary" />
                                                            </div>

                                                            <h3 className="text-xl font-bold mb-2 pr-16">{treatment.name}</h3>
                                                            <p className="text-muted-foreground text-sm mb-6 line-clamp-2 h-10">
                                                                  {treatment.description}
                                                            </p>

                                                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                                                  <div className="flex flex-col">
                                                                        <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                                                              <Clock className="w-3 h-3" /> Duración
                                                                        </span>
                                                                        <span className="font-semibold">{treatment.duration} min</span>
                                                                  </div>
                                                                  <div className="flex flex-col text-right">
                                                                        <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                                                                              <Banknote className="w-3 h-3" /> Precio
                                                                        </span>
                                                                        <span className="font-bold text-lg text-primary">
                                                                              {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(treatment.price)}
                                                                        </span>
                                                                  </div>
                                                            </div>

                                                            <div className="mt-4 pt-4 flex items-center justify-between">
                                                                  <span className={cn('px-2 py-1 rounded-lg text-xs font-medium capitalize', getCategoryColor(treatment.category))}>
                                                                        {treatment.category}
                                                                  </span>
                                                                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                                                                        Editar
                                                                  </Button>
                                                            </div>
                                                      </div>
                                                </GlassCard>
                                          </motion.div>
                                    ))}
                              </div>

                              <AnimatePresence>
                                    {showModal && (
                                          <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                                                onClick={() => setShowModal(false)}
                                          >
                                                <div onClick={e => e.stopPropagation()} className="w-full max-w-lg">
                                                      <GlassCard className="overflow-hidden">
                                                            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                                                                  <h2 className="text-xl font-bold">Nuevo Tratamiento</h2>
                                                                  <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                                        <X className="w-5 h-5" />
                                                                  </button>
                                                            </div>

                                                            <form onSubmit={handleAddTreatment} className="p-6 space-y-4">
                                                                  <div>
                                                                        <label className="block text-sm font-medium mb-1.5">Nombre del tratamiento</label>
                                                                        <input
                                                                              required
                                                                              value={newTreatment.name}
                                                                              onChange={e => setNewTreatment({ ...newTreatment, name: e.target.value })}
                                                                              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                                              placeholder="Ej: Botox Full Face"
                                                                        />
                                                                  </div>

                                                                  <div>
                                                                        <label className="block text-sm font-medium mb-1.5">Descripción</label>
                                                                        <textarea
                                                                              value={newTreatment.description}
                                                                              onChange={e => setNewTreatment({ ...newTreatment, description: e.target.value })}
                                                                              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none h-24"
                                                                              placeholder="Descripción breve del procedimiento..."
                                                                        />
                                                                  </div>

                                                                  <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                              <label className="block text-sm font-medium mb-1.5">Precio (€)</label>
                                                                              <div className="relative">
                                                                                    <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                                    <input
                                                                                          type="number"
                                                                                          required
                                                                                          value={newTreatment.price}
                                                                                          onChange={e => setNewTreatment({ ...newTreatment, price: Number(e.target.value) })}
                                                                                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                                                          placeholder="0.00"
                                                                                    />
                                                                              </div>
                                                                        </div>
                                                                        <div>
                                                                              <label className="block text-sm font-medium mb-1.5">Duración (min)</label>
                                                                              <div className="relative">
                                                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                                                    <input
                                                                                          type="number"
                                                                                          required
                                                                                          value={newTreatment.duration}
                                                                                          onChange={e => setNewTreatment({ ...newTreatment, duration: Number(e.target.value) })}
                                                                                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                                                          placeholder="30"
                                                                                    />
                                                                              </div>
                                                                        </div>
                                                                  </div>

                                                                  <div className="grid grid-cols-2 gap-4">
                                                                        <div>
                                                                              <label className="block text-sm font-medium mb-1.5">Categoría</label>
                                                                              <select
                                                                                    value={newTreatment.category}
                                                                                    onChange={e => setNewTreatment({ ...newTreatment, category: e.target.value as any })}
                                                                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                                                              >
                                                                                    <option value="facial">Facial</option>
                                                                                    <option value="corporal">Corporal</option>
                                                                                    <option value="capilar">Capilar</option>
                                                                                    <option value="consulta">Consulta</option>
                                                                              </select>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 pt-6">
                                                                              <input
                                                                                    type="checkbox"
                                                                                    checked={newTreatment.popular}
                                                                                    onChange={e => setNewTreatment({ ...newTreatment, popular: e.target.checked })}
                                                                                    className="w-5 h-5 text-primary rounded focus:ring-primary"
                                                                                    id="popular-check"
                                                                              />
                                                                              <label htmlFor="popular-check" className="text-sm font-medium cursor-pointer">Marcar como popular</label>
                                                                        </div>
                                                                  </div>

                                                                  <div className="pt-4 flex justify-end gap-3">
                                                                        <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button>
                                                                        <Button type="submit" disabled={loading}>
                                                                              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                                                                              Guardar Tratamiento
                                                                        </Button>
                                                                  </div>
                                                            </form>
                                                      </GlassCard>
                                                </div>
                                          </motion.div>
                                    )}
                              </AnimatePresence>
                        </main>
                  </div>
            </div>
      )
}
