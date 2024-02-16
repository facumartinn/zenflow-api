/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as userRepository from '../repositories/userRepository'

export const getAllUsers = async (tenantId: number, warehouseId: number) => {
  return await userRepository.getAllUsers(tenantId, warehouseId)
}

export const getUser = async (tenantId: number, warehouseId: number, userId: number) => {
  return await userRepository.getUser(tenantId, warehouseId, userId)
}

export const createUser = async (tenantId: number, warehouseId: number, userData: any) => {
  return await userRepository.createUser(tenantId, warehouseId, userData)
}

export const updateUser = async (tenantId: number, warehouseId: number, userId: number, userData: any) => {
  return await userRepository.updateUser(tenantId, warehouseId, userId, userData)
}

export const deleteUser = async (tenantId: number, warehouseId: number, userId: number) => {
  return await userRepository.deleteUser(tenantId, warehouseId, userId)
}
