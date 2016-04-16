'use strict';
var User = require('../models/user');

module.exports.createOne = function(req, res, next) {
  res.send('Created a user!');
};

module.exports.getAuthenticatedUser = function(req, res, next) {
  res.send('Get User!');
};

module.exports.update = function(req, res, next) {
  res.send('Update!!');
};

module.exports.delete = function(req, res, next) {
  res.send('User deleted!');
};
