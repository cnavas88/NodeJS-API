'use strict';

var express = require('express');
var authMiddleware = require('../middleware/adminMiddleware');
var admin_router = express.Router();
var PoliciesCtrl = require('../controllers/policies');

admin_router.get('/clients/:name/policies', authMiddleware.checkIsAdmin, PoliciesCtrl.findPoliciesByName); 

admin_router.get('/policies/:policyId/client', authMiddleware.checkIsAdmin, PoliciesCtrl.findClientsByPoliceId); 

module.exports = admin_router;