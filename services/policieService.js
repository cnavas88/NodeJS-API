'use strict';

require('../models/policy');

var mongoose         = require('mongoose'),
    Policy           = mongoose.model('policy');

mongoose.Promise     = require('bluebird');

exports.insertPolicy = (policy) =>
{
    var new_policy = new Policy({
        _id:                policy.id,
        amountInsured:      policy.amountInsured,
        email:              policy.email,
        inceptionDate:      policy.inceptionDate,
        installmentPayment: policy.installmentPayment,
        clientId:           policy.clientId,
    });           

    new_policy.save();
};

exports.showPolicy = (id_policy, next) =>
{
    Policy.find({'_id': id_policy}, (err, res) => 
    {
        if (err)
        {
            next(false);
        }
        else
        {
            next(true);
        }
    });
};

/*var Call = require('./call');
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

function generateError(message)
{
    var err = new Error();
    err.status = 404;
    err.message = message;
    return err;    
}

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
                    next(null, generateError('This name not have associate policies.'));
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
                next(null, generateError('Policy not found.'));
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
}*/