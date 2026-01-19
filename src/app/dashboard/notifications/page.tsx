'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Bell, Check, Clock, Calendar } from 'lucide-react'

export default function NotificationsPage() {
      const notifications = [
            { id: 1, title: 'Nueva cita confirmada', desc: 'María G. para Botox - Mañana 10:00', time: 'Hace 5 min', unread: true },
            { id: 2, title: 'Stock bajo', desc: 'Quedan menos de 5 viales de Ácido Hialurónico', time: 'Hace 2 horas', unread: true },
            { id: 3, title: 'Prueba gratuita por terminar', desc: 'Te quedan 3 días de prueba.', time: 'Hace 1 día', unread: false },
      ]

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
                                    <h1 className="text-3xl font-heading font-bold">Notificaciones</h1>
                              </motion.div>

                              <GlassCard className="max-w-3xl">
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                          {notifications.map((n) => (
                                                <div key={n.id} className={`p-4 flex gap-4 ${n.unread ? 'bg-primary/5' : ''}`}>
                                                      <div className="mt-1">
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                                  <Bell className="w-4 h-4 text-primary" />
                                                            </div>
                                                      </div>
                                                      <div className="flex-1">
                                                            <div className="flex justify-between items-start">
                                                                  <h3 className="font-semibold text-sm">{n.title}</h3>
                                                                  <span className="text-xs text-muted-foreground">{n.time}</span>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground mt-1">{n.desc}</p>
                                                      </div>
                                                </div>
                                          ))}
                                          {notifications.length === 0 && (
                                                <div className="p-8 text-center text-muted-foreground">
                                                      No tienes notificaciones
                                                </div>
                                          )}
                                    </div>
                              </GlassCard>
                        </main>
                  </div>
            </div>
      )
}
