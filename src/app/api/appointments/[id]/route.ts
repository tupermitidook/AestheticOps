import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { appointments: [], patients: [], stats: {} }
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const db = readDb()
    const index = db.appointments.findIndex((a: any) => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }
    
    db.appointments[index] = { ...db.appointments[index], ...body }
    writeDb(db)
    
    return NextResponse.json(db.appointments[index])
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar cita' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = readDb()
    const index = db.appointments.findIndex((a: any) => a.id === params.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }
    
    db.appointments.splice(index, 1)
    writeDb(db)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar cita' }, { status: 500 })
  }
}
