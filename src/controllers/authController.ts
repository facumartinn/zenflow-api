/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { type User } from '@prisma/client'
import { generateToken } from '../utils/jwtUtils'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'
import { loginUserService, registerUserService } from '../services/authService'

export interface UserRequestRequest {
  userEmail: string
  password: string
  roleId: number
  barcode: number
  tenant_id: number
}

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId = res.locals.tenant_id
  const warehouseId = res.locals.warehouse_id

  if (!tenantId || !warehouseId) {
    return res.status(httpStatus.BAD_REQUEST).json(
      createError(httpStatus.BAD_REQUEST, 'Tenant and/or Warehouse ID is required')
    )
  }

  try {
    const user: User = await registerUserService(req.body, tenantId, warehouseId)
    return res.status(httpStatus.CREATED).json(user)
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    )
  }
}

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { userEmail, password }: UserRequestRequest = req.body

  try {
    const user: User | null = await loginUserService(userEmail, password)

    if ((user == null) || !(await bcrypt.compare(password, user.password))) {
      return res.status(httpStatus.UNAUTHORIZED).json(
        createError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
      )
    }

    const token = generateToken(user.id)
    return res.status(httpStatus.OK).json(successResponse(token, httpStatus.OK, 'Login successful'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message)
    )
  }
}
