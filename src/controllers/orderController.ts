import type { Request, Response } from 'express'
import { PrismaClient, type Prisma } from '@prisma/client'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

const prisma = new PrismaClient()

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  try {
    const orders = await prisma.order.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId
      }
    })

    if (orders.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json(
        createError(httpStatus.NO_CONTENT, 'No orders found')
      )
    }

    return res.status(httpStatus.OK).json(
      successResponse(orders, httpStatus.OK, 'Orders found')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getFilteredOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const { stateId, startDate, endDate, userId } = req.query

  const filters: Prisma.OrderWhereInput = {}

  if (stateId) {
    filters.state_id = parseInt(stateId as string)
  }
  if (userId) {
    filters.user_id = parseInt(userId as string)
  }
  if (startDate || endDate) {
    filters.assemblyDate = {}
    if (startDate) {
      filters.assemblyDate.gte = new Date(startDate as string)
    }
    if (endDate) {
      filters.assemblyDate.lte = new Date(endDate as string)
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        ...filters
      }
    })

    if (orders.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json(
        createError(httpStatus.NO_CONTENT, 'No orders found')
      )
    }

    return res.status(httpStatus.OK).json(
      successResponse(orders, httpStatus.OK, 'Orders found')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  try {
    const order = await prisma.order.findUnique({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderId
      }
    })

    if (!order) {
      return res.status(httpStatus.NO_CONTENT).json(
        createError(httpStatus.NO_CONTENT, 'Order not found')
      )
    }

    return res.status(httpStatus.OK).json(
      successResponse(order, httpStatus.OK, 'Order found')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const createOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  // Aquí deberías obtener los datos necesarios de req.body
  // Por ejemplo: const { amount, user_id } = req.body;
  if (!tenantId || !warehouseId) {
    return res.status(400).send('Tenant and/or Warehouse ID is required')
  }

  try {
    // Asumiendo que req.body es un array de pedidos
    const newOrders = await prisma.order.createMany({
      data: req.body // req.body debe ser un array de objetos de pedido
    })

    if (newOrders.count === 0) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
        createError(httpStatus.INTERNAL_SERVER_ERROR, 'No orders created')
      )
    }

    return res.status(httpStatus.CREATED).json(
      successResponse(newOrders, httpStatus.CREATED, 'Order/s created successfully')
    )
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, error.message as string)
    )
  }
}

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  // Obtener datos actualizados de req.body
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderId
      },
      data: req.body
    })
    return res.status(httpStatus.OK).json(
      successResponse(updatedOrder, httpStatus.OK, 'Order updated successfully')
    )
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, error.message as string)
    )
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  try {
    await prisma.order.delete({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderId
      }
    })
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderId = parseInt(req.params.orderId)
  const { newStateId, userId } = req.body // Asumimos que el nuevo estado y el ID del usuario se envían en el cuerpo de la solicitud

  if (!tenantId || !warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Tenant and/or Warehouse ID is required')
    )
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Actualizar el estado en la tabla Order
      await prisma.order.update({
        where: {
          tenant_id: tenantId,
          warehouse_id: warehouseId,
          id: orderId
        },
        data: {
          state_id: newStateId
        }
      })

      // Crear un registro en OrderStates
      await prisma.orderState.create({
        data: {
          tenant_id: tenantId,
          order_id: orderId,
          state_id: newStateId,
          user_id: userId, // Suponiendo que se registra el usuario que hizo el cambio
          creationDate: new Date() // O usa la fecha/hora actual por defecto en tu base de datos
        }
      })
    })
    return res.status(httpStatus.OK).json(
      successResponse(
        { message: 'Order status updated successfully' }, httpStatus.OK, 'Order status updated successfully')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}
