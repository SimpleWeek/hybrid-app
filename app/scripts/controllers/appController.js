'use strict';

angular.module('Simpleweek.controllers', [])

  .controller('AppController', function($scope, $state, $ionicHistory, $ionicSideMenuDelegate, $localStorage, AuthService) {

    $scope.currentUser = $localStorage.appUser || AuthService.currentUser;

    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.currentUser = $localStorage.appUser || AuthService.currentUser;
    });

    if (AuthService.isLoggedIn()) {
      $ionicHistory.nextViewOptions({disableBack: true});
      $state.go('app.tasks');
    }

    $scope.logout = function() {
      AuthService.updateUser(null, {set: true, remove: true});
      $ionicHistory.nextViewOptions({disableBack: true});

      if ($ionicSideMenuDelegate.isOpenLeft()) {
        $ionicSideMenuDelegate.toggleLeft();
      }

      $state.go('app.start')
    };

    $scope.isLoggedIn = function() {
      return AuthService.isLoggedIn();
    };

    $scope.navigateTo = function(state) {
      return $state.go(state);
    }
  });
