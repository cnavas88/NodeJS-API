'use strict';

var adminMiddleware = {};

adminMiddleware.checkIsAdmin = (req, res, next) =>
{
    if (req.decoded.role == 'admin')
    {
        next();
    } else 
    {
        res.status(403).json({
            success: false,
            message: 'Not authorization'
        });
    }
}

module.exports = adminMiddleware;