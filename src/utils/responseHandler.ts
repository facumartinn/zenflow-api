interface ErrorResponse {
  error: {
    status: number
    message: string
  }
}

interface SuccessResponse {
  metadata: {
    code: number
    message: string
  }
  data: any
}

// node http

export const createError = (status: number, message: string): ErrorResponse => {
  return {
    error: {
      status,
      message
    }
  }
}

export const successResponse = (data: any, status: number, message: string): SuccessResponse => {
  return {
    metadata: {
      code: status,
      message
    },
    data
  }
}
