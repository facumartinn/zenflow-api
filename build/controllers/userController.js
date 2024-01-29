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
export const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    try {
        const users = yield prisma.user.findMany({ where: { tenantId, warehouseId } });
        return res.json(users);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const userId = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({
            where: { tenantId, warehouseId, id: userId }
        });
        if (user != null) {
            return res.json(user);
        }
        else {
            return res.status(404).send('User not found');
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    if (!tenantId || !warehouseId) {
        return res.status(400).send('Tenant and/or Warehouse ID is required');
    }
    const { name, password, barcode, roleId } = req.body;
    try {
        const newUser = yield prisma.user.create({
            data: { tenantId, warehouseId, name, password, barcode, roleId }
        });
        return res.json(newUser);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const userId = parseInt(req.params.id);
    const { name, password, barcode, roleId } = req.body;
    try {
        const updatedUser = yield prisma.user.update({
            where: { tenantId, warehouseId, id: userId },
            data: { name, password, barcode, roleId }
        });
        return res.json(updatedUser);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const userId = parseInt(req.params.id);
    try {
        yield prisma.user.delete({
            where: { tenantId, warehouseId, id: userId }
        });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
