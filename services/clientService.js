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

exports.showClient = (id_client, next) =>
{
    Client.find({'_id': id_client}, (err, res) => 
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
/*

function generateError()
{
    var err = new Error();
    err.status = 404;
    err.message = 'Client not found.';
    return err;    
}

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
            next(null, generateError());
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
            next(null, generateError());
        }
    });
}*/