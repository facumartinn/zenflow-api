/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as orderRepository from '../repositories/orderrepository'

export const createOrders = async (orders: any[], tenantId: number, warehouseId: number) => {
  return await orderRepository.createOrders(orders, tenantId, warehouseId)
}

export const getAllOrders = async (tenantId: number, warehouseId: number) => {
  return await orderRepository.getAllOrders(tenantId, warehouseId)
}

export const getFilteredOrders = async (filters: any, tenantId: number, warehouseId: number) => {
  const { stateId, userId, startDate, endDate } = filters

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
  return await orderRepository.getFilteredOrders(filters, tenantId, warehouseId)
}

export const getOrder = async (orderId: number, tenantId: number, warehouseId: number) => {
  return await orderRepository.getOrder(orderId, tenantId, warehouseId)
}

export const updateOrder = async (orderId: number, updateData: any, tenantId: number, warehouseId: number) => {
  return await orderRepository.updateOrder(orderId, updateData, tenantId, warehouseId)
}

export const deleteOrder = async (orderId: number, tenantId: number, warehouseId: number) => {
  await orderRepository.deleteOrder(orderId, tenantId, warehouseId)
}

export const updateOrderStatus = async (
  orderId: number,
  newStateId: number,
  userId: number,
  tenantId: number,
  warehouseId: number
) => {
  await orderRepository.updateOrderStatus(orderId, newStateId, userId, tenantId, warehouseId)
}
