// Simple logging utility
// In production, use a proper logging service like Winston, Pino, or Sentry

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: Record<string, any>
}

class Logger {
  private logs: LogEntry[] = []
  private maxLogs = 1000 // Keep last 1000 logs in memory

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): string {
    const timestamp = new Date().toISOString()
    const metaStr = metadata ? ` ${JSON.stringify(metadata)}` : ''
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`
  }

  info(message: string, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      metadata,
    }
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    
    if (process.env.NODE_ENV !== 'production') {
      console.log(this.formatMessage('info', message, metadata))
    }
  }

  warn(message: string, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      metadata,
    }
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    
    console.warn(this.formatMessage('warn', message, metadata))
  }

  error(message: string, error?: Error | any, metadata?: Record<string, any>) {
    const entry: LogEntry = {
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      metadata: {
        ...metadata,
        error: error?.message,
        stack: error?.stack,
      },
    }
    this.logs.push(entry)
    if (this.logs.length > this.maxLogs) {
      this.logs.shift()
    }
    
    console.error(this.formatMessage('error', message, { ...metadata, error }))
  }

  debug(message: string, metadata?: Record<string, any>) {
    if (process.env.NODE_ENV === 'development') {
      const entry: LogEntry = {
        level: 'debug',
        message,
        timestamp: new Date().toISOString(),
        metadata,
      }
      this.logs.push(entry)
      console.debug(this.formatMessage('debug', message, metadata))
    }
  }

  getLogs(level?: LogLevel, limit = 100): LogEntry[] {
    let filtered = this.logs
    if (level) {
      filtered = filtered.filter(log => log.level === level)
    }
    return filtered.slice(-limit)
  }

  clear() {
    this.logs = []
  }
}

export const logger = new Logger()
