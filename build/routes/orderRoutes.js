import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { createOrders, getOrder, updateOrder, deleteOrder, getAllOrders, updateOrderStatus, getFilteredOrders } from '../controllers/orderController.js';
import { validateHeaders } from '../middlewares/validateHeaders.js';
const router = Router();
// Obtener todos los pedidos
router.get('/', authenticateToken, validateHeaders, getAllOrders);
// Obtener pedidos con filtros
router.get('/filtered', authenticateToken, validateHeaders, getFilteredOrders);
// Obtener un pedido específico por ID
router.get('/:id', authenticateToken, validateHeaders, getOrder);
// Crear un nuevo pedido
router.post('/', authenticateToken, validateHeaders, createOrders);
// Actualizar un pedido existente
router.put('/:id', authenticateToken, validateHeaders, updateOrder);
// Eliminar un pedido
router.delete('/:id', authenticateToken, validateHeaders, deleteOrder);
// Ruta para actualizar el estado de un pedido
router.patch('/update-status/:orderId', authenticateToken, validateHeaders, updateOrderStatus);
export default router;
