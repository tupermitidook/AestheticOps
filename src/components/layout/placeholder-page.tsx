'use client'

import React from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components/layout/navbar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Construction } from 'lucide-react'

export default function PlaceholderPage() {
      return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
                  <Navbar />

                  <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-16">
                        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
                              <Construction className="w-12 h-12 text-primary" />
                        </div>

                        <h1 className="text-4xl font-heading font-bold mb-4">
                              Página en Construcción
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-md mb-8">
                              Estamos trabajando duro para traerte este contenido. ¡Vuelve pronto!
                        </p>

                        <Button asChild size="lg" className="rounded-2xl">
                              <Link href="/">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Volver al Inicio
                              </Link>
                        </Button>
                  </main>

                  <Footer />
            </div>
      )
}
