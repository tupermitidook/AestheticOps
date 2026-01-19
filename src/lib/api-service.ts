import { useAuth } from './auth-context'

export { useAuth }

// Pacientes
export async function fetchPatients() {
      const response = await fetch('/api/patients')
      if (!response.ok) throw new Error('Error al cargar pacientes')
      return response.json()
}

export async function createPatient(data: any) {
      const response = await fetch('/api/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Error al crear paciente')
      return response.json()
}

export async function updatePatient(id: string, data: any) {
      const response = await fetch(`/api/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Error al actualizar paciente')
      return response.json()
}

export async function deletePatient(id: string) {
      const response = await fetch(`/api/patients/${id}`, {
            method: 'DELETE',
      })
      if (!response.ok) throw new Error('Error al eliminar paciente')
      return response.json()
}
