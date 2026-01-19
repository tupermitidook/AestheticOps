'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

/**
 * Tipo de usuario
 */
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'staff'
  avatar?: string
  clinicName: string
  subscription?: {
    plan: 'trial' | 'basic' | 'pro' | 'enterprise'
    status: 'active' | 'inactive' | 'expired'
    trialEndsAt?: string
  }
}

/**
 * Tipo de contexto de autenticación
 */
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider de autenticación con funcionalidad simulada
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar sesión al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem('aestheticops_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('aestheticops_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Credenciales de demo
    if (email === 'admin@aestheticops.com' && password === 'demo123') {
      const mockUser: User = {
        id: '1',
        name: 'Dr. Alejandro Martínez',
        email: 'admin@aestheticops.com',
        role: 'admin',
        clinicName: 'Clínica Martínez Aesthetics',
      }
      setUser(mockUser)
      localStorage.setItem('aestheticops_user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    // Usuario de prueba
    if (email === 'demo@example.com' && password === 'demo') {
      const mockUser: User = {
        id: '2',
        name: 'María González',
        email: 'demo@example.com',
        role: 'manager',
        clinicName: 'Centro de Belleza Elite',
      }
      setUser(mockUser)
      localStorage.setItem('aestheticops_user', JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('aestheticops_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}
