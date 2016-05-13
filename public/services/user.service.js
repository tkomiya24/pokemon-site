'use strict';
angular.module('pokeApp').factory('User', ['$resource', function($resource) {
  return $resource('/user/:id', null, {
    create: {
      method: 'post',
      url: '/users'
    }
  });
}]);
