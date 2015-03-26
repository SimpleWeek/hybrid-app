'use strict';

angular.module('Simpleweek.controllers', [])

  .controller('AppController', function($scope, $state, $ionicViewService, AuthService) {

    if (AuthService.isLoggedIn()) {
      $ionicViewService.nextViewOptions({disableBack: true});
      $state.go('app.tasks');
    }

    $scope.navigateTo = function(state) {
      return $state.go(state);
    }
  });
