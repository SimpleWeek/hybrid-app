'use strict';
angular.module('Simpleweek.controllers', [])

  .controller('AppController', function($scope, $ionicModal, $timeout, $http, ENV) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {

      var url = 'https://simpleweek.com/oauth/v2/token?client_id=1_3zb3kuyxz06cs848ogosoos4kc40808okso4o4gkgs4s0w4s4o&client_secret=5na7xb8cjc0084w80s4s8gckcs8c4ooc0ks0w0g8okwwkgsk88&grant_type=password&username=' + $scope.loginData.usernameOrEmail + '&password=' + $scope.loginData.password;

      var response = $http.get(url);

      response.success(function (str, data, status) {
        console.log('success', str, data, status);
      });

      response.error(function(error, b, c) {
        console.log('error', error, b, c);
      });

      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    }
  });
