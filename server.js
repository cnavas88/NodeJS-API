'use strict';

var express     = require('express'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose'),
    inicialize  = require('./seeds/inicializeClients');

var app         = express();

// Configuration
var urlDatabase = 'mongodb://localhost/test-altran';
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Get the URLs
app.use('/api', require('./routes/index'));

mongoose.connect(urlDatabase, { useMongoClient: true }, (err, res) => 
{   
    if (err)
    {
        console.log('ERROR: Connection to Mongo failed.');
    }
    else
    {
        console.log('Connect to MongoDB.');
        
        // Apply the seeders
        inicialize.start();

        app.listen(port);
        console.log('Altran test Backend, start !!!.');
    }
});

process.on('SIGINT', () =>
{  
    mongoose.connection.close( () =>
    { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0);
    }); 
});