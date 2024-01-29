import jwt from 'jsonwebtoken'

const secretKey = 'your-secret-key'

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '24h' })
}

export const verifyToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, secretKey) as jwt.JwtPayload
}
