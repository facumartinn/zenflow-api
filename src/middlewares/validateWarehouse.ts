import { type Request, type Response, type NextFunction } from 'express'

export const validateWarehouse = (req: Request, res: Response, next: NextFunction): any => {
  const warehouseId = req.headers['x-warehouse-id']

  if (!warehouseId) {
    return res.status(400).send('Tenant ID is required')
  }

  req.warehouseId = parseInt(warehouseId as string)
  next()
}
