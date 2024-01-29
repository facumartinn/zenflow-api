import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  try {
    const users = await prisma.user.findMany({ where: { tenantId, warehouseId } })
    return res.json(users)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const userId = parseInt(req.params.id)

  try {
    const user = await prisma.user.findUnique({
      where: { tenantId, warehouseId, id: userId }
    })

    if (user != null) {
      return res.json(user)
    } else {
      return res.status(404).send('User not found')
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId

  if (!tenantId || !warehouseId) {
    return res.status(400).send('Tenant and/or Warehouse ID is required')
  }

  const { name, password, barcode, roleId } = req.body

  try {
    const newUser = await prisma.user.create({
      data: { tenantId, warehouseId, name, password, barcode, roleId }
    })

    return res.json(newUser)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const userId = parseInt(req.params.id)
  const { name, password, barcode, roleId } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: { tenantId, warehouseId, id: userId },
      data: { name, password, barcode, roleId }
    })

    return res.json(updatedUser)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const userId = parseInt(req.params.id)

  try {
    await prisma.user.delete({
      where: { tenantId, warehouseId, id: userId }
    })

    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
