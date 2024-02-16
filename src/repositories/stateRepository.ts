/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllStates = async () => {
  return await prisma.state.findMany()
}

export const getState = async (stateId: number) => {
  return await prisma.state.findUnique({
    where: { id: stateId }
  })
}

export const createState = async (description: string) => {
  return await prisma.state.create({
    data: { description }
  })
}

export const updateState = async (stateId: number, description: string) => {
  return await prisma.state.update({
    where: { id: stateId },
    data: { description }
  })
}

export const deleteState = async (stateId: number) => {
  return await prisma.state.delete({
    where: { id: stateId }
  })
}
