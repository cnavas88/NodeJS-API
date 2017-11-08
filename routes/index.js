'use strict';

var express             = require('express');
var jwtAuthMiddleware   = require('../middleware/jwtAuthMiddleware');

var app = express();

app.use( jwtAuthMiddleware.jwtAuth );

app.use('/', require('./guest'));
app.use('/', require('./auth'));
app.use('/', require('./admin'));

app.all('*', (req, res, next) => 
{
    var err = new Error();
    err.status = 404;
    err.message = 'Resource Not found';
    next(err);
});

app.use( (err, req, res, next) => 
{
    res.status(err.status).json({
        success: false,
        message: err.message
    });
});

module.exports = app;