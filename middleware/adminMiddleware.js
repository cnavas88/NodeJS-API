'use strict';

var adminMiddleware = {};

adminMiddleware.checkIsAdmin = (req, res, next) =>
{
    if (req.decoded.role == 'admin')
    {
        return next();
    } 
    
    return next(generateError());
}

function generateError()
{
    var err = new Error();
    err.status = 401;
    err.message = 'Not authorization'
    return err;    
}

module.exports = adminMiddleware;