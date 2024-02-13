import { type User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { type UserRequestRequest } from '../controllers/authController'
import { loginRepository, registerUserRepository } from '../repositories/authRepository'

const saltRounds = 10

export const registerUserService = async (user: UserRequestRequest, tenantId: number, warehouseId: number): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    const newUser: User = await registerUserRepository(user, hashedPassword, tenantId, warehouseId)
    return newUser
  } catch (error: any) {
    throw new Error(error.message as string)
  }
}

export const loginUserService = async (userEmail: string, password: string): Promise<User | null> => {
  try {
    const user: User | null = await loginRepository(userEmail)

    if ((user == null) || !(await bcrypt.compare(password, user.password))) {
      return null
    }

    return user
  } catch (error: any) {
    throw new Error(error.message as string)
  }
}
