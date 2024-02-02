// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express'
declare global {
  namespace Express {
    interface Response {
      locals: {
        user?: Record<string, any>
        tenant_id?: number
        warehouse_id?: number
      }
    }
  }
}
