'use strict';
angular.module('Simpleweek.controllers')

  .controller('ProfileController', function ($scope, $stateParams, $ionicLoading, $moment, AuthService, ServerValidator, User, Timezone) {
    $scope.errorMessages = {};
    $scope.timezones = [];
    $scope.profile = {};

    $scope.$on('$ionicView.beforeEnter', function() {
      if (0 === $scope.timezones.length) {
        Timezone.getList().then(function(timezones) {
          $scope.timezones = timezones.plain();
        });
      }

      $scope.profile = {
        email: AuthService.currentUser.config.email,
        username: AuthService.currentUser.config.username,
        timezoneId: AuthService.currentUser.config.timezone.id
      };
      setServerValidityAndPristine();
    });

    $scope.save = function(profileForm) {
      profileForm.$setSubmitted();

      if (profileForm.$dirty || profileForm.$valid) {
        var success = function(response) {
          $ionicLoading.hide();
          $scope.errorMessages = {};
          setServerValidityAndPristine();

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

    function setServerValidityAndPristine() {
      $scope.profileForm.username.$setValidity('server', true);
      $scope.profileForm.email.$setValidity('server', true);
      $scope.profileForm.$setPristine();
    }
  });
