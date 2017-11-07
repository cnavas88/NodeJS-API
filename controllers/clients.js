'use strict';

var ClientService = require('../services/clientService');

exports.findClientsById = (req, res) => 
{
    ClientService.getClientById(req.params.id, (client, err) => 
    {
        if (err)
        {
            res.status(404).json({
                success: false,
                message: err
            });
        }else
        {
            res.json({
                success: true,
                data: client                
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
            res.status(404).json({
                success: false,
                message: err
            });
        }else
        {
            res.json({
                success: true,
                data: client
            });
        }        
    });
};