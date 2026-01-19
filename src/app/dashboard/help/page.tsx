'use client'

import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { HelpCircle, MessageCircle, FileText, Mail } from 'lucide-react'

export default function HelpPage() {
      return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                  <Sidebar />
                  <div className="lg:ml-[280px] transition-all duration-300">
                        <DashboardHeader />
                        <main className="p-6">
                              <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <GlassCard className="p-6 text-center hover:border-primary/50 transition-colors">
                                          <FileText className="w-10 h-10 mx-auto text-primary mb-4" />
                                          <h3 className="font-bold mb-2">Documentación</h3>
                                          <p className="text-sm text-muted-foreground mb-4">Guías paso a paso para usar la plataforma.</p>
                                          <button className="text-primary text-sm font-medium">Ver guías</button>
                                    </GlassCard>
                                    <GlassCard className="p-6 text-center hover:border-primary/50 transition-colors">
                                          <MessageCircle className="w-10 h-10 mx-auto text-green-500 mb-4" />
                                          <h3 className="font-bold mb-2">Chat Soporte</h3>
                                          <p className="text-sm text-muted-foreground mb-4">Habla con un agente en tiempo real.</p>
                                          <button className="text-primary text-sm font-medium">Iniciar chat</button>
                                    </GlassCard>
                                    <GlassCard className="p-6 text-center hover:border-primary/50 transition-colors">
                                          <Mail className="w-10 h-10 mx-auto text-blue-500 mb-4" />
                                          <h3 className="font-bold mb-2">Email</h3>
                                          <p className="text-sm text-muted-foreground mb-4">soporte@aestheticops.com</p>
                                          <button className="text-primary text-sm font-medium">Enviar correo</button>
                                    </GlassCard>
                              </div>
                        </main>
                  </div>
            </div>
      )
}
