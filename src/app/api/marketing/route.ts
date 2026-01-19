import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
      const data = fs.readFileSync(dbPath, 'utf-8')
      return JSON.parse(data)
}

export async function GET() {
      try {
            const db = readDb()
            return NextResponse.json(db.marketingStats)
      } catch (error) {
            return NextResponse.json({ error: 'Error al leer estadísticas de marketing' }, { status: 500 })
      }
}
