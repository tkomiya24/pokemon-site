'use strict';
var User = require('../models/user');

module.exports.createOne = function(req, res, next) {
  var user = new User(req.body);
  user.
    save().
    then(function(user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(400).send(err);
        } else {
          user.salt = undefined;
          user.password = undefined;
          res.jsonp(user);
        }
      });
    }).
    catch(function(err) {
      res.status(400).send(err);
    });
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
