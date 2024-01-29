var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { generateToken } from '../utils/jwtUtils.js';
const prisma = new PrismaClient();
const saltRounds = 10;
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    try {
        if (!tenantId || !warehouseId) {
            return res.status(400).send('Tenant and/or Warehouse ID is required');
        }
        const { username, password, barcode } = req.body;
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        const user = yield prisma.user.create({
            data: {
                name: username,
                password: hashedPassword,
                barcode,
                tenantId,
                warehouseId
            }
        });
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tenantId = req.tenantId;
    const warehouseId = req.warehouseId;
    const { username, password } = req.body;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                tenantId,
                warehouseId,
                name: username,
                password
            }
        });
        if ((user == null) || !(yield bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = generateToken(user.id);
        return res.json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
