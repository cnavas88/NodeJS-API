'use strict';

var express = require('express');
var authMiddleware = require('../middleware/adminMiddleware');
var admin_router = express.Router();
//var PoliciesCtrl = require('../controllers/policies');

//PoliciesCtrl.findPoliciesByName

admin_router.get('/clients/:name/policies', authMiddleware.checkIsAdmin, (req, res) => 
{
    res.json({
        success: true,
        message: 'CLIENTS NAME POLICIES'
    });    
}); 

//PoliciesCtrl.findClientsByPolice

admin_router.get('/policies/:number/user', authMiddleware.checkIsAdmin, (req, res) =>
{
    res.json({
        success: true,
        message: 'POLICY NUMBER USER'
    });    
}); 

module.exports = admin_router;