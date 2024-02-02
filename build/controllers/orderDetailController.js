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
var prisma = new PrismaClient();
export var getAllOrderDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderDetails, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.orderDetail.findMany({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId
                        }
                    })];
            case 2:
                orderDetails = _a.sent();
                return [2 /*return*/, res.json(orderDetails)];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_1.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getOrderDetailsByIds = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, ids, orderDetails, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                ids = req.body // Asumimos que el cuerpo de la solicitud contiene un array de IDs
                .ids;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.orderDetail.findMany({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: {
                                in: ids
                            }
                        }
                    })];
            case 2:
                orderDetails = _a.sent();
                return [2 /*return*/, res.json(orderDetails)];
            case 3:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getOrderDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderDetailId, orderDetail, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderDetailId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.orderDetail.findUnique({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: orderDetailId
                        }
                    })];
            case 2:
                orderDetail = _a.sent();
                return [2 /*return*/, (orderDetail != null) ? res.json(orderDetail) : res.status(404).send('OrderDetail not found')];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var createOrderDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, _a, orderId, productId, quantity, quantityPicked, newOrderDetail, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                _a = req.body, orderId = _a.orderId, productId = _a.productId, quantity = _a.quantity, quantityPicked = _a.quantityPicked;
                if (!tenantId || !warehouseId) {
                    return [2 /*return*/, res.status(400).send('Tenant and/or Warehouse ID is required')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.orderDetail.create({
                        data: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            order_id: orderId,
                            product_id: productId,
                            quantity: quantity,
                            quantityPicked: quantityPicked
                        }
                    })];
            case 2:
                newOrderDetail = _b.sent();
                return [2 /*return*/, res.json(newOrderDetail)];
            case 3:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(400).json({ error: error_4.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var updateOrderDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, updates, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                updates = req.body // Asumimos que esto es un array de objetos con { orderDetailId, newStatus, ...otrosDatos }
                ;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.$transaction(function (prisma) { return __awaiter(void 0, void 0, void 0, function () {
                        var _i, updates_1, update, orderDetailId, newStatus, otrosDatos;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _i = 0, updates_1 = updates;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < updates_1.length)) return [3 /*break*/, 5];
                                    update = updates_1[_i];
                                    orderDetailId = update.orderDetailId, newStatus = update.newStatus, otrosDatos = __rest(update
                                    // Actualizar OrderDetail
                                    , ["orderDetailId", "newStatus"]);
                                    // Actualizar OrderDetail
                                    return [4 /*yield*/, prisma.orderDetail.update({
                                            where: {
                                                tenant_id: tenantId,
                                                warehouse_id: warehouseId,
                                                id: orderDetailId
                                            },
                                            data: __assign({}, otrosDatos)
                                        })
                                        // Actualizar el estado del Order asociado, si es necesario
                                    ];
                                case 2:
                                    // Actualizar OrderDetail
                                    _a.sent();
                                    if (!newStatus) return [3 /*break*/, 4];
                                    return [4 /*yield*/, prisma.order.update({
                                            where: {
                                                tenant_id: tenantId,
                                                warehouse_id: warehouseId,
                                                id: update.orderId
                                            }, // Asegúrate de tener el orderId en el update
                                            data: {
                                                state_id: newStatus
                                            }
                                        })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).send('OrderDetails updated successfully')];
            case 3:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({ error: error_5.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var deleteOrderDetail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tenantId, warehouseId, orderDetailId, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tenantId = res.locals.tenant_id;
                warehouseId = res.locals.warehouse_id;
                orderDetailId = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.orderDetail.delete({
                        where: {
                            tenant_id: tenantId,
                            warehouse_id: warehouseId,
                            id: orderDetailId
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
