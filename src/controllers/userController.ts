import type { Request, Response } from 'express'
import * as userService from '../services/userService'
import { createError, successResponse } from '../utils/responseHandler'
import { httpStatus } from '../utils/httpStatus'

export const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  try {
    const users = await userService.getAllUsers(tenantId, warehouseId)
    return res.status(httpStatus.OK).json(successResponse(users, httpStatus.OK, 'Users retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const userId = parseInt(req.params.id)
  try {
    const user = await userService.getUser(tenantId, warehouseId, userId)
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json(createError(httpStatus.NOT_FOUND, 'User not found'))
    }
    return res.status(httpStatus.OK).json(successResponse(user, httpStatus.OK, 'User retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const userData = req.body
  try {
    const newUser = await userService.createUser(tenantId, warehouseId, userData)
    return res.status(httpStatus.CREATED).json(successResponse(newUser, httpStatus.CREATED, 'User created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const userId = parseInt(req.params.id)
  const userData = req.body
  try {
    const updatedUser = await userService.updateUser(tenantId, warehouseId, userId, userData)
    return res.status(httpStatus.OK).json(successResponse(updatedUser, httpStatus.OK, 'User updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const warehouseId: number = res.locals.warehouse_id
  const userId = parseInt(req.params.id)
  try {
    await userService.deleteUser(tenantId, warehouseId, userId)
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}
