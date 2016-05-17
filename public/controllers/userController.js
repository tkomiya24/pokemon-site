'use strict';

angular.module('pokeApp').controller('UserController',
  ['$scope', '$location', 'User', function($scope, $location, User) {
  $scope.test = 'Test!';
  $scope.user = {};
  $scope.create = function() {
    var user = new User($scope.user);
    user.$create(
      function() {
        $location.path('/test');
      },
      function(httpResponse) {
        $scope.error = httpResponse;
      }
    );
  };
}]);
