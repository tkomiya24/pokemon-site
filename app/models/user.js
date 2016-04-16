'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required'
  },
  password: {
    type: String,
    required: 'Password is required'
  }
});
module.exports = mongoose.model('User', userSchema);
