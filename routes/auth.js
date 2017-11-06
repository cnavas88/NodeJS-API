'use strict';

var express = require('express');
var auth_router = express.Router();
//var ClientCtrl = require('../controllers/clients');
//var AuthenticationCtrl = require('../controllers/authentication');

auth_router.get('/clients/name/:name', (req, res) =>
{
   res.json({
        success: true,
        message: 'client by name'
   });
});//ClientCtrl.findClientsByName);

auth_router.get('/clients/:id', (req, res) =>
{
   res.json({
        success: true,
        message: 'client by id'
   });
});//ClientCtrl.findClientsById);

auth_router.get('/logout', (req, res) =>
{
   res.json({
        success: true,
        message: 'logout'
   });
});//AuthenticationCtrl.logout);

module.exports = auth_router;