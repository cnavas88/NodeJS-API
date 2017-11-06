'use strict';

var express = require('express');
var admin_router = express.Router();
//var PoliciesCtrl = require('../controllers/policies');

function checkIsAdminRole(req, res, next)
{
    if (req.decoded.role == 'admin')
    {
        next();
    } else 
    {
        res.status(403).json({
            success: false,
            message: 'Not authorization'
        });
    }
}

//PoliciesCtrl.findPoliciesByName

admin_router.get('/clients/:name/policies', checkIsAdminRole, (req, res) => 
{
    res.json({
        success: true,
        message: 'CLIENTS NAME POLICIES'
    });    
}); 

//PoliciesCtrl.findClientsByPolice

admin_router.get('/policies/:number/user', checkIsAdminRole, (req, res) =>
{
    res.json({
        success: true,
        message: 'POLICY NUMBER USER'
    });    
}); 

module.exports = admin_router;