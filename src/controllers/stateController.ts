import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllStates = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  try {
    const states = await prisma.state.findMany({
      where: {
        tenant_id: tenantId
      }
    })
    return res.json(states)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const getState = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const stateId = parseInt(req.params.id)
  try {
    const state = await prisma.state.findUnique({
      where: {
        tenant_id: tenantId,
        id: stateId
      }
    })
    return (state != null) ? res.json(state) : res.status(404).send('State not found')
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const createState = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id

  if (!tenantId) {
    return res.status(400).send('Tenant ID is required')
  }

  const { description } = req.body
  try {
    const newState = await prisma.state.create({
      data: {
        tenant_id: tenantId,
        description
      }
    })
    return res.json(newState)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const updateState = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const stateId = parseInt(req.params.id)
  const { description } = req.body
  try {
    const updatedState = await prisma.state.update({
      where: {
        tenant_id: tenantId,
        id: stateId
      },
      data: {
        description
      }
    })
    return res.json(updatedState)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

export const deleteState = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const stateId = parseInt(req.params.id)
  try {
    await prisma.state.delete({
      where: {
        tenant_id: tenantId,
        id: stateId
      }
    })
    return res.status(204).send()
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
