'use strict';

var express = require('express');

var app = express();

var jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');
var guest_routes = require('./guest');
var auth_routes = require('./auth');
var admin_routes = require('./admin');
//var authenticationService = require('../services/authentication');

app.use( jwtAuthMiddleware.jwtAuth );

app.use('/', guest_routes);
app.use('/', auth_routes);
app.use('/', admin_routes);

module.exports = app;