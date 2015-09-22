'use strict';
angular.module('Simpleweek.controllers')

  .controller('ProfileController', function ($scope, $stateParams, $ionicLoading, $moment, AuthService, ServerValidator, User) {
    $scope.profile = {};
    $scope.errorMessages = {};

    $scope.$on('$ionicView.beforeEnter', function() {
      $scope.profile = {
        email: AuthService.currentUser.config.email,
        username: AuthService.currentUser.config.username
      };
    });

    $scope.save = function(profileForm) {
      profileForm.$setSubmitted();

      if (profileForm.$dirty || profileForm.$valid) {
        var success = function(response) {
          $ionicLoading.hide();
          $scope.errorMessages = {};
          profileForm.username.$setValidity('server', true);
          profileForm.email.$setValidity('server', true);
          profileForm.$setPristine();

          AuthService.currentUser.config = response.plain();
          AuthService.updateUser(AuthService.currentUser, {set: true});
          $moment.tz(AuthService.currentUser.config.timezone.timezone_sysname);
        };

        var error = function(response) {
          var errorResponse = response.data;
          $ionicLoading.hide();

          if (response.status && 400 === response.status) {
            ServerValidator.validateField('username', $scope, profileForm, errorResponse);
            ServerValidator.validateField('email', $scope, profileForm, errorResponse);
          }
        };

        $ionicLoading.show({
          template: 'Loading...'
        });

        User.post({profile: $scope.profile}).then(success, error);
      }
    };
  });
