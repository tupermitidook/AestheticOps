'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  BarChart3,
  Settings,
  Bell,
  CreditCard,
  FileText,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Menu,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  icon: React.ReactNode
  href: string
  badge?: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    label: 'Pacientes',
    icon: <Users className="w-5 h-5" />,
    href: '/dashboard/patients',
    badge: '12'
  },
  {
    label: 'Citas',
    icon: <Calendar className="w-5 h-5" />,
    href: '/dashboard/appointments',
    badge: '5'
  },
  {
    label: 'Tratamientos',
    icon: <Package className="w-5 h-5" />,
    href: '/dashboard/treatments'
  },
  {
    label: 'Finanzas',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/dashboard/finance'
  },
  {
    label: 'Facturación',
    icon: <CreditCard className="w-5 h-5" />,
    href: '/dashboard/billing'
  },
  {
    label: 'Documentos',
    icon: <FileText className="w-5 h-5" />,
    href: '/dashboard/documents'
  },
]

const bottomNavItems: NavItem[] = [
  {
    label: 'Notificaciones',
    icon: <Bell className="w-5 h-5" />,
    href: '/dashboard/notifications'
  },
  {
    label: 'Configuración',
    icon: <Settings className="w-5 h-5" />,
    href: '/dashboard/settings'
  },
  {
    label: 'Ayuda',
    icon: <HelpCircle className="w-5 h-5" />,
    href: '/dashboard/help'
  },
]

/**
 * Sidebar colapsable del dashboard con diseño premium glassmorphism
 */
export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)

  return (
    <>
      {/* Botón móvil */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-white/20 shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay móvil */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024) ? -320 : 0
        }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40',
          'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl',
          'border-r border-white/20',
          'flex flex-col',
          isMobileOpen ? 'flex' : 'hidden lg:flex'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/20">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-heading font-bold text-xl whitespace-nowrap overflow-hidden"
                >
                  Aesthetic<span className="text-gradient">Ops</span>
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navegación principal */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Navegación inferior */}
        <div className="p-4 border-t border-white/20 space-y-1">
          {bottomNavItems.map((item, index) => (
            <NavItem
              key={index}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl',
              'text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/50',
              'transition-all duration-200'
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Cerrar sesión
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Botón colapsar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'absolute -right-3 top-20 w-6 h-6 rounded-full',
            'bg-white dark:bg-slate-800 border border-white/20',
            'flex items-center justify-center shadow-md',
            'hover:scale-110 transition-transform',
            'hidden lg:flex'
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </motion.aside>
    </>
  )
}

/**
 * Elemento de navegación individual con indicador activo glow
 */
function NavItem({
  item,
  isActive,
  isCollapsed
}: {
  item: NavItem
  isActive: boolean
  isCollapsed: boolean
}) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 w-full px-3 py-2.5 rounded-xl',
        'transition-all duration-200 relative overflow-hidden',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
      )}
    >
      {/* Indicador activo con glow */}
      {isActive && (
        <motion.div
          layoutId="activeSidebar"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-lg shadow-primary/50"
        />
      )}

      {/* Icono */}
      <span className="shrink-0">{item.icon}</span>

      {/* Label y badge */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex-1 text-left whitespace-nowrap overflow-hidden text-sm font-medium"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {!isCollapsed && item.badge && (
        <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  )
}

/**
 * Header del dashboard
 */
export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 px-6 flex items-center justify-between">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-foreground font-medium">Resumen</span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-4">
        {/* Buscar */}
        <div
          onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground w-48">Buscar...</span>
          <kbd className="px-2 py-0.5 text-xs bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600 shadow-sm font-sans">⌘K</kbd>
        </div>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
          className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Notificaciones */}
        <button
          onClick={() => toast.success('No tienes notificaciones nuevas')}
          className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Perfil */}
        <button
          onClick={() => window.location.href = '/dashboard/settings'}
          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
            AM
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">Dr. Martínez</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </button>
      </div>
    </header>
  )
}
