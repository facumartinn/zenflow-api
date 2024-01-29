import { type Request, type Response, type NextFunction } from 'express'

export const validateTenant = (req: Request, res: Response, next: NextFunction): any => {
  const tenantId = req.headers['x-tenant-id']

  if (!tenantId) {
    return res.status(400).send('Tenant ID is required')
  }

  req.tenantId = parseInt(tenantId as string)
  next()
}
