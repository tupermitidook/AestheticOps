import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/options'

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

export async function PUT(request: Request) {
      try {
            const session = await getServerSession(authOptions)
            if (!session || !session.user) {
                  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
            }

            const userId = (session.user as any).id
            const body = await request.json()
            const db = readDb()

            const userIndex = db.users.findIndex((u: any) => u.id === userId)
            if (userIndex === -1) {
                  return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
            }

            // Update allowed fields
            const updatedUser = {
                  ...db.users[userIndex],
                  ...body,
                  // Prevent updating sensitive or immutable fields directly via this endpoint if needed, 
                  // though typically we trust the body for profile updates except maybe id/role/password
                  id: userId, // Ensure ID doesn't change
                  role: db.users[userIndex].role, // Ensure role doesn't change
                  password: db.users[userIndex].password // Ensure password doesn't change here
            }

            db.users[userIndex] = updatedUser
            writeDb(db)

            // Remove password from response
            const { password, ...userWithoutPassword } = updatedUser

            return NextResponse.json(userWithoutPassword)
      } catch (error) {
            return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 })
      }
}
