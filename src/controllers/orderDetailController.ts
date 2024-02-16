import type { Request, Response } from 'express'
import * as orderDetailService from '../services/orderDetailService'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

export const getAllOrderDetails = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  try {
    const orderDetails = await orderDetailService.getAllOrderDetails(tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(orderDetails, httpStatus.OK, 'OrderDetails retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getOrderDetailsByIds = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const ids: number[] = req.body.ids
  try {
    const orderByIds = await orderDetailService.getOrderDetailsByIds(ids, tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(orderByIds, httpStatus.OK, 'OrderDetails retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderId = parseInt(req.params.id)
  try {
    const orderById = await orderDetailService.getOrderDetail(orderId, tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(orderById, httpStatus.OK, 'OrderDetail retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const createOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderDetails: any[] = req.body
  try {
    const newOrderDetail = await orderDetailService.createOrderDetail(orderDetails, tenantId, warehouseId)
    return res.status(httpStatus.CREATED).json(successResponse(newOrderDetail, httpStatus.CREATED, 'OrderDetail created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const updateOrderDetails = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const updates: any[] = req.body
  try {
    await orderDetailService.updateOrderDetails(updates, tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(null, httpStatus.OK, 'OrderDetails updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const deleteOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const orderDetailId = parseInt(req.params.id)
  try {
    await orderDetailService.deleteOrderDetail(orderDetailId, tenantId, warehouseId)
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}
