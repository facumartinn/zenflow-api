import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '../utils/jwtUtils'
import { httpStatus } from '../utils/httpStatus'
import { createError } from '../utils/responseHandler'

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const token = req.headers?.authorization

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json(createError(httpStatus.UNAUTHORIZED, 'Token is required'))
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const payload = verifyToken(token)
    res.locals.user = {
      userId: payload.userId
    }
    next()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(
      createError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    )
  }
}
