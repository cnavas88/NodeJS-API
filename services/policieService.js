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

    Call.callToService(options, null, (data, err) => {

        if (err)
        {
            next(null, err);
        }else
        {
            next(data.policies, null);
        }

    });
};

exports.getPolicyByUserName = (name, next) => 
{    
    loadPolicies( (policies, err) => 
    {
        if (err)
        {
            next(null, err);
        }else
        {
            ClientService.getClientByName(name, (client, err) => {

                var thisPolicies = [];

                if (err)
                {
                    next(null, err);
                } else
                {
                    policies.forEach((policy, index, arr) => 
                    {
                        if (policy.clientId == client.id)
                        {
                            thisPolicies.push(policy);
                        }
                    });
                }

                if (thisPolicies.length > 0)
                {
                    next(thisPolicies, null);
                }else
                {
                    next(null, 'This name not have associate policies.');
                }

            });
        }
    });
}

exports.getClientByPoliceId = (policyId, next) => 
{   
    loadPolicies( (policies, err) => 
    {
        var thisPolicy = null;

        if (err)
        {
            next(null, err);
        }else
        {
            policies.forEach((policy, index, arr) => 
            {
                if (policy.id == policyId)
                {
                    thisPolicy = policy;
                }
            });

            if (thisPolicy == null)
            {
                next(null, 'Policy not found.')
            }
            else
            {
                ClientService.getClientById(thisPolicy.clientId, (client, err) => 
                {
                    if (err)
                    {
                        next(null, err);
                    } else
                    {
                        next(client, null);
                    }
                });
            }
        }
    });
}