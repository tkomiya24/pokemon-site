'use strict';

var pokemonNames = require('./seed/allPokemonNames');
var pokemonObjects = [];
var Pokemon = require('../app/models/pokemon');
var db = require('./connect');

function getGeneration(id) {
  if (id <= 0) {
    return;
  } else if (id <= 151) {
    return 1;
  } else if (id <= 251) {
    return 2;
  } else if (id <= 386) {
    return 3;
  } else if (id <= 493) {
    return 4;
  } else if (id <= 649) {
    return 5;
  } else if (id <= 719) {
    return 6;
  }
}

for (var i = 0; i < pokemonNames.length; i++) {
  var pokemon = {};
  pokemon.name = pokemonNames[i];
  pokemon._id = i + 1;
  pokemon.generation = getGeneration(i + 1);
  pokemonObjects.push(pokemon);
}

function exitIfError(err) {
  if (err) {
    console.log(err);
    process.exit(0);
  }
}

db.connectToDatabase(function() {
  Pokemon.remove({}, function(err) {
    exitIfError(err);
    Pokemon.create(pokemonObjects, function(err, pokemon) {
      exitIfError(err);
      console.log('Success');
      process.exit(1);
    });
  });
});
