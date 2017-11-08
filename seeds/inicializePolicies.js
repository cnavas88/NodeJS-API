'use strict';

var Call              = require('../services/call'),
    policiesService   = require('../services/policieService');

function inicializePolicies(next)
{
    var options = {
        host: 'www.mocky.io',
        port: '80',
        path: '/v2/580891a4100000e8242b75c5',
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
            next(data.policies, null);
        }

    });
}

exports.start = () =>
{
    console.log('INIT: saving policies data in database.');
    inicializePolicies((policies, err) => 
    {
        if (err)
        {
            console.log('ERROR: Not connected to policies API.');
        }
        else
        {
            policies.forEach((policy, index, arr) => 
            {
                policiesService.showPolicy(policy.id, (res) =>
                {
                    if (! res) policiesService.insertPolicy(policy);
                });
            });
        }
    });
    console.log('FINISH: Finished saving policies in database.');
}