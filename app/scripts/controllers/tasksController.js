'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, ENV, AuthService) {
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

    $scope.updateTask = function (task) {

      task.text += '!';

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
  });
