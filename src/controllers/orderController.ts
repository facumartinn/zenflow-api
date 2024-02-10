import { type Request, type Response } from 'express'
import * as orderService from '../services/orderService'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id

  try {
    const orders = await orderService.getAllOrders(tenantId, warehouseId)

    if (orders.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json(
        createError(httpStatus.NO_CONTENT, 'No orders found')
      )
    }

    return res.status(httpStatus.OK).json(successResponse(orders, httpStatus.OK, 'Orders retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getFilteredOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const filters = req.query

  try {
    const orders = await orderService.getFilteredOrders(filters, tenantId, warehouseId)

    if (orders.length === 0) {
      return res.status(httpStatus.NO_CONTENT).json(
        createError(httpStatus.NO_CONTENT, 'No orders found')
      )
    }
    return res.status(httpStatus.OK).json(
      successResponse(orders, httpStatus.OK, 'Filtered orders retrieved successfully')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)

  try {
    const order = await orderService.getOrder(orderId, tenantId, warehouseId)
    if (!order) {
      return res.status(httpStatus.NOT_FOUND).json(
        createError(httpStatus.NOT_FOUND, 'Order not found')
      )
    }
    return res.status(httpStatus.OK).json(successResponse(order, httpStatus.OK, 'Order found'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const createOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  if (!tenantId || !warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).send('Tenant and/or Warehouse ID is required')
  }

  try {
    const ordersData = req.body // Asume que req.body es un array de objetos de pedido
    const newOrders = await orderService.createOrders(ordersData, tenantId, warehouseId)
    if (newOrders.count === 0) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
        createError(httpStatus.INTERNAL_SERVER_ERROR, 'No orders created')
      )
    }
    return res.status(httpStatus.CREATED).json(successResponse(newOrders, httpStatus.CREATED, 'Orders created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  const orderData = req.body // Asume que req.body contiene los campos a actualizar

  try {
    const updatedOrder = await orderService.updateOrder(orderId, orderData, tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(updatedOrder, httpStatus.OK, 'Order updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)

  try {
    await orderService.deleteOrder(orderId, tenantId, warehouseId)
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderId = parseInt(req.params.orderId)
  const { newStateId, userId }: { newStateId: number, userId: number } = req.body

  if (!tenantId || !warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Tenant and/or Warehouse ID is required')
    )
  }

  try {
    await orderService.updateOrderStatus(orderId, newStateId, userId, tenantId, warehouseId)
    return res.status(httpStatus.OK).json(
      successResponse({ message: 'Order status updated successfully' }, httpStatus.OK, 'Order status updated successfully')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}
