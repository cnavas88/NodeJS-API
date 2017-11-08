'use strict';

var ClientService = require('../services/clientService');

exports.findClientsById = (req, res, next) => 
{
    ClientService.getClientById(req.params.id, (client, err) => 
    {
        if (err)
        {
            next(err);
        }else
        {
            res.json({
                success: true,
                data: client                
            });
        }        
    });
};

exports.findClientsByName = (req, res, next) => 
{
    ClientService.getClientByName(req.params.name, (client, err) => 
    {
        if (err)
        {
            next(err);
        }else
        {
            res.json({
                success: true,
                data: client
            });
        }        
    });
};