/* eslint-disable @typescript-eslint/explicit-function-return-type */
// services/orderService.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrders = async (orders: any, tenantId: number, warehouseId: number) => {
  // Logica para crear órdenes
  // Asegúrate de agregar tenantId y warehouseId a cada orden
  const newOrders = await prisma.order.createMany({
    data: orders.map((order: any) => ({
      ...order,
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      state_id: order.stateId || 1 // Suponiendo que el estado inicial es 1
    }))
  })
  return newOrders
}

export const getAllOrders = async (tenantId: number, warehouseId: number) => {
  // Logica para obtener todas las órdenes
  const orders = await prisma.order.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
  return orders
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
  // Logica para obtener órdenes filtradas
  const orders = await prisma.order.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      ...filters
    }
  })
  return orders
}

export const getOrder = async (orderId: any, tenantId: number, warehouseId: number) => {
  // Logica para obtener una orden específica
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
  return order
}

export const updateOrder = async (orderId: number, updateData: any, tenantId: number, warehouseId: number) => {
  // Logica para actualizar una orden
  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    },
    data: updateData
  })
  return updatedOrder
}

export const deleteOrder = async (orderId: number, tenantId: number, warehouseId: number) => {
  // Logica para eliminar una orden
  await prisma.order.delete({
    where: {
      id: orderId,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
  return { message: 'Order deleted' }
}

export const updateOrderStatus = async (
  orderId: number,
  newStateId: number,
  userId: number,
  tenantId: number,
  warehouseId: number
) => {
  await prisma.$transaction(async (prisma) => {
    await prisma.order.update({
      where: {
        id: orderId,
        tenant_id: tenantId,
        warehouse_id: warehouseId
      },
      data: {
        state_id: newStateId,
        user_id: userId
      }
    })

    await prisma.orderState.create({
      data: {
        tenant_id: tenantId,
        order_id: orderId,
        state_id: newStateId,
        user_id: userId,
        creationDate: new Date()
      }
    })
  })
}
