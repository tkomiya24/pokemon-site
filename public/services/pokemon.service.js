'use strict';
angular.module('pokeApp').factory('Pokemon', ['$resource', function($resource) {
  return $resource('/pokemon/:id');
}]);
