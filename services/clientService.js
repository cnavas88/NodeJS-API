'use strict';

require('../models/client');

var mongoose         = require('mongoose'),
    hash             = require('./password'),
    Client           = mongoose.model('client');

mongoose.Promise     = require('bluebird');

exports.insertClient = (client) =>
{
    hash.generatePassword(client.name, (password, err) => 
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            var new_client = new Client({
                _id:        client.id,
                name:       client.name,
                email:      client.email,
                password:   password,
                role:       client.role
            });           

            new_client.save();     
        }
    });   
};

exports.showClient = (condition, next) =>
{
    Client.findOne(condition, (err, res) => 
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