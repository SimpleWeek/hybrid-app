'use strict';

angular.module('Simpleweek.controllers')

  .controller('AuthController', function ($scope, $stateParams, $ionicLoading, $state, $ionicHistory, $ionicPopup, $timeout, AuthService) {

    $scope.BAD_REQUEST = 400;
    $scope.user = {};
    $scope.errorMessages = {};
    $scope.loginError = 'Username or password is incorrect';

    /**
     * Log in user
     * @param loginForm
     */
    $scope.authenticateUser = function (loginForm) {
      var success = function (response) {
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
        var success = function(response) {
          $ionicLoading.hide();
          $scope.authenticateUser();
        };

        var error = function(errorResponse) {
          $ionicLoading.hide();

          if (errorResponse.code && $scope.BAD_REQUEST === errorResponse.code) {
            var validateField = function(apiFieldName, $scope, errorResponse, formField) {
              formField = formField || apiFieldName;
              var errors = errorResponse.errors.children[apiFieldName].errors;
              var isValidField = ! (errors && errors.length > 0);
              registrationForm[formField].$setValidity('server', isValidField);

              if (! isValidField) {
                $scope.errorMessages[formField] = errors.join(' ');
              }
            };

            validateField('username', $scope, errorResponse);
            validateField('email', $scope, errorResponse);
            validateField('plainPassword', $scope, errorResponse, 'password');

          } else {
            var errorPopup = $ionicPopup.show({
              templateUrl: 'templates/modal/error.html',
              title: 'Error',
              scope: $scope,
              buttons: [
                { text: 'Ok' }
              ]
            });
          }
        };

        $ionicLoading.show({
          template: 'Loading...'
        });

        AuthService.register($scope.user).then(success, error);
      } else {
        // form is invalid
      }
    }
  });
