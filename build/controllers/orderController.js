var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    try {
        const orders = yield prisma.order.findMany({ where: { tenantId, warehouseId } });
        return res.json(orders);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getFilteredOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const { stateId, startDate, endDate, userId } = req.query;
    const filters = {};
    if (stateId) {
        filters.stateId = parseInt(stateId);
    }
    if (userId) {
        filters.userId = parseInt(userId);
    }
    if (startDate || endDate) {
        filters.assemblyDate = {};
        if (startDate) {
            filters.assemblyDate.gte = new Date(startDate);
        }
        if (endDate) {
            filters.assemblyDate.lte = new Date(endDate);
        }
    }
    try {
        const orders = yield prisma.order.findMany({
            where: Object.assign({ tenantId, warehouseId }, filters)
        });
        return res.json(orders);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderId = parseInt(req.params.id);
    try {
        const order = yield prisma.order.findUnique({ where: { tenantId, warehouseId, id: orderId } });
        return (order != null) ? res.json(order) : res.status(404).send('Order not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    // Aquí deberías obtener los datos necesarios de req.body
    // Por ejemplo: const { amount, user_id } = req.body;
    if (!tenantId || !warehouseId) {
        return res.status(400).send('Tenant and/or Warehouse ID is required');
    }
    try {
        // Asumiendo que req.body es un array de pedidos
        const newOrders = yield prisma.order.createMany({
            data: req.body // req.body debe ser un array de objetos de pedido
        });
        return res.json(newOrders);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderId = parseInt(req.params.id);
    // Obtener datos actualizados de req.body
    try {
        const updatedOrder = yield prisma.order.update({ where: { tenantId, warehouseId, id: orderId }, data: { /* datos actualizados */} });
        return res.json(updatedOrder);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderId = parseInt(req.params.id);
    try {
        yield prisma.order.delete({ where: { tenantId, warehouseId, id: orderId } });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderId = parseInt(req.params.orderId);
    const { newStateId, userId } = req.body; // Asumimos que el nuevo estado y el ID del usuario se envían en el cuerpo de la solicitud
    if (!tenantId || !warehouseId) {
        return res.status(400).send('Tenant and/or Warehouse ID is required');
    }
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Actualizar el estado en la tabla Order
            yield prisma.order.update({
                where: { tenantId, warehouseId, id: orderId },
                data: { stateId: newStateId }
            });
            // Crear un registro en OrderStates
            yield prisma.orderState.create({
                data: {
                    tenantId,
                    orderId,
                    stateId: newStateId,
                    userId, // Suponiendo que se registra el usuario que hizo el cambio
                    creationDate: new Date() // O usa la fecha/hora actual por defecto en tu base de datos
                }
            });
        }));
        return res.status(200).send('Order status updated successfully');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
