import { generateToken, verifyToken } from '../../utils/jwtUtils' // Asegúrate de que la ruta sea correcta
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('Auth Utils', () => {
  const userId = 1
  const mockToken = 'mockToken'

  beforeEach(() => {
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (jwt.verify as jest.Mock).mockReturnValue({ userId })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('generateToken', () => {
    it('should generate a token successfully', () => {
      const token = generateToken(userId)
      expect(token).toEqual(mockToken)
      expect(jwt.sign).toHaveBeenCalledWith({ userId }, 'your-secret-key', { expiresIn: '24h' })
    })
  })

  describe('verifyToken', () => {
    it('should verify a token successfully, returning the decoded userId', () => {
      const decoded = verifyToken(mockToken)
      expect(decoded).toHaveProperty('userId', userId)
      expect(jwt.verify).toHaveBeenCalledWith(mockToken, 'your-secret-key')
    })
  })
})
