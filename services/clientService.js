'use strict';

var Call = require('./call');

function loadClients(next) 
{
    var options = {
        host: 'www.mocky.io',
        port: '80',
        path: '/v2/5808862710000087232b75ac',
        method: 'GET',
        encoding: null
    };

    Call.callToService(options, null, (data, err) => {

        if (err)
        {
            next(null, err);
        }else
        {
            next(data.clients, null);
        }

    });
};

exports.getClientById = (id, next) => 
{    
    loadClients( (clients, err) => 
    {
        var thisClient = null;

        if (err)
        {
            next(null, err);
        }else
        {
            clients.forEach((client, index, arr) => 
            {
                if (client.id == id)
                {
                    thisClient = client;
                }
            });
        }

        if (thisClient)
        {
            next(thisClient, null);
        }else
        {
            next(null, 'Client not found.');
        }
    });
}

exports.getClientByName = (name, next) => 
{    
    loadClients( (clients, err) => 
    {
        var thisClient = null;

        if (err)
        {
            next(null, err);
        }else
        {
            clients.forEach((client, index, arr) => 
            {
                if (client.name == name)
                {
                    thisClient = client;
                }
            });
        }

        if (thisClient)
        {
            next(thisClient, null);
        }else
        {
            next(null, 'Client not found.');
        }
    });
}