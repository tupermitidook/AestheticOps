import { NextResponse } from 'next/server'
import { logger } from './logger'

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public fields?: Record<string, string>) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'No autorizado') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Log the error
  if (error instanceof AppError) {
    logger.error(error.message, error, {
      statusCode: error.statusCode,
      code: error.code,
    })
    
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error instanceof ValidationError && error.fields && { fields: error.fields }),
      },
      { status: error.statusCode }
    )
  }

  // Handle unexpected errors
  logger.error('Unexpected error', error as Error)
  
  return NextResponse.json(
    {
      error: 'Error interno del servidor',
      code: 'INTERNAL_ERROR',
    },
    { status: 500 }
  )
}

export function asyncHandler(
  fn: (req: Request, context?: any) => Promise<NextResponse>
) {
  return async (req: Request, context?: any): Promise<NextResponse> => {
    try {
      return await fn(req, context)
    } catch (error) {
      return handleApiError(error)
    }
  }
}
