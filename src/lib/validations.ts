import { z } from 'zod'

// User validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string(),
  clinicName: z.string().min(2, 'El nombre de la clínica es requerido'),
  phone: z.string().min(9, 'Teléfono inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export const patientSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(9, 'Teléfono inválido'),
})

export const appointmentSchema = z.object({
  patientId: z.string().min(1, 'Selecciona un paciente'),
  treatmentId: z.string().min(1, 'Selecciona un tratamiento'),
  date: z.string().min(1, 'La fecha es requerida'),
  time: z.string().min(1, 'La hora es requerida'),
  notes: z.string().optional(),
  status: z.enum(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled']),
})

export const treatmentSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  duration: z.number().min(1, 'La duración debe ser al menos 1 minuto'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type PatientInput = z.infer<typeof patientSchema>
export type AppointmentInput = z.infer<typeof appointmentSchema>
export type TreatmentInput = z.infer<typeof treatmentSchema>
