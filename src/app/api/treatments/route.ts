import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { treatments: [] }
  }
}

export async function GET() {
  try {
    const db = readDb()
    return NextResponse.json(db.treatments || [])
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer tratamientos' }, { status: 500 })
  }
}
