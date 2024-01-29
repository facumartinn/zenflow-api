export const validateTenant = (req, res, next) => {
    const tenantId = req.headers['x-tenant-id'];
    if (!tenantId) {
        return res.status(400).send('Tenant ID is required');
    }
    req.tenantId = parseInt(tenantId);
    next();
};
