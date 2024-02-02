import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllOrderDetails = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  try {
    const orderDetails = await prisma.orderDetail.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId
      }
    })
    return res.json(orderDetails)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getOrderDetailsByIds = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const { ids } = req.body // Asumimos que el cuerpo de la solicitud contiene un array de IDs

  try {
    const orderDetails = await prisma.orderDetail.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: {
          in: ids
        }
      }
    })
    return res.json(orderDetails)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const orderDetailId = parseInt(req.params.id)
  try {
    const orderDetail = await prisma.orderDetail.findUnique({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: orderDetailId
      }
    })
    return (orderDetail != null) ? res.json(orderDetail) : res.status(404).send('OrderDetail not found')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createOrderDetail = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const { orderId, productId, quantity, quantityPicked } = req.body

  if (!tenantId || !warehouseId) {
    return res.status(400).send('Tenant and/or Warehouse ID is required')
  }

  try {
    const newOrderDetail = await prisma.orderDetail.create({
      data: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        order_id: orderId,
        product_id: productId,
        quantity,
        quantityPicked
      }
    })
    return res.json(newOrderDetail)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
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

    return res.status(200).send('OrderDetails updated successfully')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
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
    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
