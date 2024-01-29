import express from 'express';
import orderRoutes from './routes/orderRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import stateRoutes from './routes/stateRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import orderDetailRoutes from './routes/orderDetailRoutes.js';
// Importar otras rutas según sea necesario
function createApp(prisma) {
    const app = express();
    app.use(express.json()); // Middleware para parsear JSON
    // Registra tus rutas aquí
    app.use('/states', stateRoutes);
    app.use('/roles', roleRoutes);
    app.use('/users', userRoutes);
    app.use('/orders', orderRoutes);
    app.use('/auth', authRoutes);
    app.use('/order-details', orderDetailRoutes);
    // app.use('/order-states', orderStateRoutes)
    //   app.use('/order-positions', orderPositionRoutes)
    //   app.use('/substitution-preferences', substitutionPreferenceRoutes)
    //   app.use('/products', productRoutes)
    // Aquí puedes agregar más configuraciones de nivel de aplicación
    // como middlewares personalizados, configuraciones de seguridad, etc.
    return app;
}
export default createApp;
