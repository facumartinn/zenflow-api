import { httpStatus } from '../utils/httpStatus.js';
import { createError } from '../utils/responseHandler.js';
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export var validateHeaders = function (req, res, next) {
    var tenantId = req.headers['x-tenant-id'];
    var warehouseId = req.headers['x-warehouse-id'];
    if (!tenantId) {
        return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'Tenant ID is required and must be a valid number'));
    }
    if (!warehouseId) {
        return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'Warehouse ID is required and must be a valid number'));
    }
    var tenantIdNum = parseInt(tenantId);
    var warehouseIdNum = parseInt(warehouseId);
    if (isNaN(tenantIdNum) || isNaN(warehouseIdNum)) {
        return res.status(httpStatus.BAD_REQUEST).json(createError(httpStatus.BAD_REQUEST, 'Invalid tenant or warehouse ID'));
    }
    res.locals.tenant_id = tenantIdNum;
    res.locals.warehouse_id = warehouseIdNum;
    next();
};
