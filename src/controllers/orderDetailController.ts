import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'
import { getOrderDetails } from '../services/orderDetailService'
import { orderDetailMapper } from '../utils/orderUtils'

const prisma = new PrismaClient()

export const getAllOrderDetails = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  try {
    const orderDetails = await getOrderDetails(tenantId, warehouseId)

    if (orderDetails.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json(createError(httpStatus.NOT_FOUND, 'No OrderDetails found'))
    }

    return res.status(httpStatus.OK).json(successResponse(orderDetails, httpStatus.OK, 'OrderDetails retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getOrderDetailsByIds = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const { ids } = req.body // Asumimos que el cuerpo de la solicitud contiene un array de IDs

  if (!ids || ids.length === 0) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'At least one ID is required'))
  }

  try {
    const orderHeaders = await prisma.order.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: {
          in: ids
        }
      }
    })
    const orderDetails = await prisma.orderDetail.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        order_id: {
          in: ids
        }
      }
    })

    if (orderDetails.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json(createError(httpStatus.NOT_FOUND, 'No OrderDetails found'))
    }

    const orderByIds = orderDetailMapper(orderDetails, orderHeaders)

    return res.status(httpStatus.OK).json(successResponse(orderByIds, httpStatus.OK, 'OrderDetails retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  try {
    const orderHeader = await prisma.order.findUnique({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderId
      }
    })

    const orderDetail = await prisma.orderDetail.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        order_id: orderId
      }
    })

    if (!orderDetail) {
      return res.status(httpStatus.NOT_FOUND).json(createError(httpStatus.NOT_FOUND, 'OrderDetail not found'))
    }

    const orderById = orderDetailMapper(orderDetail, [orderHeader])

    return res.status(httpStatus.OK).json(successResponse(orderById, httpStatus.OK, 'OrderDetail retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const createOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderDetails = req.body

  if (orderDetails.length === 0) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'At least one order is required'))
  }

  const orderWithMetadata = orderDetails.map((order: any) => {
    return {
      ...order,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })

  if (!tenantId || !warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'Tenant and/or Warehouse ID is required'))
  }

  try {
    const newOrderDetail = await prisma.orderDetail.createMany({
      data: orderWithMetadata
    })
    return res.status(httpStatus.OK).json(successResponse(newOrderDetail, httpStatus.OK, 'OrderDetail created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const updateOrderDetails = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const updates = req.body // Asumimos que esto es un array de objetos con { orderDetailId, newStatus, ...otrosDatos }

  try {
    await prisma.$transaction(async (prisma) => {
      for (const update of updates) {
        const { orderDetailId, newStatus, ...otrosDatos } = update

        // Actualizar OrderDetail
        await prisma.orderDetail.update({
          where: {
            tenant_id: tenantId,
            warehouse_id: warehouseId,
            id: orderDetailId
          },
          data: {
            ...otrosDatos
          }
        })

        // Actualizar el estado del Order asociado, si es necesario
        if (newStatus) {
          await prisma.order.update({
            where: {
              tenant_id: tenantId,
              warehouse_id: warehouseId,
              id: update.orderId
            }, // Asegúrate de tener el orderId en el update
            data: {
              state_id: newStatus
            }
          })
        }
      }
    })

    return res.status(httpStatus.OK).json(successResponse(null, httpStatus.OK, 'OrderDetails updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const deleteOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderDetailId = parseInt(req.params.id)
  try {
    await prisma.orderDetail.delete({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderDetailId
      }
    })
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}
