import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  try {
    const roles = await prisma.role.findMany({ where: { tenantId } })
    return res.json(roles)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const roleId = parseInt(req.params.id)
  try {
    const role = await prisma.role.findUnique({ where: { tenantId, id: roleId } })
    return (role != null) ? res.json(role) : res.status(404).send('Role not found')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId

  if (!tenantId) {
    return res.status(400).send('Tenant ID is required')
  }

  const { description } = req.body
  try {
    const newRole = await prisma.role.create({ data: { tenantId, description } })
    return res.json(newRole)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const updateRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const roleId = parseInt(req.params.id)
  const { description } = req.body
  try {
    const updatedRole = await prisma.role.update({ where: { tenantId, id: roleId }, data: { description } })
    return res.json(updatedRole)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const roleId = parseInt(req.params.id)
  try {
    await prisma.role.delete({ where: { tenantId, id: roleId } })
    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
