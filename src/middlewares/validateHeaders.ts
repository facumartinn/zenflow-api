import { type Request, type Response, type NextFunction } from 'express'
import { httpStatus } from '../utils/httpStatus'
import { createError } from '../utils/responseHandler'

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export const validateHeaders = (req: Request, res: Response, next: NextFunction): Response | void => {
  const tenantId = req.headers['x-tenant-id']
  const warehouseId = req.headers['x-warehouse-id']

  if (!tenantId) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Tenant ID is required and must be a valid number')
    )
  }

  if (!warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Warehouse ID is required and must be a valid number')
    )
  }

  const tenantIdNum = parseInt(tenantId as string)
  const warehouseIdNum = parseInt(warehouseId as string)

  if (isNaN(tenantIdNum) || isNaN(warehouseIdNum)) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Invalid tenant or warehouse ID'))
  }

  res.locals.tenant_id = tenantIdNum
  res.locals.warehouse_id = warehouseIdNum
  next()
}
