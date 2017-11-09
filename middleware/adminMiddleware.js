'use strict';

var adminMiddleware = {};

adminMiddleware.checkIsAdmin = (req, res, next) =>
{
    if (req.decoded.role == 'admin')
    {
        return next();
    } 
    
    return res.status(401).json({
        success: false,
        message: 'Not Authorization.'
    });
}

module.exports = adminMiddleware;