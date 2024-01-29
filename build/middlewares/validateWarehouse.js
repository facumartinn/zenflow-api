export const validateWarehouse = (req, res, next) => {
    const warehouseId = req.headers['x-warehouse-id'];
    if (!warehouseId) {
        return res.status(400).send('Tenant ID is required');
    }
    req.warehouseId = parseInt(warehouseId);
    next();
};
