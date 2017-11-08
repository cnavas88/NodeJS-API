'use strict';

var Call            = require('../services/call'),
    clientService   = require('../services/clientService');

function inicializeClients(next)
{
    var options = {
        host: 'www.mocky.io',
        port: '80',
        path: '/v2/5808862710000087232b75ac',
        method: 'GET',
        encoding: null
    };

    Call.callToService(options, null, (data, err) => 
    {
        if (err)
        {
            next(null, err);
        }
        else
        {
            next(data.clients, null);
        }

    });
}

exports.start = () =>
{
    console.log('INIT: saving clients data in database.');
    inicializeClients((clients, err) => 
    {
        if (err)
        {
            console.log('ERROR: Not connected to clients API.');
        }
        else
        {
            clients.forEach((client, index, arr) => 
            {
                clientService.showClient({'_id': client.id}, (data, exists) =>
                {
                    if (! exists) clientService.insertClient(client);
                });
            });
        }
    });
    console.log('FINISH: Finished saving clients in database.');
}