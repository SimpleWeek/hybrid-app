'use strict';
angular.module('Simpleweek.controllers')

  .controller('FeedbackController', function ($scope, $stateParams, $ionicContentBanner, Feedback, swLoading, ServerValidator) {
    var vm = this,
        contentBannerCloseCallback;

    $scope.$on('$ionicView.beforeEnter', function() {
      vm.userFeedback = {text: ''};
      setServerValidityAndPristine();
    });

    vm.send = send;
    vm.userFeedback = {};
    vm.errorMessages = {};

    return vm;

    function send() {
      vm.feedbackForm.$setSubmitted();

      if (vm.feedbackForm.$dirty || vm.feedbackForm.$valid) {
        swLoading.show();

        contentBannerCloseCallback && contentBannerCloseCallback();
        Feedback.post({feedback: vm.userFeedback}).then(success, error);
      }
    }

    function success(response) {
      swLoading.hide();
      setServerValidityAndPristine();

      $ionicContentBanner.show({type: 'success', text: ['Successfully sent']});
    };

    function error(response) {
      var errorResponse = response.data;
      swLoading.hide();

      if (response.status && 400 === response.status) {
        var errors = [
          ServerValidator.validateField('text', vm, vm.feedbackForm, errorResponse, errors),
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

    function setServerValidityAndPristine() {
      vm.feedbackForm.text.$setValidity('server', true);
      vm.feedbackForm.$setPristine();
    }
  });
