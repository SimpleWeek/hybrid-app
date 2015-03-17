'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, $ionicPopup, ENV, AuthService) {
    $scope.tasks = [];

    $scope.env = ENV;
    console.log(AuthService.currentUser);

    if (0 === $scope.tasks.length) {
      var url = ENV.api.endpoint + '/todos?access_token=' + AuthService.currentUser["access_token"] + '&day=today';
      var response = $http.get(url);

      response.then(function (data) {
        $scope.tasks = data.data;
      });

      response.error(function (e, a, b, c) {
        console.log('error', e, a, b, c);
      });
    }

    $scope.update = function (task) {
      var response = $http({
        method: 'PUT',
        url: ENV.api.endpoint + '/todos/' + task.id + '.json?access_token=' + AuthService.currentUser["access_token"],
        data: task
      });

      response.then(function (data) {

      });

      response.error(function (e, a, b, c) {
        console.log('error', e, a, b, c);
      });
    };

    $scope.create = function() {
      $ionicPopup.prompt({
        title: 'Enter a new task text',
        inputType: 'text'
      })
      .then(function(result) {
        if(result !== undefined && result.length > 0) {
          // create
          console.log(result);
        } else {
          console.log("Action not completed");
        }
      });
    };

    $scope.remove = function(task) {
      var url = ENV.api.endpoint + '/todos/' + task.id + '.json?access_token=' + AuthService.currentUser["access_token"];
      $http.delete(url).then(function() {
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      });
    };
  });
