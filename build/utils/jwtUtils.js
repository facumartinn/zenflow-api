import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key';
export const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '24h' });
};
export const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};
