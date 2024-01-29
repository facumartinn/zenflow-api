/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient, type User } from '@prisma/client'
import { generateToken } from '../utils/jwtUtils'

const prisma = new PrismaClient()
const saltRounds = 10

interface UserRequestRequest {
  username: string
  password: string
  barcode: number
  tenantId: number
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId

  try {
    if (!tenantId || !warehouseId) {
      return res.status(400).send('Tenant and/or Warehouse ID is required')
    }

    const { username, password, barcode }: UserRequestRequest = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user: User = await prisma.user.create({
      data: {
        name: username,
        password: hashedPassword,
        barcode,
        tenantId,
        warehouseId
      }
    })
    return res.status(201).json(user)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = req.tenantId
  const warehouseId = req.warehouseId
  const { username, password }: UserRequestRequest = req.body

  try {
    const user: User | null = await prisma.user.findFirst({
      where: {
        tenantId,
        warehouseId,
        name: username,
        password
      }
    })

    if ((user == null) || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials')
    }

    const token = generateToken(user.id)
    return res.json({ token })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
