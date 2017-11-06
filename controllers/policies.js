'use strict';

var PoliciesService = require('../services/policieService');

exports.findPoliciesByName = (req, res) => 
{
    PoliciesService.getPolicyByUserName(req.params.name, (policies, err) => 
    {
        if (err)
        {
            res.json({
                "error": "Policy not found"
            });
        }else
        {
            res.json({
                "data": policies
            });
        }        
    });
};

exports.findClientsByPolice = (req, res) => {

    res.json({
        "message": "RETURN CLIENT ACCORDING POLICY NUMBER"
    });    

};