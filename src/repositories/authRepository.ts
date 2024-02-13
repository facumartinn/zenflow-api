import { PrismaClient, type User } from '@prisma/client'
import { type UserRequestRequest } from '../controllers/authController'

const prisma = new PrismaClient()

export const registerUserRepository = async (
  user: UserRequestRequest,
  hashedPassword: string,
  tenantId: number,
  warehouseId: number
): Promise<User> => {
  const { userEmail, barcode, roleId }: UserRequestRequest = user

  try {
    const newUser: User = await prisma.user.create({
      data: {
        user_email: userEmail,
        password: hashedPassword,
        role_id: roleId,
        barcode,
        tenant_id: tenantId,
        warehouse_id: warehouseId
      }
    })
    return newUser
  } catch (error: any) {
    throw new Error(error.message as string)
  }
}

export const loginRepository = async (userEmail: string): Promise<User | null> => {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: 1,
        user_email: userEmail
      }
    })

    return user
  } catch (error: any) {
    throw new Error(error.message as string)
  }
}
