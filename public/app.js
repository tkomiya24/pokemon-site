var pokeApp = angular.module('pokeApp', ['ngRoute', 'ngAnimate']);

pokeApp.config(function($routeProvider) {
  'use strict';
  $routeProvider.
    when('/test', {
      templateUrl: 'views/partials/test.html',
    }).
    otherwise({
      redirectTo: '/test'
    });
});
