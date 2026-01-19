'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const INITIAL_MESSAGE = {
      id: '1',
      role: 'bot',
      content: '¡Hola! Soy Aesthie, tu asistente de IA. ¿En qué puedo ayudarte hoy con la gestión de tu clínica?'
}

export function AIAgent() {
      const [isOpen, setIsOpen] = React.useState(false)
      const [messages, setMessages] = React.useState([INITIAL_MESSAGE])
      const [input, setInput] = React.useState('')
      const [isTyping, setIsTyping] = React.useState(false)
      const scrollRef = React.useRef<HTMLDivElement>(null)

      React.useEffect(() => {
            const handleOpen = () => setIsOpen(true)
            window.addEventListener('open-ai-chat', handleOpen)
            return () => window.removeEventListener('open-ai-chat', handleOpen)
      }, [])

      React.useEffect(() => {
            if (scrollRef.current) {
                  scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }
      }, [messages, isTyping])

      const handleSend = async () => {
            if (!input.trim()) return

            const userMsg = { id: Date.now().toString(), role: 'user', content: input }
            setMessages(prev => [...prev, userMsg])
            setInput('')
            setIsTyping(true)

            // Simulate intelligent processing
            setTimeout(() => {
                  const q = input.toLowerCase()
                  let response = ''

                  // Knowledge Base
                  const prices = {
                        botox: 350,
                        rellenos: 450,
                        facial: 180,
                        limpieza: 120,
                        mesoterapia: 200
                  }

                  // Intelligent Pattern Matching
                  if (q.match(/hola|buenos|días|tardes/)) {
                        response = '¡Hola! Soy Aesthie, tu asistente clínico avanzado. ¿Quieres que revise tu agenda de hoy o analice el rendimiento de tus campañas?'
                  }
                  else if (q.match(/precio|costo|cuánto|vale/)) {
                        const foundTreatment = Object.keys(prices).find(t => q.includes(t))
                        if (foundTreatment) {
                              response = `El tratamiento de ${foundTreatment} tiene un valor de ${prices[foundTreatment as keyof typeof prices]}€. ¿Te gustaría agendar una cita para esto?`
                        } else {
                              response = 'Puedo darte precios de: Botox, Rellenos, Facial, Limpieza y Mesoterapia. ¿Cuál te interesa consultar?'
                        }
                  }
                  else if (q.match(/cita|agenda|horario/)) {
                        response = 'He accedido a tu agenda en tiempo real. Tienes 3 citas confirmadas para hoy y 2 pendientes de confirmación. El Dr. Martínez tiene un hueco libre a las 16:30. ¿Quieres que bloquee ese espacio?'
                  }
                  else if (q.match(/paciente|cliente/)) {
                        response = 'Entendido. Para gestionar pacientes, puedes usar el comando rápido "Buscar Paciente" o ir a la pestaña Pacientes. ¿Buscas a alguien en específico para ver su historial?'
                  }
                  else if (q.match(/marketing|ads|instagram|tik/)) {
                        response = 'Tus campañas están rindiendo al 150%. Instagram Ads tiene el mejor ROI este mes. Te recomiendo mantener el presupuesto actual. ¿Quieres ver el reporte detallado en la sección de Finanzas?'
                  }
                  else if (q.match(/factura|cobrar|dinero/)) {
                        response = 'He detectado 2 facturas vencidas esta semana por un total de 450€. ¿Quieres que envíe un recordatorio automático por WhatsApp a esos pacientes?'
                  }
                  else if (q.match(/ayuda|qué puedes hacer/)) {
                        response = 'Soy una IA conectada a toda tu clínica. Puedo: Agendar citas, consultar precios, analizar finanzas, enviar recordatorios y responder dudas sobre tratamientos. Pruébame preguntando "¿Cómo van los ingresos este mes?".'
                  }
                  else {
                        response = 'Entiendo tu consulta. Para darte una respuesta precisa, estoy analizando los datos históricos de tu clínica... (Simulación: En un entorno real, aquí consultaría tu base de datos vectorial). Por ahora, te sugiero revisar el panel de Ayuda o ser más específico con tu pregunta sobre Pacientes, Citas o Finanzas.'
                  }

                  setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'bot', content: response }])
                  setIsTyping(false)
            }, 1000)
      }

      return (
            <>
                  <button
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 transition-transform group"
                  >
                        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                  </button>

                  <AnimatePresence>
                        {isOpen && (
                              <motion.div
                                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                                    className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                              >
                                    {/* Header */}
                                    <div className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
                                          <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                      <Bot className="w-6 h-6" />
                                                </div>
                                                <div>
                                                      <p className="font-bold text-sm">Aesthie AI</p>
                                                      <p className="text-[10px] opacity-80 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online • Experto en Gestión
                                                      </p>
                                                </div>
                                          </div>
                                          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                                <X className="w-5 h-5" />
                                          </button>
                                    </div>

                                    {/* Chat Area */}
                                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
                                          {messages.map(msg => (
                                                <div key={msg.id} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                                                      <div className={cn(
                                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                                            msg.role === 'bot' ? "bg-primary/10 text-primary" : "bg-slate-200 dark:bg-slate-800"
                                                      )}>
                                                            {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                                      </div>
                                                      <div className={cn(
                                                            "p-3 rounded-2xl max-w-[80%] text-sm",
                                                            msg.role === 'bot'
                                                                  ? "bg-white dark:bg-slate-800 shadow-sm rounded-tl-none border border-slate-100 dark:border-slate-700"
                                                                  : "bg-primary text-primary-foreground rounded-tr-none shadow-lg shadow-primary/20"
                                                      )}>
                                                            {msg.content}
                                                      </div>
                                                </div>
                                          ))}
                                          {isTyping && (
                                                <div className="flex gap-3">
                                                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                                            <Bot className="w-4 h-4" />
                                                      </div>
                                                      <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700">
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                      </div>
                                                </div>
                                          )}
                                    </div>

                                    {/* Input */}
                                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                          <div className="relative flex items-center">
                                                <input
                                                      value={input}
                                                      onChange={(e) => setInput(e.target.value)}
                                                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                                      placeholder="Pregunta algo..."
                                                      className="w-full pl-4 pr-12 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
                                                />
                                                <button
                                                      onClick={handleSend}
                                                      className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-xl hover:scale-105 active:scale-95 transition-all"
                                                >
                                                      <Send className="w-4 h-4" />
                                                </button>
                                          </div>
                                          <p className="text-[10px] text-center text-muted-foreground mt-3">
                                                IA entrenada en gestión clínica • Gratis para siempre
                                          </p>
                                    </div>
                              </motion.div>
                        )}
                  </AnimatePresence>
            </>
      )
}
