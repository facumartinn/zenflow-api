import { type Role } from '@prisma/client'
import * as roleRepository from '../repositories/roleRepository'

export const getAllRoles = async (tenantId: number): Promise<Role[]> => {
  return await roleRepository.getAllRoles(tenantId)
}

export const getRole = async (roleId: number, tenantId: number): Promise<Role | null> => {
  return await roleRepository.getRole(roleId, tenantId)
}

export const createRole = async (description: string, tenantId: number): Promise<Role> => {
  return await roleRepository.createRole(description, tenantId)
}

export const updateRole = async (roleId: number, description: string, tenantId: number): Promise<Role> => {
  return await roleRepository.updateRole(roleId, description, tenantId)
}

export const deleteRole = async (roleId: number, tenantId: number): Promise<void> => {
  await roleRepository.deleteRole(roleId, tenantId)
}
