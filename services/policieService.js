'use strict';

var Call = require('./call');
var ClientService = require('../services/clientService');

function loadPolicies(next) 
{
    var options = {
        host: 'www.mocky.io',
        port: '80',
        path: '/v2/580891a4100000e8242b75c5',
        method: 'GET',
        encoding: null
    };

    Call.callToService(options, null, (policies, err) => {

        if (err)
        {
            next(null, err);
        }else
        {
            next(policies, null);
        }

    });
};

exports.getPolicyByUserName = (name, next) => 
{    
    loadPolicies( (policies, err) => 
    {
        var thisPolicies = null;

        if (err)
        {
            next(null, err);
        }else
        {
            policies.forEach((policy, index, arr) => 
            {
                if (policy.clientId == clientId)
                {
                    thisPolicies += policy;
                }
            });
        }

        if (thisPolicies)
        {
            next(thisPolicies, null);
        }else
        {
            next(null, 'Policy not found.');
        }
    });
}