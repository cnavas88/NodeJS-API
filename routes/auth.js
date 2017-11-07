'use strict';

var express = require('express');
var auth_router = express.Router();
var ClientCtrl = require('../controllers/clients');

auth_router.get('/clients/name/:name', ClientCtrl.findClientsByName);

auth_router.get('/clients/:id', ClientCtrl.findClientsById);

module.exports = auth_router;