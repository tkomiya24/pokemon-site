'use strict';
var passport = require('passport');

exports.authenticate = function(res, req, next) {
  (passport.authenticate('local', function(err, user, info) {
    if (err) {
      next(err);
    } else if (!user) {
      res.status(403).send(info);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          next(err);
        } else {
          res.jsonp(user);
        }
      });
    }
  }))(req, res, next);
};
