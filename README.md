# AestheticOps - Plataforma de Gestión para Clínicas de Estética

## Descripción

Plataforma web de alto rendimiento diseñada específicamente para centros de estética y clínicas privadas. Combina una landing page de marketing inmersiva con un panel de administración completo y profesional.

## Características Principales

### Diseño y Experiencia de Usuario
- **Glassmorphism Moderno**: Diseño visual premium con efectos de vidrio y gradientes animados
- **Animaciones Fluidas**: Micro-interacciones y efectos de entrada staggered usando Framer Motion
- **Dark/Light Mode**: Conmutador con transición suave y persistencia de preferencia
- **Burbujas Interactivas**: Elementos de fondo que siguen el cursor del mouse

### Landing Page de Marketing
- **Hero Section Impactante**: Título con gradiente, subtítulo magnético y CTA con efecto shimmer
- **Social Proof**: Carrusel infinito de logotipos de empresas clientes
- **Features Detalladas**: Sección de características con tarjetas glassmorphism
- **Sección de Precios**: Toggle mensual/anual con tarjetas destacadas y efecto beam
- **Lead Magnet Popup**: Formulario de captura con urgencia y escasez

### Dashboard de Administración
- **Sidebar Colapsable**: Navegación con indicadores de estado activos
- **Widgets Interactivos**: Gráficos animados con Recharts (ingresos, citas, tratamientos)
- **Tabla de Datos Premium**: Búsqueda en tiempo real, filtros por estado, ordenamiento y paginación
- **Diseño Responsivo**: Adaptación completa a dispositivos móviles

### Funcionalidades SaaS Completas
- **Sistema de Autenticación**: Registro y login con NextAuth y bcrypt
- **Multi-tenancy**: Separación completa de datos por clínica/usuario
- **Gestión de Usuarios**: CRUD completo de pacientes y citas
- **Sistema de Suscripciones**: Planes de prueba gratuita y suscripciones
- **Facturación**: Sistema completo de facturas y pagos
- **Configuración**: Panel de configuración de perfil y clínica
- **Validación de Datos**: Validación robusta con Zod
- **Rate Limiting**: Protección contra abuso de API
- **Logging**: Sistema de logs para debugging y monitoreo
- **Manejo de Errores**: Manejo centralizado y robusto de errores

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/UI + Radix UI
- **Animaciones**: Framer Motion + GSAP
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Notificaciones**: Sonner
- **Tipografía**: Inter + Plus Jakarta Sans
- **TypeScript**: Strict Mode

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar producción
npm start
```

## Configuración

### Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-key-segura-aqui

# Base de datos (para futura integración con PostgreSQL/MongoDB)
DATABASE_URL=postgresql://user:password@localhost:5432/aestheticops

# Email (opcional, para notificaciones)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-app-password

# Stripe (opcional, para pagos)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Primer Usuario

1. Ve a `/register` para crear tu cuenta
2. Completa el formulario de registro
3. Disfruta de 14 días de prueba gratuita

## Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css          # Estilos globales y utilidades
│   ├── layout.tsx           # Layout principal con providers
│   ├── page.tsx             # Landing page principal
│   └── dashboard/
│       └── page.tsx         # Dashboard principal
├── components/
│   ├── ui/                  # Componentes base reutilizables
│   │   ├── animated-background.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ...
│   ├── layout/              # Componentes de layout
│   │   └── navbar.tsx
│   ├── sections/            # Secciones de la landing page
│   │   ├── hero.tsx
│   │   └── pricing.tsx
│   ├── dashboard/           # Componentes del dashboard
│   │   ├── sidebar.tsx
│   │   ├── widgets.tsx
│   │   └── data-table.tsx
│   └── providers/           # Context providers
│       ├── theme-provider.tsx
│       └── toaster.tsx
├── lib/
│   ├── utils.ts             # Funciones utilitarias
│   └── auth-context.tsx     # Contexto de autenticación
└── ...
```

## Personalización

### Colores
Los colores principales se configuran en `tailwind.config.ts` y las variables CSS en `globals.css`.

### Tipografía
Las fuentes se configuran en el layout principal usando Google Fonts (Inter y Plus Jakarta Sans).

### Animaciones
Las animaciones están definidas en `globals.css` y pueden ajustarse según necesidades.

## Licencia

MIT License

---

Desarrollado con ❤️ por AestheticOps Team
