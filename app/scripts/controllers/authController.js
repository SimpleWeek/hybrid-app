'use strict';

angular.module('Simpleweek.controllers')

  .controller('AuthController', function ($scope, $stateParams, $ionicLoading, $state, AuthService) {

    $scope.user = {};

    $scope.authenticateUser = function () {

      var success = function (response) {
        $ionicLoading.hide();
        $state.go('app.tasks');
      };

      $ionicLoading.show({
        template: 'Loading...'
      });

      // use AuthService to login
      AuthService.login($scope.user).then(success);
    }
  });
