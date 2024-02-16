/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type OrderDetail, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllOrderDetails = async (tenantId: number, warehouseId: number) => {
  return await prisma.orderDetail.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
}

export const getOrderDetailsByIds = async (ids: number[], tenantId: number, warehouseId: number) => {
  return await prisma.orderDetail.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      order_id: {
        in: ids
      }
    }
  })
}

export const getOrderDetail = async (orderId: number, tenantId: number, warehouseId: number) => {
  return await prisma.orderDetail.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      order_id: orderId
    }
  })
}

export const createOrderDetail = async (orderDetails: OrderDetail[], tenantId: number, warehouseId: number) => {
  const transaction = orderDetails.map(detail => ({
    ...detail,
    tenant_id: tenantId,
    warehouse_id: warehouseId
  }))
  return await prisma.orderDetail.createMany({
    data: transaction
  })
}

export const updateOrderDetails = async (updates: any[], tenantId: number, warehouseId: number) => {
  const results = []
  for (const update of updates) {
    const { orderDetailId, ...data } = update
    const result = await prisma.orderDetail.update({
      where: {
        id: orderDetailId,
        tenant_id: tenantId,
        warehouse_id: warehouseId
      },
      data
    })
    results.push(result)
  }
  return results
}

export const deleteOrderDetail = async (orderDetailId: number, tenantId: number, warehouseId: number) => {
  return await prisma.orderDetail.delete({
    where: {
      id: orderDetailId,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
}
