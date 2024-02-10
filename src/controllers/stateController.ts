import type { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

const prisma = new PrismaClient()

export const getAllStates = async (req: Request, res: Response): Promise<Response> => {
  try {
    const states = await prisma.state.findMany()
    return res.status(httpStatus.OK).json(successResponse(states, httpStatus.OK, 'States retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const getState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  try {
    const state = await prisma.state.findUnique({
      where: {
        id: stateId
      }
    })
    return (state != null)
      ? res.status(httpStatus.OK).json(successResponse(state, httpStatus.OK, 'State retrieved successfully'))
      : res.status(httpStatus.OK).json(successResponse(state, httpStatus.OK, 'State not found'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const createState = async (req: Request, res: Response): Promise<Response> => {
  const { description } = req.body
  try {
    const newState = await prisma.state.create({
      data: {
        description
      }
    })
    return res.status(httpStatus.OK).json(successResponse(newState, httpStatus.OK, 'State created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const updateState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  const { description } = req.body
  try {
    const stateExists = await prisma.state.findUnique({
      where: {
        id: stateId
      }
    })

    if (!stateExists) {
      return res.status(httpStatus.NOT_FOUND).json(
        createError(httpStatus.NOT_FOUND, 'State not found')
      )
    }

    const updatedState = await prisma.state.update({
      where: {
        id: stateId
      },
      data: {
        description
      }
    })
    return res.status(httpStatus.OK).json(successResponse(updatedState, httpStatus.OK, 'State updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}

export const deleteState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  try {
    const stateExists = await prisma.state.findUnique({
      where: {
        id: stateId
      }
    })

    if (!stateExists) {
      return res.status(httpStatus.NOT_FOUND).json(
        createError(httpStatus.NOT_FOUND, 'State not found')
      )
    }
    await prisma.state.delete({
      where: {
        id: stateId
      }
    })
    return res.status(httpStatus.OK).json(successResponse(null, httpStatus.OK, `State ${stateId} deleted successfully`))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
      createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string)
    )
  }
}
