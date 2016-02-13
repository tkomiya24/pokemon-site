'use strict';

var pokemonNames = require('./allPokemonNames');
var pokemonObjects = [];
var Pokemon = require('../app/models/pokemon');
var db = require('./connect');

for (var i = 0; i < pokemonNames.length; i++) {
  var pokemon = {};
  pokemon.name = pokemonNames[i];
  pokemon._id = i;
  pokemonObjects.push(pokemon);
}

db.connectToDatabase(function() {
  Pokemon.create(pokemonObjects, function(err, pokemon) {
    if (err) {
      console.log(err);
      process.exit(0);
    } else {
      process.exit(1);
    }
  });
});
