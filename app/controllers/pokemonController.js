'use strict';
var Pokemon = require('../models/pokemon');

module.exports.getAll = function(req, res) {
  Pokemon.find({}, function(err, pokemon) {
    if (err) {
      res.status(400).send(err);
    } else if (!pokemon) {
      res.status(400).send({message: 'Unable to retrieve Pokémon from database'});
    } else {
      res.jsonp(pokemon);
    }
  });
};
