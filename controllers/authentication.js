'use strict';

var ClientService   = require('../services/clientService');
var authenticationService = require('../services/authentication');

exports.login = (req, res) => 
{
    ClientService.getClientByName(
        req.body.name
    , (client, err) => {

        if (err)
        {
            res.status(500).json({
                success: false,
                message: err
            });
        }

        if (!client)
        {
            res.status(422).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (client)
        {
            var token = authenticationService.generateToken(client.role);

            res.json({
                success: true,
                data: token
            });
        }
    });
};