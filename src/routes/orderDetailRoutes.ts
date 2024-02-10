import { Router } from 'express'
import { authenticateToken } from '../middlewares/authMiddleware'
import { getAllOrderDetails, getOrderDetail, createOrderDetail, deleteOrderDetail, getOrderDetailsByIds, updateOrderDetails } from '../controllers/orderDetailController'
import { validateHeaders } from '../middlewares/validateHeaders'

const router = Router()

// Obtener todos los detalles de pedidos
router.get('/',
  authenticateToken,
  validateHeaders,
  getAllOrderDetails
)

// Obtener detalles de pedidos por IDs de pedidos
router.get('/by-ids',
  authenticateToken,
  validateHeaders,
  getOrderDetailsByIds
)

// Obtener un detalle de pedido específico por ID de pedido
router.get('/:id',
  authenticateToken,
  validateHeaders,
  getOrderDetail
)

// Crear un nuevo detalle de pedido
router.post('/',
  authenticateToken,
  validateHeaders,
  createOrderDetail
)

// Actualizar uno o más pedidos
router.put('/update-multiple',
  authenticateToken,
  validateHeaders,
  updateOrderDetails
)

// Eliminar un detalle de pedido
router.delete('/:id',
  authenticateToken,
  validateHeaders,
  deleteOrderDetail
)

export default router
