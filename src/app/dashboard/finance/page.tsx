'use client'

import { cn } from '@/lib/utils'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import {
      BarChart3, TrendingUp, Users, DollarSign, Wallet,
      ArrowUpRight, ArrowDownRight, PieChart as PieChartIcon,
      Target, Download
} from 'lucide-react'
import {
      AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
      BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'
import { Button } from '@/components/ui/button'

const REVENUE_DATA = [
      { name: 'Ene', revenue: 15000, profit: 9000 },
      { name: 'Feb', revenue: 18000, profit: 11000 },
      { name: 'Mar', revenue: 16000, profit: 9500 },
      { name: 'Abr', revenue: 21000, profit: 14000 },
      { name: 'May', revenue: 19000, profit: 11500 },
      { name: 'Jun', revenue: 24000, profit: 16000 },
]

const MARKETING_DATA = [
      { name: 'Instagram', value: 45, color: '#E1306C' },
      { name: 'Google Ads', value: 25, color: '#4285F4' },
      { name: 'Recomendaciones', value: 20, color: '#0F9D58' },
      { name: 'TikTok', value: 10, color: '#000000' },
]

const RETENTION_DATA = [
      { name: 'Nuevos', value: 120 },
      { name: 'Recurrentes', value: 340 },
]

export default function FinancePage() {
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
                                                <h1 className="text-3xl font-heading font-bold">Finanzas y Marketing</h1>
                                                <p className="text-muted-foreground mt-1">Analiza la rentabilidad y el crecimiento de tu clínica</p>
                                          </div>
                                          <Button variant="outline">
                                                <Download className="w-4 h-4 mr-2" /> Descargar Reporte
                                          </Button>
                                    </div>
                              </motion.div>

                              {/* Key Metrics Cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <MetricCard
                                          title="Ingresos Totales (Mes)"
                                          value="24.000 €"
                                          trend="+12.5%"
                                          trendUp={true}
                                          icon={DollarSign}
                                          color="text-emerald-500"
                                          bgColor="bg-emerald-500/10"
                                    />
                                    <MetricCard
                                          title="Beneficio Neto"
                                          value="16.000 €"
                                          trend="+8.2%"
                                          trendUp={true}
                                          icon={Wallet}
                                          color="text-blue-500"
                                          bgColor="bg-blue-500/10"
                                    />
                                    <MetricCard
                                          title="Retorno en Marketing (ROAS)"
                                          value="4.5x"
                                          trend="+0.5x"
                                          trendUp={true}
                                          icon={Target}
                                          color="text-purple-500"
                                          bgColor="bg-purple-500/10"
                                    />
                                    <MetricCard
                                          title="Coste por Adquisición (CAC)"
                                          value="45 €"
                                          trend="-5.0%"
                                          trendUp={true} // In this case down is good, but for consistency formatting
                                          icon={Users}
                                          color="text-amber-500"
                                          bgColor="bg-amber-500/10"
                                    />
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                    {/* Main Revenue Chart */}
                                    <motion.div
                                          className="lg:col-span-2"
                                          initial={{ opacity: 0, x: -20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.1 }}
                                    >
                                          <GlassCard className="h-[400px] flex flex-col p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                      <h3 className="text-lg font-bold flex items-center gap-2">
                                                            <TrendingUp className="w-5 h-5 text-primary" />
                                                            Evolución de Ingresos y Beneficios
                                                      </h3>
                                                </div>
                                                <div className="flex-1 w-full min-h-0">
                                                      <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={REVENUE_DATA}>
                                                                  <defs>
                                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                                        </linearGradient>
                                                                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                                                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                                              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                                        </linearGradient>
                                                                  </defs>
                                                                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                                                                  <XAxis dataKey="name" stroke="#64748b" tickMargin={10} />
                                                                  <YAxis stroke="#64748b" />
                                                                  <Tooltip
                                                                        contentStyle={{
                                                                              backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                                                              border: 'none',
                                                                              borderRadius: '12px',
                                                                              color: '#fff'
                                                                        }}
                                                                  />
                                                                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" name="Ingresos" />
                                                                  <Area type="monotone" dataKey="profit" stroke="#10b981" fillOpacity={1} fill="url(#colorProfit)" name="Beneficio" />
                                                            </AreaChart>
                                                      </ResponsiveContainer>
                                                </div>
                                          </GlassCard>
                                    </motion.div>

                                    {/* Marketing Channels */}
                                    <motion.div
                                          className="lg:col-span-1"
                                          initial={{ opacity: 0, x: 20 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.2 }}
                                    >
                                          <GlassCard className="h-[400px] flex flex-col p-6">
                                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                                      <Target className="w-5 h-5 text-purple-500" />
                                                      Fuentes de Captación
                                                </h3>
                                                <div className="flex-1 w-full min-h-0 relative">
                                                      <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                  <Pie
                                                                        data={MARKETING_DATA}
                                                                        cx="50%"
                                                                        cy="50%"
                                                                        innerRadius={60}
                                                                        outerRadius={80}
                                                                        paddingAngle={5}
                                                                        dataKey="value"
                                                                  >
                                                                        {MARKETING_DATA.map((entry, index) => (
                                                                              <Cell key={`cell-${index}`} fill={entry.color} />
                                                                        ))}
                                                                  </Pie>
                                                                  <Tooltip
                                                                        contentStyle={{
                                                                              backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                                                              borderRadius: '8px',
                                                                              border: 'none',
                                                                              color: 'white'
                                                                        }}
                                                                  />
                                                                  <Legend verticalAlign="bottom" height={36} />
                                                            </PieChart>
                                                      </ResponsiveContainer>
                                                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <div className="text-center">
                                                                  <p className="text-2xl font-bold">45%</p>
                                                                  <p className="text-xs text-muted-foreground">Instagram</p>
                                                            </div>
                                                      </div>
                                                </div>
                                          </GlassCard>
                                    </motion.div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <GlassCard className="p-6">
                                          <h3 className="text-lg font-bold mb-4">Retención de Pacientes</h3>
                                          <div className="flex items-center gap-8">
                                                <div className="flex-1 space-y-4">
                                                      <div>
                                                            <div className="flex justify-between mb-1">
                                                                  <span className="text-sm font-medium">Tasa de recurrencia</span>
                                                                  <span className="text-sm font-bold text-green-500">74%</span>
                                                            </div>
                                                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                  <div className="h-full bg-green-500 rounded-full" style={{ width: '74%' }}></div>
                                                            </div>
                                                      </div>
                                                      <div>
                                                            <div className="flex justify-between mb-1">
                                                                  <span className="text-sm font-medium">Pacientes VIP (Gastan +1000€)</span>
                                                                  <span className="text-sm font-bold text-purple-500">12%</span>
                                                            </div>
                                                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '12%' }}></div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                                                <p className="text-sm">
                                                      <strong>Insight:</strong> Tus clientes de Instagram tienen un 20% más de LTV (Valor de Vida) que los de Google Ads. Considera aumentar el presupuesto en Social Media.
                                                </p>
                                          </div>
                                    </GlassCard>

                                    <GlassCard className="p-6">
                                          <h3 className="text-lg font-bold mb-4">Próximos Pasos Recomendados</h3>
                                          <ul className="space-y-4">
                                                <li className="flex items-start gap-3">
                                                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                      </div>
                                                      <div>
                                                            <p className="font-medium text-sm">Campaña de Reactivación</p>
                                                            <p className="text-xs text-muted-foreground">Hay 45 pacientes que no vienen hace 90 días. Envíales un email con 15% dto.</p>
                                                            <Button variant="link" size="sm" className="h-auto p-0 text-blue-500">Activar campaña →</Button>
                                                      </div>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                                                            <BarChart3 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                                      </div>
                                                      <div>
                                                            <p className="font-medium text-sm">Optimizar Precios</p>
                                                            <p className="text-xs text-muted-foreground">La "Higiene Facial" tiene un margen bajo (15%). Considera subir el precio 5€.</p>
                                                      </div>
                                                </li>
                                          </ul>
                                    </GlassCard>
                              </div>
                        </main>
                  </div>
            </div>
      )
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, color, bgColor }: any) {
      return (
            <GlassCard className="p-6 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2.5 rounded-xl", bgColor)}>
                              <Icon className={cn("w-5 h-5", color)} />
                        </div>
                        <div className={cn(
                              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                              trendUp ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400" : "text-rose-600 bg-rose-100"
                        )}>
                              {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {trend}
                        </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{title}</p>
                  <h3 className="text-2xl font-bold font-heading">{value}</h3>
            </GlassCard>
      )
}
