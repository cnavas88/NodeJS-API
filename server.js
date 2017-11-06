'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');

var app         = express();
    
// Configuration
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = require('./routes/index');

app.use('/api', router);
/*
app.use( (err, req, res, next) => {
    res.status(404);
    res.json({
      "error": "Page not founddddd"
    });
});*/

app.listen(port);
console.log('First app with express.');