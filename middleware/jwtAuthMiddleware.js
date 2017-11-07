'use strict';

var authenticationService = require('../services/authentication');

var jwtAuthMiddleware = {};

jwtAuthMiddleware.jwtAuth = (req, res, next) => 
{
    var token = req.headers.authorization;

    if (req.path == '/')
    {
        return next();
    }

    if (token)
    {
        token = token.replace('Bearer ', '')

        try{
            var decoded = authenticationService.verifyToken(token);
        } 
        catch(err)
        {
            return res.status(422).json({ 
                success: false, 
                message: 'Failed to authenticate token.' 
            });
        }

        if (decoded)
        {
            req.decoded = decoded;
            return next();
        }
    } 

    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
}

module.exports = jwtAuthMiddleware;