'use strict';
angular.module('Simpleweek.controllers')

  .controller('TaskController', function ($scope, $stateParams) {
    $scope.test = 'test';
    $scope.task = $stateParams.taskId;
  });
