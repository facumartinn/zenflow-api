import express from 'express'
import { type PrismaClient } from '@prisma/client'
import orderRoutes from './routes/orderRoutes'
import roleRoutes from './routes/roleRoutes'
import stateRoutes from './routes/stateRoutes'
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import orderDetailRoutes from './routes/orderDetailRoutes'
// Importar otras rutas según sea necesario

function createApp (prisma: PrismaClient): any {
  const app = express()

  app.use(express.json()) // Middleware para parsear JSON

  // Registra tus rutas aquí
  app.use('/states', stateRoutes)
  app.use('/roles', roleRoutes)
  app.use('/users', userRoutes)
  app.use('/orders', orderRoutes)
  app.use('/auth', authRoutes)
  app.use('/order-details', orderDetailRoutes)
  // app.use('/order-states', orderStateRoutes)
  //   app.use('/order-positions', orderPositionRoutes)
  //   app.use('/substitution-preferences', substitutionPreferenceRoutes)
  //   app.use('/products', productRoutes)

  // Aquí puedes agregar más configuraciones de nivel de aplicación
  // como middlewares personalizados, configuraciones de seguridad, etc.

  return app
}

export default createApp
