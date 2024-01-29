var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getAllOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    try {
        const orderDetails = yield prisma.orderDetail.findMany({ where: { tenantId, warehouseId } });
        return res.json(orderDetails);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getOrderDetailsByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const { ids } = req.body; // Asumimos que el cuerpo de la solicitud contiene un array de IDs
    try {
        const orderDetails = yield prisma.orderDetail.findMany({
            where: {
                tenantId,
                warehouseId,
                id: {
                    in: ids
                }
            }
        });
        return res.json(orderDetails);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderDetailId = parseInt(req.params.id);
    try {
        const orderDetail = yield prisma.orderDetail.findUnique({ where: { tenantId, warehouseId, id: orderDetailId } });
        return (orderDetail != null) ? res.json(orderDetail) : res.status(404).send('OrderDetail not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const { orderId, productId, quantity, quantityPicked } = req.body;
    if (!tenantId || !warehouseId) {
        return res.status(400).send('Tenant and/or Warehouse ID is required');
    }
    try {
        const newOrderDetail = yield prisma.orderDetail.create({
            data: { tenantId, warehouseId, orderId, productId, quantity, quantityPicked }
        });
        return res.json(newOrderDetail);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderDetailId = parseInt(req.params.id);
    const { quantity, quantityPicked } = req.body;
    try {
        const updatedOrderDetail = yield prisma.orderDetail.update({
            where: { tenantId, warehouseId, id: orderDetailId },
            data: { quantity, quantityPicked }
        });
        return res.json(updatedOrderDetail);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const updates = req.body; // Asumimos que esto es un array de objetos con { orderDetailId, newStatus, ...otrosDatos }
    try {
        yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            for (const update of updates) {
                const { orderDetailId, newStatus } = update, otrosDatos = __rest(update
                // Actualizar OrderDetail
                , ["orderDetailId", "newStatus"]);
                // Actualizar OrderDetail
                yield prisma.orderDetail.update({
                    where: { tenantId, warehouseId, id: orderDetailId },
                    data: Object.assign({}, otrosDatos)
                });
                // Actualizar el estado del Order asociado, si es necesario
                if (newStatus) {
                    yield prisma.order.update({
                        where: { tenantId, warehouseId, id: update.orderId }, // Asegúrate de tener el orderId en el update
                        data: { stateId: newStatus }
                    });
                }
            }
        }));
        return res.status(200).send('OrderDetails updated successfully');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const deleteOrderDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const orderDetailId = parseInt(req.params.id);
    try {
        yield prisma.orderDetail.delete({ where: { tenantId, warehouseId, id: orderDetailId } });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
