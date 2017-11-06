'use strict';

var jwt = require('jsonwebtoken');

var authentication = {};

authentication.secret = 'altran-test';

authentication.generateToken = (clientRole) =>
{
    const payload = {
        role: clientRole
    };

    return jwt.sign(payload, authentication.secret);
}

authentication.verifyToken = (token, next) =>
{
    try
    {
        return jwt.verify(token, authentication.secret);
    } catch(err) 
    {
        throw err;
    }
}

module.exports = authentication;