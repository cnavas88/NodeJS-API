'use strict';

var ClientService         = require('../services/clientService'),
    hash                  = require('../services/password'),
    authenticationService = require('../services/authentication');

exports.login = (req, res) => 
{
    if (! req.body.name)
    {
        return res.status(422).json({
            success: false,
            message: 'Authentication failed. The field name is required.'
        });        
    }

    var condition = {'name': req.body.name};

    ClientService.showClient(
        condition
    , (client, isNotNull) => {

        if (! isNotNull)
        {
            return res.status(404).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        }
        
        if (!req.body.password || !hash.comparePassword(client.password, req.body.password))
        {
            return res.status(401).json({
                success: false,
                message: 'Authetication failed. Wrong password.'
            });            
        }

        var token = authenticationService.generateToken(client.role);

        return res.json({
            success: true,
            data: token
        });
    });
};