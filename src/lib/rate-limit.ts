// Simple in-memory rate limiter
// In production, use Redis or a dedicated service

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // Max requests per window

export function rateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = identifier

  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: store[key].resetTime,
    }
  }

  store[key].count++

  if (store[key].count > MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime,
    }
  }

  return {
    allowed: true,
    remaining: MAX_REQUESTS - store[key].count,
    resetTime: store[key].resetTime,
  }
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (now > store[key].resetTime) {
      delete store[key]
    }
  })
}, RATE_LIMIT_WINDOW)
