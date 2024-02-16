/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllRoles = async (tenantId: number) => {
  return await prisma.role.findMany({
    where: {
      tenant_id: tenantId
    }
  })
}

export const getRole = async (roleId: number, tenantId: number) => {
  return await prisma.role.findUnique({
    where: {
      id: roleId,
      tenant_id: tenantId
    }
  })
}

export const createRole = async (description: string, tenantId: number) => {
  return await prisma.role.create({
    data: {
      description,
      tenant_id: tenantId
    }
  })
}

export const updateRole = async (roleId: number, description: string, tenantId: number) => {
  return await prisma.role.update({
    where: {
      id: roleId,
      tenant_id: tenantId
    },
    data: {
      description
    }
  })
}

export const deleteRole = async (roleId: number, tenantId: number) => {
  await prisma.role.delete({
    where: {
      id: roleId,
      tenant_id: tenantId
    }
  })
}
