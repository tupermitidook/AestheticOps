'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Sidebar, DashboardHeader } from '@/components/dashboard/sidebar'
import { GlassCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/api-service'
import { cn } from '@/lib/utils'
import {
  Save, Loader2, Building2, User, Bell, CreditCard, Shield,
  Globe, Mail, Phone, MapPin, Calendar
} from 'lucide-react'

export default function SettingsPage() {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('profile')

  const [profileData, setProfileData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  })

  const [clinicData, setClinicData] = React.useState({
    clinicName: user?.clinicName || '',
    address: '',
    city: '',
    postalCode: '',
    website: '',
  })

  const [notifications, setNotifications] = React.useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
  })

  React.useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
      })
      setClinicData({
        clinicName: user.clinicName || '',
        address: '',
        city: '',
        postalCode: '',
        website: '',
      })
    }
  }, [user])

  const handleSaveProfile = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      toast.error('Error al actualizar perfil')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveClinic = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Información de la clínica actualizada')
    } catch (error) {
      toast.error('Error al actualizar información')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Preferencias guardadas')
    } catch (error) {
      toast.error('Error al guardar preferencias')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'clinic', label: 'Clínica', icon: Building2 },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'billing', label: 'Facturación', icon: CreditCard },
    { id: 'security', label: 'Seguridad', icon: Shield },
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
            <h1 className="text-3xl font-heading font-bold">Configuración</h1>
            <p className="text-muted-foreground mt-1">
              Gestiona la configuración de tu cuenta y clínica
            </p>
          </motion.div>

          {/* Tabs */}
          <GlassCard className="mb-6">
            <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-700">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors',
                      'border-b-2',
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </GlassCard>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {activeTab === 'profile' && (
              <GlassCard className="p-7">
                <h2 className="text-xl font-semibold mb-6">Información Personal</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre completo</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      placeholder="+34 612 345 678"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar cambios
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === 'clinic' && (
              <GlassCard className="p-7">
                <h2 className="text-xl font-semibold mb-6">Información de la Clínica</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de la clínica</label>
                    <input
                      type="text"
                      value={clinicData.clinicName}
                      onChange={(e) => setClinicData({ ...clinicData, clinicName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ciudad</label>
                      <input
                        type="text"
                        value={clinicData.city}
                        onChange={(e) => setClinicData({ ...clinicData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Código postal</label>
                      <input
                        type="text"
                        value={clinicData.postalCode}
                        onChange={(e) => setClinicData({ ...clinicData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección</label>
                    <input
                      type="text"
                      value={clinicData.address}
                      onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sitio web</label>
                    <input
                      type="url"
                      value={clinicData.website}
                      onChange={(e) => setClinicData({ ...clinicData, website: e.target.value })}
                      placeholder="https://tu-clinica.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveClinic} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar cambios
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === 'notifications' && (
              <GlassCard className="p-7">
                <h2 className="text-xl font-semibold mb-6">Preferencias de Notificaciones</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div>
                      <p className="font-medium">Notificaciones por email</p>
                      <p className="text-sm text-muted-foreground">Recibe actualizaciones importantes por email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailNotifications}
                      onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div>
                      <p className="font-medium">Notificaciones por SMS</p>
                      <p className="text-sm text-muted-foreground">Recibe alertas importantes por SMS</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.smsNotifications}
                      onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div>
                      <p className="font-medium">Recordatorios de citas</p>
                      <p className="text-sm text-muted-foreground">Envía recordatorios automáticos a los pacientes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.appointmentReminders}
                      onChange={(e) => setNotifications({ ...notifications, appointmentReminders: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div>
                      <p className="font-medium">Emails de marketing</p>
                      <p className="text-sm text-muted-foreground">Recibe consejos y promociones especiales</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.marketingEmails}
                      onChange={(e) => setNotifications({ ...notifications, marketingEmails: e.target.checked })}
                      className="w-5 h-5 rounded"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSaveNotifications} disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar cambios
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === 'billing' && (
              <GlassCard className="p-7">
                <h2 className="text-xl font-semibold mb-6">Facturación y Suscripción</h2>
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg">Plan Actual</p>
                        <p className="text-sm text-muted-foreground">
                          {user?.subscription?.plan === 'trial' ? 'Prueba Gratuita' : 'Plan Pro'}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                        Activo
                      </span>
                    </div>
                    {user?.subscription?.plan === 'trial' && (
                      <p className="text-sm text-muted-foreground">
                        Tu prueba gratuita termina el{' '}
                        {new Date(user.subscription.trialEndsAt).toLocaleDateString('es-ES')}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm text-muted-foreground mb-1">Plan Básico</p>
                      <p className="text-2xl font-bold">29€<span className="text-sm font-normal">/mes</span></p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li>✓ Hasta 100 pacientes</li>
                        <li>✓ Gestión de citas</li>
                        <li>✓ Soporte por email</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/10 border-2 border-primary">
                      <p className="text-sm text-muted-foreground mb-1">Plan Pro</p>
                      <p className="text-2xl font-bold">79€<span className="text-sm font-normal">/mes</span></p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li>✓ Pacientes ilimitados</li>
                        <li>✓ Todas las funciones</li>
                        <li>✓ Soporte prioritario</li>
                        <li>✓ Reportes avanzados</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm text-muted-foreground mb-1">Plan Enterprise</p>
                      <p className="text-2xl font-bold">Personalizado</p>
                      <ul className="mt-4 space-y-2 text-sm">
                        <li>✓ Todo del Plan Pro</li>
                        <li>✓ API personalizada</li>
                        <li>✓ Gestor de cuenta</li>
                        <li>✓ SLA garantizado</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => toast.info('Contacta con soporte para cambiar tu plan')}>
                      Cambiar plan
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/billing">Ver facturas</Link>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}

            {activeTab === 'security' && (
              <GlassCard className="p-7">
                <h2 className="text-xl font-semibold mb-6">Seguridad</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Contraseña actual</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nueva contraseña</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirmar nueva contraseña</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Cambiar contraseña
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
