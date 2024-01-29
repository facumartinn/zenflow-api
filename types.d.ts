// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'
declare global {
  namespace Express {
    interface Request {
      locals: {
        user?: Record<string, any>
      }
      tenantId?: number
      warehouseId?: number
    }
  }
}
