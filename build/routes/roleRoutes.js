import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { createRole, getRole, updateRole, deleteRole, getAllRoles } from '../controllers/roleController.js';
import { validateHeaders } from '../middlewares/validateHeaders.js';
const router = Router();
// Obtener todos los roles
router.get('/', authenticateToken, validateHeaders, getAllRoles);
// Obtener un rol específico por ID
router.get('/:id', authenticateToken, validateHeaders, getRole);
// Crear un nuevo rol
router.post('/', authenticateToken, validateHeaders, createRole);
// Actualizar un rol existente
router.put('/:id', authenticateToken, validateHeaders, updateRole);
// Eliminar un rol
router.delete('/:id', authenticateToken, validateHeaders, deleteRole);
export default router;
