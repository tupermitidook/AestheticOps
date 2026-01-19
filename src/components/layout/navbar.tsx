'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

/**
 * Elemento de navegación con efecto hover
 */
const NavLink = ({
  item,
  active,
  isMobile
}: {
  item: NavItem
  active?: boolean
  isMobile?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.children) {
    return (
      <div
        className={cn("relative", isMobile && "w-full")}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center justify-between w-full gap-1 text-sm font-medium transition-colors hover:text-primary py-2',
            active ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {item.label}
          <ChevronRight className={cn(
            'w-4 h-4 transition-transform duration-200',
            isOpen && 'rotate-90'
          )} />
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10 }}
              animate={isMobile ? { height: 'auto', opacity: 1 } : { opacity: 1, y: 0 }}
              exit={isMobile ? { height: 0, opacity: 0 } : { opacity: 0, y: 10 }}
              className={cn(
                isMobile
                  ? "relative w-full pl-4 border-l border-slate-200 dark:border-slate-800 ml-2 overflow-hidden"
                  : "absolute top-full left-0 mt-2 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl overflow-hidden z-50"
              )}
            >
              <div className="p-2">
                {item.children.map((child, index) => (
                  <Link
                    key={index}
                    href={child.href}
                    className="block px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <p className="font-medium text-sm">{child.label}</p>
                    {child.description && (
                      <p className="text-xs text-muted-foreground mt-1">{child.description}</p>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary relative block py-2',
        active ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {item.label}
      {active && !isMobile && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
        />
      )}
    </Link>
  )
}

/**
 * Barra de navegación principal premium
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navItems: NavItem[] = [
    { label: 'Características', href: '#features' },
    { label: 'Precios', href: '#pricing' },
    {
      label: 'Recursos',
      href: '#resources',
      children: [
        { label: 'Blog', href: '/blog', description: 'Consejos y tendencias del sector' },
        { label: 'Casos de éxito', href: '/cases', description: 'Historias de clínicas reales' },
        { label: 'Documentación', href: '/docs', description: 'Guías técnicas y API' },
        { label: 'Soporte', href: '/support', description: 'Centro de ayuda 24/7' },
      ]
    },
    { label: 'Contacto', href: '#contact' },
  ]

  // Efecto de scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 shadow-lg'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-heading font-bold text-xl hidden sm:block">
              Aesthetic<span className="text-gradient">Ops</span>
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink item={item} />
              </motion.div>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Iniciar sesión</Link>
              </Button>
              <Button variant="shimmer" size="sm" asChild>
                <Link href="/register">Prueba gratis</Link>
              </Button>
            </div>

            {/* Botón móvil */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-white/20"
      >
        <div className="px-4 py-4 space-y-4">
          {navItems.map((item, index) => (
            <NavLink key={index} item={item} isMobile={true} />
          ))}
          <div className="pt-4 border-t border-border space-y-3">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/login">Iniciar sesión</Link>
            </Button>
            <Button variant="shimmer" className="w-full" asChild>
              <Link href="/register">Prueba gratis</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  )
}

/**
 * Footer premium completo
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Producto',
      links: [
        { label: 'Características', href: '#features' },
        { label: 'Precios', href: '#pricing' },
        { label: 'Seguridad', href: '/security' },
        { label: 'Actualizaciones', href: '/changelog' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre nosotros', href: '/about' },
        { label: 'Carreras', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Prensa', href: '/press' },
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Documentación', href: '/docs' },
        { label: 'API', href: '/api' },
        { label: 'Soporte', href: '/support' },
        { label: 'Comunidad', href: '/community' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '/privacy' },
        { label: 'Términos', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
        { label: 'Licencias', href: '/licenses' },
      ]
    }
  ]

  const socialLinks = [
    { label: 'Twitter', href: '#', icon: '𝕏' },
    { label: 'LinkedIn', href: '#', icon: 'in' },
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'YouTube', href: '#', icon: '▶' },
  ]

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Marca */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-rose-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Aesthetic<span className="text-gradient">Ops</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              El sistema operativo para la medicina estética moderna.
              Optimiza tu clínica y deleita a tus pacientes.
            </p>
            {/* Newsletter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Suscríbete a nuestro boletín</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" variant="default">
                  →
                </Button>
              </div>
            </div>
          </div>

          {/* Secciones de enlaces */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AestheticOps. Todos los derechos reservados.
            </p>

            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
