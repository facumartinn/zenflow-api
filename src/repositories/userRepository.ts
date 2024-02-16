/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllUsers = async (tenantId: number, warehouseId: number) => {
  return await prisma.user.findMany({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
}

export const getUser = async (tenantId: number, warehouseId: number, userId: number) => {
  return await prisma.user.findUnique({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      id: userId
    }
  })
}

export const createUser = async (tenantId: number, warehouseId: number, userData: any) => {
  return await prisma.user.create({
    data: {
      ...userData,
      tenant_id: tenantId,
      warehouse_id: warehouseId
    }
  })
}

export const updateUser = async (tenantId: number, warehouseId: number, userId: number, userData: any) => {
  return await prisma.user.update({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      id: userId
    },
    data: userData
  })
}

export const deleteUser = async (tenantId: number, warehouseId: number, userId: number) => {
  return await prisma.user.delete({
    where: {
      tenant_id: tenantId,
      warehouse_id: warehouseId,
      id: userId
    }
  })
}
