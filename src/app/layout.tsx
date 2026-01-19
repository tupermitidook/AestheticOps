import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/providers/toaster";
import { NextAuthSessionProvider } from "@/components/providers/session-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "AestheticOps - Sistema de Gestión para Clínicas de Estética",
    template: "%s | AestheticOps",
  },
  description: "Plataforma profesional de gestión para centros de estética y clínicas privadas. Automatiza citas, fideliza pacientes y haz crecer tu negocio.",
  keywords: [
    "gestión clínica estética",
    "software clínica estética",
    "citas médicas",
    "pacientes",
    "dermatología",
    "medicina estética",
    "clínicas privadas",
    "software healthcare",
  ],
  authors: [{ name: "AestheticOps" }],
  creator: "AestheticOps",
  publisher: "AestheticOps",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://aestheticops.com",
    title: "AestheticOps - Sistema de Gestión para Clínicas de Estética",
    description: "Plataforma profesional de gestión para centros de estética y clínicas privadas.",
    siteName: "AestheticOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "AestheticOps - Sistema de Gestión para Clínicas de Estética",
    description: "Plataforma profesional de gestión para centros de estética y clínicas privadas.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          plusJakarta.variable
        )}
      >
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
