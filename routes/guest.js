'use strict';

var express = require('express');
var guest_router = express.Router();
var AuthenticationCtrl = require('../controllers/authentication');

guest_router.post('/', AuthenticationCtrl.login);

module.exports = guest_router;