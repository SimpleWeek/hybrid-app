'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, ENV) {
    $scope.tasks = [];

    $scope.env = ENV;

    if (0 === $scope.tasks.length) {
      var url = ENV.api.endpoint + '/todos?access_token=ZTg2ZjhmZjdmZWI3MGJiODY2MGNmYWY0NTFmZGZkOGZjYjA1NDg2NTliZmJmYmQ2MGQ4ZmFkMDkwZjE0NGNkMQ&day=' + $moment().format('YYYY-MM-DD');
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
        url: ENV.api.endpoint + '/todos/' + task.id + '.json?access_token=ZTg2ZjhmZjdmZWI3MGJiODY2MGNmYWY0NTFmZGZkOGZjYjA1NDg2NTliZmJmYmQ2MGQ4ZmFkMDkwZjE0NGNkMQ',
        data: task
      });

      response.then(function (data) {

      });

      response.error(function (e, a, b, c) {
        console.log('error', e, a, b, c);
      });
    };
  });
