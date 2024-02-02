import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { createState, deleteState, getAllStates, getState, updateState } from '../controllers/stateController.js';
import { validateHeaders } from '../middlewares/validateHeaders.js';
var router = Router();
// Obtener todos los estados
router.get('/', authenticateToken, validateHeaders, getAllStates);
// Obtener un estado específico por ID
router.get('/:id', authenticateToken, validateHeaders, getState);
// Crear un nuevo estado
router.post('/', authenticateToken, validateHeaders, createState);
// Actualizar un estado existente
router.put('/:id', authenticateToken, validateHeaders, updateState);
// Eliminar un estado
router.delete('/:id', authenticateToken, validateHeaders, deleteState);
export default router;
