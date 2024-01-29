import type { Request, Response } from 'express'
import { PrismaClient, type Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  try {
    const orders = await prisma.order.findMany({ where: { tenantId, warehouseId } })
    return res.json(orders)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getFilteredOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const { stateId, startDate, endDate, userId } = req.query

  const filters: Prisma.OrderWhereInput = {}

  if (stateId) {
    filters.stateId = parseInt(stateId as string)
  }
  if (userId) {
    filters.userId = parseInt(userId as string)
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
      where: { tenantId, warehouseId, ...filters }
    })
    return res.json(orders)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const orderId = parseInt(req.params.id)
  try {
    const order = await prisma.order.findUnique({ where: { tenantId, warehouseId, id: orderId } })
    return (order != null) ? res.json(order) : res.status(404).send('Order not found')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createOrders = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
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

    return res.json(newOrders)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const updateOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const orderId = parseInt(req.params.id)
  // Obtener datos actualizados de req.body
  try {
    const updatedOrder = await prisma.order.update({ where: { tenantId, warehouseId, id: orderId }, data: {/* datos actualizados */} })
    return res.json(updatedOrder)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteOrder = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const orderId = parseInt(req.params.id)
  try {
    await prisma.order.delete({ where: { tenantId, warehouseId, id: orderId } })
    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const orderId = parseInt(req.params.orderId)
  const { newStateId, userId } = req.body // Asumimos que el nuevo estado y el ID del usuario se envían en el cuerpo de la solicitud

  if (!tenantId || !warehouseId) {
    return res.status(400).send('Tenant and/or Warehouse ID is required')
  }

  try {
    await prisma.$transaction(async (prisma) => {
      // Actualizar el estado en la tabla Order
      await prisma.order.update({
        where: { tenantId, warehouseId, id: orderId },
        data: { stateId: newStateId }
      })

      // Crear un registro en OrderStates
      await prisma.orderState.create({
        data: {
          tenantId,
          orderId,
          stateId: newStateId,
          userId, // Suponiendo que se registra el usuario que hizo el cambio
          creationDate: new Date() // O usa la fecha/hora actual por defecto en tu base de datos
        }
      })
    })
    return res.status(200).send('Order status updated successfully')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
