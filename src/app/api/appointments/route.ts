import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/options'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { appointments: [], patients: [], treatments: [], stats: {} }
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

// Multi-tenancy helper: Get user ID from session
async function getUserId() {
  const session = await getServerSession(authOptions)
  return (session?.user as any)?.id
}

export async function GET() {
  try {
    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const db = readDb()
    // Filter appointments by user (multi-tenancy)
    const userAppointments = (db.appointments || []).filter(
      (a: any) => a.userId === userId
    )
    return NextResponse.json(userAppointments)
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer citas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserId()
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const db = readDb()
    
    const newAppointment = {
      id: String(Date.now()),
      userId, // Multi-tenancy: associate with user
      patientId: body.patientId,
      patientName: body.patientName,
      date: body.date,
      time: body.time,
      treatment: body.treatment,
      status: 'pending',
      price: body.price || 0,
      notes: body.notes || ''
    }
    
    if (!db.appointments) {
      db.appointments = []
    }
    db.appointments.push(newAppointment)
    writeDb(db)
    
    return NextResponse.json(newAppointment, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear cita' }, { status: 500 })
  }
}
