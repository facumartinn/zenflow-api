import jwt from 'jsonwebtoken';
var secretKey = 'your-secret-key';
export var generateToken = function (userId) {
    return jwt.sign({ userId: userId }, secretKey, { expiresIn: '24h' });
};
export var verifyToken = function (token) {
    return jwt.verify(token, secretKey);
};
