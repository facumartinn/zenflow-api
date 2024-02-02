/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { PrismaClient, type User } from '@prisma/client'
import { generateToken } from '../utils/jwtUtils'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

const prisma = new PrismaClient()
const saltRounds = 10

interface UserRequestRequest {
  userEmail: string
  password: string
  roleId: number
  barcode: number
  tenant_id: number
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id

  try {
    if (!tenantId || !warehouseId) {
      return res.status(httpStatus.BAD_REQUEST).json(
        createError(httpStatus.BAD_REQUEST, 'Tenant and/or Warehouse ID is required')
      )
    }

    const { userEmail, password, barcode, roleId }: UserRequestRequest = req.body
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user: User = await prisma.user.create({
      data: {
        user_email: userEmail,
        password: hashedPassword,
        role_id: roleId,
        barcode,
        tenant_id: tenantId,
        warehouse_id: warehouseId
      }
    })
    return res.status(httpStatus.CREATED).json(user)
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    )
  }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  // const tenantId = res.locals.tenant_id
  // const warehouseId = res.locals.warehouse_id
  const { userEmail, password }: UserRequestRequest = req.body

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: 1,
        // tenant_id,
        // warehouse_id,
        user_email: userEmail
      }
    })

    if ((user == null) || !(await bcrypt.compare(password, user.password))) {
      return res.status(httpStatus.UNAUTHORIZED).json(
        createError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
      )
    }

    const token = generateToken(user.id)
    return res.status(httpStatus.OK).json(
      successResponse(token, httpStatus.OK, 'Login successful')
    )
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    )
  }
}
