'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Users, Package, Calendar, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export function GlobalSearch() {
      const [isOpen, setIsOpen] = React.useState(false)
      const [query, setQuery] = React.useState('')
      const [results, setResults] = React.useState<any[]>([])
      const router = useRouter()
      const inputRef = React.useRef<HTMLInputElement>(null)

      React.useEffect(() => {
            const handleOpen = () => {
                  setIsOpen(true)
                  setTimeout(() => inputRef.current?.focus(), 100)
            }
            const handleKeyDown = (e: KeyboardEvent) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                        e.preventDefault()
                        handleOpen()
                  }
                  if (e.key === 'Escape') setIsOpen(false)
            }

            window.addEventListener('keydown', handleKeyDown)
            window.addEventListener('open-global-search', handleOpen)
            return () => {
                  window.removeEventListener('keydown', handleKeyDown)
                  window.removeEventListener('open-global-search', handleOpen)
            }
      }, [])

      React.useEffect(() => {
            if (query.length < 2) {
                  setResults([])
                  return
            }

            // Mock search logic
            const mockData = [
                  { id: '1', title: 'María García López', type: 'paciente', href: '/dashboard/patients' },
                  { id: '2', title: 'Ana Martínez Ruiz', type: 'paciente', href: '/dashboard/patients' },
                  { id: '3', title: 'Botox Full Face', type: 'tratamiento', href: '/dashboard/treatments' },
                  { id: '4', title: 'Limpieza Facial Profunda', type: 'tratamiento', href: '/dashboard/treatments' },
                  { id: '5', title: 'Cita con Juan P.', type: 'cita', href: '/dashboard/appointments' },
            ]

            const filtered = mockData.filter(item =>
                  item.title.toLowerCase().includes(query.toLowerCase())
            )
            setResults(filtered)
      }, [query])

      const navigate = (href: string) => {
            router.push(href)
            setIsOpen(false)
            setQuery('')
      }

      return (
            <AnimatePresence>
                  {isOpen && (
                        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
                              <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
                                    onClick={() => setIsOpen(false)}
                              />

                              <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                    className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative z-10"
                              >
                                    <div className="p-4 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800">
                                          <Search className="w-6 h-6 text-primary" />
                                          <input
                                                ref={inputRef}
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                placeholder="Busca pacientes, tratamientos, citas..."
                                                className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                                          />
                                          <button
                                                onClick={() => setIsOpen(false)}
                                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                                          >
                                                <X className="w-5 h-5" />
                                          </button>
                                    </div>

                                    <div className="max-h-[60vh] overflow-y-auto p-2">
                                          {results.length > 0 ? (
                                                <div className="space-y-1">
                                                      {results.map((result) => (
                                                            <button
                                                                  key={result.id}
                                                                  onClick={() => navigate(result.href)}
                                                                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-left"
                                                            >
                                                                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                                                        {result.type === 'paciente' && <Users className="w-5 h-5 text-blue-500" />}
                                                                        {result.type === 'tratamiento' && <Package className="w-5 h-5 text-purple-500" />}
                                                                        {result.type === 'cita' && <Calendar className="w-5 h-5 text-emerald-500" />}
                                                                  </div>
                                                                  <div className="flex-1">
                                                                        <p className="font-semibold">{result.title}</p>
                                                                        <p className="text-xs text-muted-foreground capitalize">{result.type}</p>
                                                                  </div>
                                                                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                                            </button>
                                                      ))}
                                                </div>
                                          ) : query.length >= 2 ? (
                                                <div className="p-12 text-center text-muted-foreground">
                                                      No se encontraron resultados para "{query}"
                                                </div>
                                          ) : (
                                                <div className="p-8 text-center text-muted-foreground text-sm">
                                                      Prueba buscando "María", "Botox" o "Cita"
                                                </div>
                                          )}
                                    </div>

                                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-muted-foreground">
                                          <div className="flex gap-4">
                                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">ENTER</kbd> para seleccionar</span>
                                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">ESC</kbd> para cerrar</span>
                                          </div>
                                          <span className="font-medium">Global Intelligent Search</span>
                                    </div>
                              </motion.div>
                        </div>
                  )}
            </AnimatePresence>
      )
}
