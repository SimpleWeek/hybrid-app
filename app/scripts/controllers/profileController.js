'use strict';
angular.module('Simpleweek.controllers')

  .controller('ProfileController', function ($scope, $stateParams, $moment, $ionicContentBanner, $timeout, AuthService, ServerValidator, User, Timezone, swLoading) {
    $scope.errorMessages = {};
    $scope.timezones = [];
    $scope.profile = {};
    var contentBannerCloseCallback;

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
          swLoading.hide();
          setServerValidityAndPristine();

          AuthService.currentUser.config = response.plain();
          AuthService.updateUser(AuthService.currentUser, {set: true});
          $moment.tz(AuthService.currentUser.config.timezone.timezone_sysname);
        };

        var error = function(response) {
          var errorResponse = response.data;
          swLoading.hide();

          if (response.status && 400 === response.status) {
            var errors = [
              ServerValidator.validateField('username', $scope, profileForm, errorResponse, errors),
              ServerValidator.validateField('email', $scope, profileForm, errorResponse, errors)
            ];

            var isError = function (value) {
              return !!value;
            }

            contentBannerCloseCallback = $ionicContentBanner.show({
              type: 'error',
              text: errors.filter(isError)
            });
          }
        };

        swLoading.show();

        contentBannerCloseCallback && contentBannerCloseCallback();
        User.post({profile: $scope.profile}).then(success, error);
      }
    };

    function setServerValidityAndPristine() {
      $scope.profileForm.username.$setValidity('server', true);
      $scope.profileForm.email.$setValidity('server', true);
      $scope.profileForm.$setPristine();
    }
  });
