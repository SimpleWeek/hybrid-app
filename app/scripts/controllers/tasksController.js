'use strict';
angular.module('Simpleweek.controllers')

.controller('TasksController', function($scope, $http, $moment, ENV) {
  $scope.tasks = [];

  if (0 === $scope.tasks.length) {
    var response = $http.get(ENV['api.endpoint'] + '/todos?access_token=ZjQ3Nzk1ZDIxNTA1MWRhZWRmNjU0OTNlNjhkOWFmNGE2YTU2ZjhiMGE0MjVmZjE5ZGU1N2Y1Y2E3MTE0ZTJiMQ&day=' + $moment().format('YYYY-MM-DD'));

    response.then(function(data) {
      $scope.tasks = data.data;
    });
  }

  $scope.updateTask = function(task) {

    task.text += '!';

    var response = $http({
      method: 'PUT',
      url: ENV['api.endpoint'] + '/todos/' + task.id + '.json?access_token=ZjQ3Nzk1ZDIxNTA1MWRhZWRmNjU0OTNlNjhkOWFmNGE2YTU2ZjhiMGE0MjVmZjE5ZGU1N2Y1Y2E3MTE0ZTJiMQ',
      data: task
    });

    console.log(response);
    response.then(function(data) {

    });

    response.error(function(e, a, b, c) {
      console.log('error', e, a ,b ,c);
    })
  };
});
