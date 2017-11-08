'use strict';

var clients     = require('./inicializeClients');
var policies    = require('./inicializePolicies');

var inicialize  = {};

inicialize.start = () =>
{
    clients.start();
    policies.start();
};

module.exports = inicialize;