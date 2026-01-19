'use client'

import React from 'react'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import {
      HelpCircle, MessageCircle, FileText, Mail,
      ChevronRight, Book, Shield, Zap, Bell, CreditCard
} from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const GUIDES = [
      {
            title: 'Primeros Pasos',
            description: 'Aprende a configurar tu clínica y añadir tu primer equipo.',
            icon: Zap,
            color: 'text-amber-500',
            content: 'Para empezar, ve a Configuración > Clínica y completa los datos. Luego, en la sección Pacientes, puedes importar tu base actual mediante el botón Exportar/Importar.'
      },
      {
            title: 'Gestión Financiera',
            description: 'Entiende el ROAS y cómo trackear tus beneficios.',
            icon: CreditCard,
            color: 'text-emerald-500',
            content: 'En Finanzas, comparamos tu gasto publicitario (Ads) con los tratamientos realizados vinculados a ese canal. Asegúrate de marcar el canal de origen en cada ficha de paciente.'
      },
      {
            title: 'Notificaciones y Citas',
            description: 'Configurar recordatorios automáticos por WhatsApp.',
            icon: Bell,
            color: 'text-blue-500',
            content: 'AestheticOps envía recordatorios 24h antes. Puedes personalizar el mensaje en Configuración > Notificaciones.'
      },
      {
            title: 'Privacidad y Seguridad',
            description: 'Cumplimiento de RGPD y protección de datos médicos.',
            icon: Shield,
            color: 'text-rose-500',
            content: 'Todos los documentos subidos están cifrados en reposo. Solo los administradores con el rol adecuado pueden ver historiales clínicos completos.'
      }
]

export default function HelpPage() {
      const [selectedGuide, setSelectedGuide] = React.useState<any>(null)

      return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
                  <Sidebar />
                  <div className="lg:ml-[280px] transition-all duration-300">
                        <DashboardHeader />

                        <main className="p-6 max-w-5xl mx-auto">
                              <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-8"
                              >
                                    <h1 className="text-3xl font-heading font-bold">Centro de Ayuda</h1>
                                    <p className="text-muted-foreground mt-1">Todo lo que necesitas para dominar AestheticOps</p>
                              </motion.div>

                              {/* Quick Support */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                    <SupportCard
                                          icon={Book}
                                          title="Documentación"
                                          desc="Guías detalladas de uso"
                                          action="Explorar todo"
                                          onClick={() => toast.info('Cargando base de conocimiento...')}
                                    />
                                    <SupportCard
                                          icon={MessageCircle}
                                          title="Chat con Soporte"
                                          desc="Respuesta en < 5 min"
                                          action="Hablar ahora"
                                          color="text-emerald-500"
                                          onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat'))}
                                    />
                                    <SupportCard
                                          icon={Mail}
                                          title="Soporte Email"
                                          desc="soporte@aestheticops.com"
                                          action="Enviar ticket"
                                          color="text-blue-500"
                                          onClick={() => window.location.href = 'mailto:soporte@aestheticops.com'}
                                    />
                              </div>

                              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Guías Destacadas
                              </h2>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {GUIDES.map((guide, idx) => (
                                          <GlassCard
                                                key={idx}
                                                className="p-6 cursor-pointer hover:border-primary/40 transition-all group"
                                                onClick={() => setSelectedGuide(selectedGuide === guide ? null : guide)}
                                          >
                                                <div className="flex items-start justify-between">
                                                      <div className="flex gap-4">
                                                            <div className={cn("p-3 rounded-2xl bg-slate-100 dark:bg-slate-800", guide.color)}>
                                                                  <guide.icon className="w-6 h-6" />
                                                            </div>
                                                            <div>
                                                                  <h3 className="font-bold">{guide.title}</h3>
                                                                  <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                                                            </div>
                                                      </div>
                                                      <ChevronRight className={cn(
                                                            "w-5 h-5 text-muted-foreground transition-transform",
                                                            selectedGuide === guide ? "rotate-90" : ""
                                                      )} />
                                                </div>

                                                {selectedGuide === guide && (
                                                      <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800"
                                                      >
                                                            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                                                  {guide.content}
                                                            </p>
                                                            <button className="text-primary text-xs font-bold mt-4 hover:underline">
                                                                  Ver tutorial completo →
                                                            </button>
                                                      </motion.div>
                                                )}
                                          </GlassCard>
                                    ))}
                              </div>

                              <div className="mt-12 p-8 rounded-[2rem] bg-indigo-600 text-white flex flex-col items-center text-center">
                                    <Zap className="w-12 h-12 mb-4 text-amber-300 fill-amber-300" />
                                    <h2 className="text-2xl font-bold mb-2">¿Necesitas una formación personalizada?</h2>
                                    <p className="text-indigo-100 mb-6 max-w-md">Para clínicas con más de 10 empleados ofrecemos demos guiadas y setup prioritario.</p>
                                    <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 rounded-2xl">
                                          Agendar con un experto
                                    </Button>
                              </div>
                        </main>
                  </div>
            </div>
      )
}

function SupportCard({ icon: Icon, title, desc, action, onClick, color }: any) {
      return (
            <GlassCard className="p-6 flex flex-col items-center text-center group cursor-pointer" onClick={onClick}>
                  <div className={cn("w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", color)}>
                        <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{desc}</p>
                  <span className="text-xs font-bold text-primary">{action} →</span>
            </GlassCard>
      )
}
