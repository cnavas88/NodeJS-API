'use strict';

var ClientService = require('../services/clientService');

exports.findClientsById = (req, res, next) => 
{
    let condition = {'_id': req.params.id};

    ClientService.showClient(condition, (client, isNotNull) => 
    {
        if (! isNotNull)
        {
            res.status(404).json({
                success: false,
                data: 'ERROR: Client Not Found.'                
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

exports.findClientsByName = (req, res, next) => 
{
    let condition = {'name': req.params.name};

    ClientService.showClient(condition, (client, isNotNull) => 
    {
        if (! isNotNull)
        {
            res.status(404).json({
                success: false,
                data: 'ERROR: Client Not Found.'                
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