var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { PrismaClient } from '@prisma/client';
import { httpStatus } from '../utils/httpStatus.js';
import { createError, successResponse } from '../utils/responseHandler.js';
var prisma = new PrismaClient();
export var getAllOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.findMany({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId
                        }
                    })];
            case 2:
                orders = _a.sent();
                if (orders.length === 0) {
                    return [2 /*return*/, res.status(httpStatus.NO_CONTENT).json(createError(httpStatus.NO_CONTENT, 'No orders found'))];
                }
                return [2 /*return*/, res.status(httpStatus.OK).json(successResponse(orders, httpStatus.OK, 'Orders found'))];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error_1.message))];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getFilteredOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, _a, stateId, startDate, endDate, userId, filters, orders, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                _a = req.query, stateId = _a.stateId, startDate = _a.startDate, endDate = _a.endDate, userId = _a.userId;
                filters = {};
                if (stateId) {
                    filters.state_id = parseInt(stateId);
                }
                if (userId) {
                    filters.user_id = parseInt(userId);
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
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.findMany({
                        where: __assign({ tenant_id: tenantId, warehouse_id: warehouseId }, filters)
                    })];
            case 2:
                orders = _b.sent();
                if (orders.length === 0) {
                    return [2 /*return*/, res.status(httpStatus.NO_CONTENT).json(createError(httpStatus.NO_CONTENT, 'No orders found'))];
                }
                return [2 /*return*/, res.status(httpStatus.OK).json(successResponse(orders, httpStatus.OK, 'Orders found'))];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error_2.message))];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderId, order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.findUnique({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: orderId
                        }
                    })];
            case 2:
                order = _a.sent();
                if (!order) {
                    return [2 /*return*/, res.status(httpStatus.NO_CONTENT).json(createError(httpStatus.NO_CONTENT, 'Order not found'))];
                }
                return [2 /*return*/, res.status(httpStatus.OK).json(successResponse(order, httpStatus.OK, 'Order found'))];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).json(createError(httpStatus.INTERNAL_SERVER_ERROR, error_3.message))];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var createOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, newOrders, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                // Aquí deberías obtener los datos necesarios de req.body
                // Por ejemplo: const { amount, user_id } = req.body;
                if (!tenantId || !warehouseId) {
                    return [2 /*return*/, res.status(400).send('Tenant and/or Warehouse ID is required')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.createMany({
                        data: req.body // req.body debe ser un array de objetos de pedido
                    })];
            case 2:
                newOrders = _a.sent();
                return [2 /*return*/, res.json(newOrders)];
            case 3:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(400).json({ error: error_4.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var updateOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderId, updatedOrder, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.update({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: orderId
                        },
                        data: {
                        /* datos actualizados */
                        }
                    })];
            case 2:
                updatedOrder = _a.sent();
                return [2 /*return*/, res.json(updatedOrder)];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(400).json({ error: error_5.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderId, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.order.delete({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: orderId
                        }
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(204).send()];
            case 3:
                error_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_6.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var updateOrderStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderId, _a, newstateId, userId, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderId = parseInt(req.params.orderId);
                _a = req.body // Asumimos que el nuevo estado y el ID del usuario se envían en el cuerpo de la solicitud
                , newstateId = _a.newstateId, userId = _a.userId;
                if (!tenantId || !warehouseId) {
                    return [2 /*return*/, res.status(400).send('Tenant and/or Warehouse ID is required')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // Actualizar el estado en la tabla Order
                                return [4 /*yield*/, prisma.order.update({
                                        where: {
                                            tenant_id: tenantId,
                                            warehouse_id: warehouseId,
                                            id: orderId
                                        },
                                        data: {
                                            state_id: newstateId
                                        }
                                    })
                                    // Crear un registro en OrderStates
                                ];
                                case 1:
                                    // Actualizar el estado en la tabla Order
                                    _a.sent();
                                    // Crear un registro en OrderStates
                                    return [4 /*yield*/, prisma.orderState.create({
                                            data: {
                                                tenant_id: tenantId,
                                                order_id: orderId,
                                                state_id: newstateId,
                                                user_id: userId, // Suponiendo que se registra el usuario que hizo el cambio
                                                creationDate: new Date() // O usa la fecha/hora actual por defecto en tu base de datos
                                            }
                                        })];
                                case 2:
                                    // Crear un registro en OrderStates
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _b.sent();
                return [2 /*return*/, res.status(200).send('Order status updated successfully')];
            case 3:
                error_7 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_7.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
