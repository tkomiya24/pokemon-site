'use strict';

var mongoose = require('mongoose');

var pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    index: true,
    unique: true
  },
  _id: {
    type: Number,
    required: true,
    index: true,
    unique: true
  }
});
mongoose.model('Pokemon', pokemonSchema);
module.exports = mongoose.model('Pokemon');
