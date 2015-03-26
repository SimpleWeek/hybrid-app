'use strict';

angular.module('Simpleweek.controllers')

  .controller('AuthController', function ($scope, $stateParams, $ionicLoading, $state, $ionicViewService, AuthService) {

    $scope.user = {};

    $scope.authenticateUser = function () {
      var success = function (response) {
        $ionicLoading.hide();
        $ionicViewService.nextViewOptions({disableBack: true});

        $state.go('app.tasks');
      };

      var error = function(response) {
        $ionicLoading.hide();
        alert('error');
        // TODO add form validation (red errors)
      };

      $ionicLoading.show({template: 'Loading...'});

      // use AuthService to login
      AuthService.login($scope.user).then(success, error);
    }
  });
