'use strict';

var express = require('express');
var app = express();

function configureExpressApp() {
  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname + '/public'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
}

function startExpressApp() {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
}

configureExpressApp();
startExpressApp();
