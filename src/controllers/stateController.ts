import type { Request, Response } from 'express'
import * as stateService from '../services/stateService'
import { httpStatus } from '../utils/httpStatus'
import { createError, successResponse } from '../utils/responseHandler'

export const getAllStates = async (req: Request, res: Response): Promise<Response> => {
  try {
    const states = await stateService.getAllStates()
    return res.status(httpStatus.OK).json(successResponse(states, httpStatus.OK, 'States retrieved successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const getState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  try {
    const state = await stateService.getState(stateId)
    return state
      ? res.status(httpStatus.OK).json(successResponse(state, httpStatus.OK, 'State retrieved successfully'))
      : res.status(httpStatus.NOT_FOUND).json(createError(httpStatus.NOT_FOUND, 'State not found'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const createState = async (req: Request, res: Response): Promise<Response> => {
  const { description } = req.body
  try {
    const newState = await stateService.createState(description as string)
    return res.status(httpStatus.CREATED).json(successResponse(newState, httpStatus.CREATED, 'State created successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const updateState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  const { description } = req.body
  try {
    const updatedState = await stateService.updateState(stateId, description as string)
    return res.status(httpStatus.OK).json(successResponse(updatedState, httpStatus.OK, 'State updated successfully'))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}

export const deleteState = async (req: Request, res: Response): Promise<Response> => {
  const stateId = parseInt(req.params.id)
  try {
    await stateService.deleteState(stateId)
    return res.status(httpStatus.OK).json(successResponse(null, httpStatus.OK, `State ${stateId} deleted successfully`))
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error.message as string))
  }
}
