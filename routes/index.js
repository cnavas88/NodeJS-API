'use strict';

var express = require('express');

var app = express();

var guest_routes = require('./guest');
var auth_routes = require('./auth');
var admin_routes = require('./admin');
var authenticationService = require('../services/authentication');

app.use( (req, res, next) => 
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
});

app.use('/', guest_routes);
app.use('/', auth_routes);
app.use('/', admin_routes);

module.exports = app;