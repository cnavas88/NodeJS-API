var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    app = express();

app.use(bodyParser());

var port = process.env.PORT || 3000;

// PROCESAR RUTAS
var routes = require('./routes/api');

app.use('/api', routes);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('First app with express.');