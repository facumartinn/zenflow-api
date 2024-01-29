import { Router } from 'express'
import { authenticateToken } from '../middlewares/authMiddleware'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController'
import { validateHeaders } from '../middlewares/validateHeaders'

const router = Router()

// Obtener todos los usuarios
router.get('/',
  authenticateToken,
  validateHeaders,
  getAllUsers
)

// Obtener un usuario específico por ID
router.get('/:id',
  authenticateToken,
  validateHeaders,
  getUser
)

// Crear un nuevo usuario
router.post('/',
  authenticateToken,
  validateHeaders,
  createUser
)

// Actualizar un usuario existente
router.put('/:id',
  authenticateToken,
  validateHeaders,
  updateUser
)

// Eliminar un usuario
router.delete('/:id',
  authenticateToken,
  validateHeaders,
  deleteUser
)

export default router
