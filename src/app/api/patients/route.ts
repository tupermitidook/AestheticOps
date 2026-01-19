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
    return { patients: [], appointments: [], treatments: [], stats: {} }
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
    // Filter patients by user (multi-tenancy)
    const userPatients = (db.patients || []).filter(
      (p: any) => p.userId === userId
    )
    return NextResponse.json(userPatients)
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer pacientes' }, { status: 500 })
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
    
    const newPatient = {
      id: String(Date.now()),
      userId, // Multi-tenancy: associate with user
      name: body.name,
      email: body.email,
      phone: body.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'active',
      treatments: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString()
    }
    
    if (!db.patients) {
      db.patients = []
    }
    db.patients.push(newPatient)
    writeDb(db)
    
    return NextResponse.json(newPatient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear paciente' }, { status: 500 })
  }
}
