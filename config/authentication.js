'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

exports.configure = function() {
  passport.use(new LocalStrategy(function(username, password, done) {
    User.
      findOne({username: username}).
      then(function(user) {
        if (user) {
          if (user.isPasswordCorrect(password)) {
            done(null, user);
          } else {
            done(null, false, {message: 'Incorrect password'});
          }
        } else {
          done(null, false, {message: 'Incorrect username'});
        }
      });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
