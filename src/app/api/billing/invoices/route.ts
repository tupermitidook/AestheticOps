import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/options'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { invoices: [], users: [] }
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const db = readDb()
    const userId = (session.user as any).id
    
    // Filter invoices by user (multi-tenancy)
    const userInvoices = (db.invoices || []).filter(
      (invoice: any) => invoice.userId === userId
    )

    return NextResponse.json(userInvoices)
  } catch (error) {
    return NextResponse.json({ error: 'Error al cargar facturas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const db = readDb()
    const userId = (session.user as any).id

    const newInvoice = {
      id: `INV-${Date.now()}`,
      userId,
      invoiceNumber: `INV-${Date.now()}`,
      patientId: body.patientId,
      patientName: body.patientName,
      amount: body.amount,
      tax: body.tax || 0,
      total: body.amount + (body.tax || 0),
      status: 'pending',
      dueDate: body.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      items: body.items || [],
    }

    if (!db.invoices) {
      db.invoices = []
    }
    
    db.invoices.push(newInvoice)
    writeDb(db)

    return NextResponse.json(newInvoice, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear factura' }, { status: 500 })
  }
}
