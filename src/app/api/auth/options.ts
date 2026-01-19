import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.join(process.cwd(), 'src/lib/db.json')

function readDb() {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { users: [], patients: [], appointments: [] }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const db = readDb()
        const user = db.users.find((u: any) => u.email === credentials.email)

        if (!user) {
          return null
        }

        // Check password (support both hashed and plain for migration)
        let passwordMatch = false
        if (user.password.startsWith('$2')) {
          // Hashed password
          passwordMatch = await bcrypt.compare(credentials.password, user.password)
        } else {
          // Plain password (for existing users, migrate on login)
          passwordMatch = user.password === credentials.password
          // Migrate to hashed password
          if (passwordMatch) {
            user.password = await bcrypt.hash(credentials.password, 10)
            db.users = db.users.map((u: any) => 
              u.id === user.id ? user : u
            )
            fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
          }
        }

        if (passwordMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            clinicName: user.clinicName,
            subscription: user.subscription
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.clinicName = (user as any).clinicName
        token.subscription = (user as any).subscription
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
        (session.user as any).clinicName = token.clinicName as string
        (session.user as any).subscription = token.subscription
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET || 'aestheticops-secret-key-development',
}
