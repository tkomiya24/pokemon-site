'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  },
  salt: {
    type: String
  }
});

userSchema.pre('save', function(next) {
  if (this.password && this.password.length > 6) {
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
  next();
});

userSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
  } else {
    return password;
  }
};

userSchema.methods.isPasswordCorrect = function(password) {
  return this.password === this.hashPassword(password);
};

module.exports = mongoose.model('User', userSchema);
