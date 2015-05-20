'use strict';
angular.module('Simpleweek.controllers')

  .controller('TaskController', function ($scope, $stateParams, Todo) {
    $scope.test = 'test';

    Todo.get($stateParams.taskId).then(function(todoRecord) {
      $scope.task = todoRecord;
    });
  });
