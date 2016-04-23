angular.module('pokeApp').controller('testController', ['$scope', 'Pokemon',
  function($scope, Pokemon) {

    'use strict';

    //local variables
    var index = 0;
    var gen;
    var pokemon;

    //scope variables.
    $scope.inputAnswer = '';
    $scope.streak = 0;
    $scope.correct = true;
    $scope.correctAnswer = '';

    function shuffle(a) {
      var j;
      var x;
      var i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    }

    function callback(values) {
      shuffle(values);
      $scope.currentPokemon = values[index++];
      pokemon = values;
    }

    function getPokemon(gen) {
      if (gen === 0) {
        Pokemon.query({}, callback);
      } else {
        Pokemon.query({generation: gen}, callback);
      }
    }

    function getNextPokemon(gen) {
      if (index >= pokemon.length) {
        $scope.finished = true;
      } else {
        return pokemon[index++];
      }
    }

    function animateStatus() {
      var status = $('#status');
      status.animate({
        fontSize: '2.5em',
        opacity: '0.5'
      }, 'medium');
      status.animate({
        fontSize: '1.9em',
        opacity: '1'
      }, 'medium');
    }

    function animateStreakDiv() {
      var div = $('#streakTracker');
      div.animate({
        fontSize: '4em',
        opacity: '0.3'
      }, 'medium');
      div.animate({
        fontSize: '3em',
        opacity: '1'
      }, 'medium');
    }

    function resetScore() {
      $scope.streak = 0;
      animateStreakDiv();
    }

    //scope methods
    $scope.validateAnswer = function(giveup) {
      if (!giveup &&
        $scope.currentPokemon.name.toLowerCase() ===
        $scope.inputAnswer.toLowerCase()) {
        $scope.streak++;
        animateStreakDiv();
        animateStatus();
        $scope.currentPokemon = getNextPokemon();
        $scope.inputAnswer = '';
      } else {
        $scope.correctAnswer = $scope.currentPokemon.name;
        $scope.correct = false;
        animateStatus();
        // input.animate({ fontSize: '1.5em', opacity: '0.3' }, 'medium');
        // input.animate({ fontSize: '1em', opacity: '1' }, 'medium');
      }
    };

    $scope.reset = function() {
      $scope.correct = true;
      $scope.inputAnswer = '';
      index = 0;
      shuffle(pokemon);
      resetScore();
      $scope.currentPokemon = getNextPokemon();
    };

    $scope.switchGen = function(i) {
      gen = i;
      pokemon = getPokemon(i);
      $scope.reset();
    };

    $scope.inputEnter = function() {
      if ($scope.correct) {
        $scope.validateAnswer(false);
      } else {
        $scope.reset();
      }
    };

    $scope.selectedButtonClass = function(generation) {
      return generation === gen ? 'btn-primary' : '';
    };

    $scope.getStatus = function() {
      if ($scope.streak > 0 && $scope.correct) {
        return 'Correct!';
      } else if ($scope.correct) {
        return '';
      } else {
        return 'Wrong!';
      }
    };

    $scope.getInputClass = function() {
      return !$scope.correct ? 'input-incorrect' : '';
    };

    $scope.getStatusClass = function() {
      return $scope.correct ? 'status-correct' : 'status-incorrect';
    };

    getPokemon();
  }
]);
