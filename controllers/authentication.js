'use strict';

var ClientService   = require('../services/clientService');
var authenticationService = require('../services/authentication');

exports.login = (req, res) => 
{
    var condition = {'name': req.body.name};

    ClientService.showClient(
        condition
    , (client, err) => {

        if (err)
        {
            return res.status(500).json({
                success: false,
                message: err
            });
        }

        if (!client)
        {
            return res.status(422).json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } 

        if (client.password != req.body.password) // TODO - CREAR EL COMPARE EN EL SERVICIO DEL PASSWORD
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