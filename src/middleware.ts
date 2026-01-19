import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { rateLimit } from './lib/rate-limit'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
    const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
    const isApi = req.nextUrl.pathname.startsWith('/api')

    // Rate limiting for API routes
    if (isApi) {
      const identifier = token?.email || req.ip || 'anonymous'
      const limit = rateLimit(identifier as string)
      
      if (!limit.allowed) {
        return NextResponse.json(
          { error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': '100',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': limit.resetTime.toString(),
            }
          }
        )
      }
    }

    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (isDashboard && !isAuth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')
        const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')
        
        if (isAuthPage) {
          return true
        }
        
        if (isDashboard) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register', '/api/:path*'],
}
