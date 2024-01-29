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
export const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    try {
        const roles = yield prisma.role.findMany({ where: { tenantId } });
        return res.json(roles);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const roleId = parseInt(req.params.id);
    try {
        const role = yield prisma.role.findUnique({ where: { tenantId, id: roleId } });
        return (role != null) ? res.json(role) : res.status(404).send('Role not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    if (!tenantId) {
        return res.status(400).send('Tenant ID is required');
    }
    const { description } = req.body;
    try {
        const newRole = yield prisma.role.create({ data: { tenantId, description } });
        return res.json(newRole);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const roleId = parseInt(req.params.id);
    const { description } = req.body;
    try {
        const updatedRole = yield prisma.role.update({ where: { tenantId, id: roleId }, data: { description } });
        return res.json(updatedRole);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const roleId = parseInt(req.params.id);
    try {
        yield prisma.role.delete({ where: { tenantId, id: roleId } });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
