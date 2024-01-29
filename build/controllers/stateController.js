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
export const getAllStates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    try {
        const states = yield prisma.state.findMany({ where: { tenantId } });
        return res.json(states);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const getState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const stateId = parseInt(req.params.id);
    try {
        const state = yield prisma.state.findUnique({ where: { tenantId, id: stateId } });
        return (state != null) ? res.json(state) : res.status(404).send('State not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const createState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    if (!tenantId) {
        return res.status(400).send('Tenant ID is required');
    }
    const { description } = req.body;
    try {
        const newState = yield prisma.state.create({ data: { tenantId, description } });
        return res.json(newState);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const stateId = parseInt(req.params.id);
    const { description } = req.body;
    try {
        const updatedState = yield prisma.state.update({ where: { tenantId, id: stateId }, data: { description } });
        return res.json(updatedState);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const deleteState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const stateId = parseInt(req.params.id);
    try {
        yield prisma.state.delete({ where: { tenantId, id: stateId } });
        return res.status(204).send();
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
