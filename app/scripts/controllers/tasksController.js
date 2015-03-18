'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, $ionicPopup, $ionicLoading, ENV, AuthService) {
    $scope.tasks = [];

    $scope.env = ENV;
    console.log(AuthService.currentUser);

    $scope.fetchTodos = function () {
      var url = ENV.api.endpoint + '/todos?access_token=' + AuthService.currentUser["access_token"] + '&day=today';
      return $http.get(url);
    };

    if (0 === $scope.tasks.length) {
      var response = $scope.fetchTodos();
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
      // TODO fetch config from server to get timezone, save in localstorage. Use it fot startDate
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

      $ionicLoading.show({template: 'Loading...'});

      $http.delete(url).then(function() {
        $ionicLoading.hide();
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      });
    };

    $scope.refresh = function() {
      var response = $scope.fetchTodos();
      response.then(function (data) {
        $scope.tasks = data.data;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.changeCompleted = function(task) {
      // todo move to Task resource constant

      if (1 == task.status) {
        task.status = 2;
      } else {
        task.status = 1;
      }

      var response = $http({
        method: 'PUT',
        url: ENV.api.endpoint + '/todos/' + task.id + '.json?access_token=' + AuthService.currentUser["access_token"],
        data: task
      });
    };
  });
