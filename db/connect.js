'use strict';

var mongoose = require('mongoose');

module.exports.connectToDatabase = function(callback) {
  if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
  } else {
    mongoose.connect('mongodb://localhost/pokemon-site');
  }
  mongoose.connection.on('error', console.error.bind(console, 'connection error: '));
  mongoose.connection.once('open', callback);
};
