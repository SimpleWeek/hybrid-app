'use strict';

angular.module('Simpleweek.controllers')

  .controller('AuthController', function ($scope, $stateParams, $ionicLoading, $state, $ionicHistory, $ionicPopup, $timeout, AuthService, ServerValidator) {
    $scope.BAD_REQUEST = 400;
    $scope.user = {};
    $scope.errorMessages = {};
    $scope.loginError = 'Username or password is incorrect';

    /**
     * Log in user
     * @param loginForm
     */
    $scope.authenticateUser = function (loginForm) {
      var success = function () {
        $ionicLoading.hide();
        $ionicHistory.nextViewOptions({disableBack: true});

        $state.go('app.tasks');
      };

      var error = function(errorResponse) {
        $ionicLoading.hide();
        if (errorResponse.code && $scope.BAD_REQUEST === errorResponse.code && 'invalid_grant' === errorResponse.error.error) {
          loginForm.password.$setValidity('server', false);
        }
      };

      $ionicLoading.show({template: 'Loading...'});

      AuthService.login($scope.user).then(success, error);
    };

    /**
     * Register a new user
     * @param registrationForm
     */
    $scope.registerUser = function (registrationForm) {
      if (registrationForm.$dirty || registrationForm.$valid) {
        var success = function() {
          $ionicLoading.hide();
          $scope.authenticateUser();
        };

        var error = function(errorResponse) {
          $ionicLoading.hide();

          if (errorResponse.code && $scope.BAD_REQUEST === errorResponse.code) {
            ServerValidator.validateField('username', $scope, registrationForm, errorResponse);
            ServerValidator.validateField('email', $scope, registrationForm, errorResponse);
            ServerValidator.validateField('plainPassword', $scope, registrationForm, errorResponse, 'password');
          }
        };

        $ionicLoading.show({
          template: 'Loading...'
        });

        AuthService.register($scope.user).then(success, error);
      } else {
        // form is invalid
      }
    };
  });
