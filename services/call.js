'use strict';

var http = require('http');

exports.callToService = (options, jsonObject, next) => 
{
    var req = http.request(options, (res) => 
    {
        var contentType = res.headers['content-type'];
 
        var data = '';
 
        res.on('data', (chunk) => 
        {
            data += chunk;
        }).on('end', () => 
        {
            var response = null;
 
            if (contentType.indexOf('application/json') != -1) 
            {
                response = JSON.parse(data);
            }

            next(response, null);
        })
        .on('error', (err) => 
        {
            console.error('Error al procesar el mensaje: ' + err)
        })
        .on('uncaughtException', function (err) 
        {
            console.error(err);
        });
    }).on('error', (err) => 
    {
        console.error('HTTP request failed: ' + err);
        next(null, err);
    });
 
    if (jsonObject) 
    {
        req.write(jsonObject);
    }
 
    req.end();
};