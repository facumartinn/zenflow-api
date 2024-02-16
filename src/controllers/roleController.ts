import type { Request, Response } from 'express'
import * as roleService from '../services/roleService'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

export const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  try {
    const roles = await roleService.getAllRoles(tenantId)
    return res.status(httpStatus.OK).json(successResponse(roles, httpStatus.OK, 'Roles retrieved succesfully.'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const roleId: number = parseInt(req.params.id)
  try {
    const role = await roleService.getRole(roleId, tenantId)
    if (!role) {
      return res.status(httpStatus.NOT_FOUND).send('Role not found')
    }
    return res.status(httpStatus.OK).json(successResponse(role, httpStatus.OK, 'Role retrieved succesfully.'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const createRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const { description } = req.body
  try {
    const newRole = await roleService.createRole(description as string, tenantId)
    return res.status(httpStatus.OK).json(successResponse(newRole, httpStatus.OK, 'Role created succesfully.'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const updateRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const roleId = parseInt(req.params.id)
  const { description } = req.body
  try {
    const updatedRole = await roleService.updateRole(roleId, description as string, tenantId)
    return res.status(httpStatus.OK).json(successResponse(updatedRole, httpStatus.OK, 'Role updated succesfully.'))
  } catch (error: any) {
    return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, error.message as string))
  }
}

export const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  const tenantId: number = res.locals.tenant_id
  const roleId: number = parseInt(req.params.id)
  try {
    await roleService.deleteRole(roleId, tenantId)
    return res.status(httpStatus.NO_CONTENT).send()
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}
