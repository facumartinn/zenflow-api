/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as stateRepository from '../repositories/stateRepository'

export const getAllStates = async () => {
  return await stateRepository.getAllStates()
}

export const getState = async (stateId: number) => {
  return await stateRepository.getState(stateId)
}

export const createState = async (description: string) => {
  return await stateRepository.createState(description)
}

export const updateState = async (stateId: number, description: string) => {
  return await stateRepository.updateState(stateId, description)
}

export const deleteState = async (stateId: number) => {
  return await stateRepository.deleteState(stateId)
}
