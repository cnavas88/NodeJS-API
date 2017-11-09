'use strict';

require('../models/policy');

var mongoose         = require('mongoose'),
    Policy           = mongoose.model('policy'),
    ClientService    = require('../services/clientService');

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
    Policy.findOne({'_id': id_policy}, (err, res) => 
    {
        if (! res)
        {
            next(null, false);
        }
        else
        {
            next(res, true);
        }
    });
};

exports.getPolicyByUserName = (name, next) => 
{   
    let condition = {'name': name};

    ClientService.showClient(condition, (client, isNotNull) => 
    {
        if (! isNotNull)
        {
            next(null, true);
        } 
        else
        {
            Policy.find({'clientId': client.id}, (err, res) => 
            {
                if (err)
                {
                    next(null, err);
                }
                else
                {
                    next(res, null);
                }
            });
        }
    });
}

exports.getClientByPoliceId = (policyId, next) => 
{
    this.showPolicy({'_id': policyId}, (policy, isNotNull) => 
    {
        if (! isNotNull)
        {
            next(null, true);
        }
        else
        {
            ClientService.showClient({'_id': policy.clientId}, (client, isNotNull) => 
            {
                if (! isNotNull)
                {
                    next(null, true);
                } 
                else
                {
                    next(client, false);
                }
            });
        }
    });
}