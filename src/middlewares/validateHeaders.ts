import { type Request, type Response, type NextFunction } from 'express'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const validateHeaders = (req: Request, res: Response, next: NextFunction): Response | void => {
  const tenantId = req.headers['x-tenant-id']
  const warehouseId = req.headers['x-warehouse-id']

  if (!tenantId) {
    return res.status(400).send('Tenant ID is required and must be a valid number')
  }

  if (!warehouseId) {
    return res.status(400).send('Warehouse ID is required and must be a valid number')
  }

  const tenantIdNum = parseInt(tenantId as string)
  const warehouseIdNum = parseInt(warehouseId as string)

  if (isNaN(tenantIdNum) || isNaN(warehouseIdNum)) {
    return res.status(400).send('Invalid tenant or warehouse ID')
  }

  req.tenantId = tenantIdNum
  req.warehouseId = warehouseIdNum
  next()
}
