import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { createError } from '../utils/responseHandler'
import { httpStatus } from '../utils/httpStatus'

const prisma = new PrismaClient()

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  try {
    const users = await prisma.user.findMany({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId
      }
    })
    return res.json(users)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const userId = parseInt(req.params.id)

  try {
    const user = await prisma.user.findUnique({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: userId
      }
    })

    if (user != null) {
      return res.json(user)
    } else {
      return res.status(httpStatus.NOT_FOUND).send(
        createError(httpStatus.NOT_FOUND, 'User not found')
      )
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id

  if (!tenantId || !warehouseId) {
    return res.status(400).send('Tenant and/or Warehouse ID is required')
  }

  const { userEmail, password, barcode, roleId } = req.body

  try {
    const newUser = await prisma.user.create({
      data: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        user_email: userEmail,
        password,
        barcode,
        role_id: roleId
      }
    })

    return res.json(newUser)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const userId = parseInt(req.params.id)
  const { userEmail, password, barcode, roleId } = req.body

  try {
    const updatedUser = await prisma.user.update({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: userId
      },
      data: {
        user_email: userEmail,
        password,
        barcode,
        role_id: roleId
      }
    })

    return res.json(updatedUser)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id
  const userId = parseInt(req.params.id)

  try {
    await prisma.user.delete({
      where: {
        tenant_id: tenantId,
        warehouse_id: warehouseId,
        id: userId
      }
    })

    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
