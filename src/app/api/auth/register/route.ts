import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { users: [], patients: [], appointments: [], treatments: [], stats: {} }
  }
}

function writeDb(data: any) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, clinicName, phone } = body

    // Validation
    if (!name || !email || !password || !clinicName || !phone) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 8 caracteres' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const db = readDb()

    // Check if user already exists
    const existingUser = db.users.find((u: any) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 409 }
      )
    }

    // Hash password (in production, use bcrypt)
    // For now, we'll store it plain but add a note that it should be hashed
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: String(Date.now()),
      name,
      email,
      password: hashedPassword,
      role: 'admin', // First user is admin
      clinicName,
      phone,
      createdAt: new Date().toISOString(),
      subscription: {
        plan: 'trial',
        status: 'active',
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days trial
      },
    }

    db.users.push(newUser)
    writeDb(db)

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json(
      { 
        user: userWithoutPassword,
        message: 'Usuario creado exitosamente'
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear usuario' },
      { status: 500 }
    )
  }
}
