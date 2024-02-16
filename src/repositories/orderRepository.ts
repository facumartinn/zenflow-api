/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createOrders = async (orders: any[], tenantId: number, warehouseId: number) => {
  const newOrders = await prisma.order.createMany({
    data: orders.map(order => ({
      ...order,
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      state_id: order.stateId || 1
    }))
  })
  return newOrders
}

export const getAllOrders = async (tenantId: number, warehouseId: number) => {
  const orders = await prisma.order.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
  return orders
}

export const getFilteredOrders = async (filters: any, tenantId: number, warehouseId: number) => {
  // Ajusta los filtros para cumplir con la consulta de Prisma
  const orders = await prisma.order.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      ...filters
    }
  })
  return orders
}

export const getOrder = async (orderId: number, tenantId: number, warehouseId: number) => {
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
  await prisma.order.delete({
    where: {
      id: orderId,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
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
