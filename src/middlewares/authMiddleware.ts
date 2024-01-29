import { type Request, type Response, type NextFunction } from 'express'
import { verifyToken } from '../utils/jwtUtils'

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (token == null) {
    return res.sendStatus(401)
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const payload = verifyToken(token)
    req.locals.user = { userId: payload.userId }
    next()
  } catch (error) {
    return res.sendStatus(403)
  }
}
