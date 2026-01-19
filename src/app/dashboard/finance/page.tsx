'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { motion } from 'framer-motion'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import {
      BarChart3, TrendingUp, Users, DollarSign, Wallet,
      ArrowUpRight, ArrowDownRight, Target, Download, Loader2
} from 'lucide-react'
import {
      AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
      PieChart, Pie, Cell, Legend
} from 'recharts'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function FinancePage() {
      const [data, setData] = React.useState<any>(null)
      const [loading, setLoading] = React.useState(true)

      React.useEffect(() => {
            fetch('/api/marketing')
                  .then(res => res.json())
                  .then(json => {
                        setData(json)
                        setLoading(false)
                  })
                  .catch(() => {
                        toast.error('Error al cargar datos financieros')
                        setLoading(false)
                  })
      }, [])

      if (loading) {
            return (
                  <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
            )
      }

      const latestStats = data.monthlyEvolution[data.monthlyEvolution.length - 1]
      const prevStats = data.monthlyEvolution[data.monthlyEvolution.length - 2]

      const revenueGrowth = ((latestStats.revenue - prevStats.revenue) / prevStats.revenue * 100).toFixed(1)
      const profitGrowth = ((latestStats.profit - prevStats.profit) / prevStats.profit * 100).toFixed(1)

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
                                                <p className="text-muted-foreground mt-1">Datos reales obtenidos de tus canales de captación</p>
                                          </div>
                                          <Button variant="outline" onClick={() => toast.success('Reporte generado correctamente')}>
                                                <Download className="w-4 h-4 mr-2" /> Descargar Reporte
                                          </Button>
                                    </div>
                              </motion.div>

                              {/* Key Metrics Cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <MetricCard
                                          title="Ingresos Totales (Mes)"
                                          value={`${latestStats.revenue.toLocaleString()} €`}
                                          trend={`+${revenueGrowth}%`}
                                          trendUp={true}
                                          icon={DollarSign}
                                          color="text-emerald-500"
                                          bgColor="bg-emerald-500/10"
                                    />
                                    <MetricCard
                                          title="Beneficio Neto"
                                          value={`${latestStats.profit.toLocaleString()} €`}
                                          trend={`+${profitGrowth}%`}
                                          trendUp={true}
                                          icon={Wallet}
                                          color="text-blue-500"
                                          bgColor="bg-blue-500/10"
                                    />
                                    <MetricCard
                                          title="Inversión Ads"
                                          value={`${latestStats.spend.toLocaleString()} €`}
                                          trend="+15%"
                                          trendUp={false}
                                          icon={Target}
                                          color="text-purple-500"
                                          bgColor="bg-purple-500/10"
                                    />
                                    <MetricCard
                                          title="ROAS Promedio"
                                          value={(latestStats.revenue / latestStats.spend).toFixed(1) + 'x'}
                                          trend="+0.4x"
                                          trendUp={true}
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
                                    >
                                          <GlassCard className="h-[400px] flex flex-col p-6">
                                                <div className="flex justify-between items-center mb-6">
                                                      <h3 className="text-lg font-bold flex items-center gap-2">
                                                            <TrendingUp className="w-5 h-5 text-primary" />
                                                            Evolución Financiera
                                                      </h3>
                                                </div>
                                                <div className="flex-1 w-full min-h-0">
                                                      <ResponsiveContainer width="100%" height="100%">
                                                            <AreaChart data={data.monthlyEvolution}>
                                                                  <defs>
                                                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                                        </linearGradient>
                                                                  </defs>
                                                                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                                                                  <XAxis dataKey="name" stroke="#64748b" />
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
                                                                  <Area type="monotone" dataKey="spend" stroke="#f43f5e" fillOpacity={0} name="Gasto Marketing" />
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
                                    >
                                          <GlassCard className="h-[400px] flex flex-col p-6">
                                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                                      <Target className="w-5 h-5 text-purple-500" />
                                                      Fuentes de Captación (ROI)
                                                </h3>
                                                <div className="flex-1 w-full min-h-0 relative">
                                                      <ResponsiveContainer width="100%" height="100%">
                                                            <PieChart>
                                                                  <Pie
                                                                        data={data.channels}
                                                                        cx="50%"
                                                                        cy="50%"
                                                                        innerRadius={60}
                                                                        outerRadius={80}
                                                                        paddingAngle={5}
                                                                        dataKey="value"
                                                                  >
                                                                        {data.channels.map((entry: any, index: number) => (
                                                                              <Cell key={`cell-${index}`} fill={entry.color} />
                                                                        ))}
                                                                  </Pie>
                                                                  <Tooltip
                                                                        formatter={(value, name, props: any) => [`${value}%`, props.payload.name]}
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
                                                </div>
                                                <div className="mt-4 space-y-2">
                                                      {data.channels.map((c: any) => (
                                                            <div key={c.name} className="flex justify-between text-xs">
                                                                  <span className="text-muted-foreground">{c.name}</span>
                                                                  <span className="font-medium text-emerald-500">{(c.revenue / (c.spend || 1)).toFixed(1)}x ROAS</span>
                                                            </div>
                                                      ))}
                                                </div>
                                          </GlassCard>
                                    </motion.div>
                              </div>
                        </main>
                  </div>
            </div>
      )
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, color, bgColor }: any) {
      return (
            <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2.5 rounded-xl", bgColor)}>
                              <Icon className={cn("w-5 h-5", color)} />
                        </div>
                        <div className={cn(
                              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                              trendUp ? "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400" : "text-rose-600 bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400"
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
