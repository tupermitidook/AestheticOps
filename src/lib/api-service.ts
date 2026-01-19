'use client'

import { useSession } from 'next-auth/react'
import { User } from './api-service'

// Hook de autenticación que usa NextAuth
export function useAuth() {
  const { data: session, status } = useSession()
  
  const user: User | null = session?.user ? {
    id: (session.user as any).id || '',
    name: session.user.name || '',
    email: session.user.email || '',
    role: (session.user as any).role || 'admin',
    clinicName: (session.user as any).clinicName || '',
  } : null

  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
  }
}

// API Service
export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch('/api/patients')
  if (!response.ok) throw new Error('Error al cargar pacientes')
  return response.json()
}

export async function createPatient(patient: Partial<Patient>): Promise<Patient> {
  const response = await fetch('/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  })
  if (!response.ok) throw new Error('Error al crear paciente')
  return response.json()
}

export async function updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
  const response = await fetch(`/api/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  })
  if (!response.ok) throw new Error('Error al actualizar paciente')
  return response.json()
}

export async function deletePatient(id: string): Promise<void> {
  const response = await fetch(`/api/patients/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('Error al eliminar paciente')
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await fetch('/api/appointments')
  if (!response.ok) throw new Error('Error al cargar citas')
  return response.json()
}

export async function createAppointment(appointment: Partial<Appointment>): Promise<Appointment> {
  const response = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  })
  if (!response.ok) throw new Error('Error al crear cita')
  return response.json()
}

export async function updateAppointment(id: string, appointment: Partial<Appointment>): Promise<Appointment> {
  const response = await fetch(`/api/appointments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  })
  if (!response.ok) throw new Error('Error al actualizar cita')
  return response.json()
}

export async function fetchStats(): Promise<Stats> {
  const response = await fetch('/api/stats')
  if (!response.ok) throw new Error('Error al cargar estadísticas')
  return response.json()
}

export async function fetchTreatments(): Promise<Treatment[]> {
  const response = await fetch('/api/treatments')
  if (!response.ok) throw new Error('Error al cargar tratamientos')
  return response.json()
}
