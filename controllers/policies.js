'use strict';

var PoliciesService = require('../services/policieService');

exports.findPoliciesByName = (req, res) => 
{
    PoliciesService.getPolicyByUserName(req.params.name, (policies, err) => 
    {
        if (err)
        {
            res.status(404).json({
                success: false,
                message: 'ERROR: Policies not found.'
            });
        }else
        {
            res.json({
                success: true,
                data: policies
            });
        }        
    });
};

exports.findClientsByPoliceId = (req, res) => 
{
    PoliciesService.getClientByPoliceId(req.params.policyId, (client, err) => 
    {
        if (err)
        {
            res.status(404).json({
                success: false,
                message: 'ERROR: Policies not found.'
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