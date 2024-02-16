/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as orderDetailRepository from '../repositories/orderDetailRepository'

export const getAllOrderDetails = async (tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.getAllOrderDetails(tenantId, warehouseId)
}

export const getOrderDetailsByIds = async (ids: number[], tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.getOrderDetailsByIds(ids, tenantId, warehouseId)
}

export const getOrderDetail = async (orderId: number, tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.getOrderDetail(orderId, tenantId, warehouseId)
}

export const createOrderDetail = async (orderDetails: any[], tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.createOrderDetail(orderDetails, tenantId, warehouseId)
}

export const updateOrderDetails = async (updates: any[], tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.updateOrderDetails(updates, tenantId, warehouseId)
}

export const deleteOrderDetail = async (orderDetailId: number, tenantId: number, warehouseId: number) => {
  return await orderDetailRepository.deleteOrderDetail(orderDetailId, tenantId, warehouseId)
}
