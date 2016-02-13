'use strict';

var mongoose = require('mongoose');

module.exports.connectToDatabase = function(callback) {
  mongoose.connect('mongodb://localhost/pokemon-site');
  mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
  mongoose.connection.once('open', callback);
};
