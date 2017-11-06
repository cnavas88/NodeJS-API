'use strict';

var ClientService = require('../services/clientService');

exports.findClientsById = (req, res) => 
{
    ClientService.getClientById(req.params.id, (client, err) => 
    {
        if (err)
        {
            res.json({
                "error": "Client not found"
            });
        }else
        {
            res.json({
                "data": client
            });
        }        
    });
};

exports.findClientsByName = (req, res) => 
{
    ClientService.getClientByName(req.params.name, (client, err) => 
    {
        if (err)
        {
            res.json({
                "error": "Client not found"
            });
        }else
        {
            res.json({
                "data": client
            });
        }        
    });
};