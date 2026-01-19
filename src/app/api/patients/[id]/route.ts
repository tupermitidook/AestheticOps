import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = readDb()
    const patient = db.patients.find((p: any) => p.id === params.id)
    
    if (!patient) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 })
    }
    
    return NextResponse.json(patient)
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer paciente' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const db = readDb()
    const index = db.patients.findIndex((p: any) => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 })
    }
    
    db.patients[index] = { ...db.patients[index], ...body }
    writeDb(db)
    
    return NextResponse.json(db.patients[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar paciente' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = readDb()
    const index = db.patients.findIndex((p: any) => p.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Paciente no encontrado' }, { status: 404 })
    }
    
    db.patients.splice(index, 1)
    writeDb(db)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar paciente' }, { status: 500 })
  }
}
