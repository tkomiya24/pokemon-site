 
var pokeApp = angular.module('pokeApp', ['ngRoute', 'ngAnimate']);


pokeApp.config(function ($routeProvider) {

    $routeProvider.
        when('/test', {
            templateUrl: 'views/partials/test.html',
        }).
        when('/learn', {
            templateUrl: 'views/partials/learn.html',
        }).
        otherwise({
            redirectTo:'/learn'
        });

});