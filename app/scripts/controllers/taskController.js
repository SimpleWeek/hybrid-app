'use strict';
angular.module('Simpleweek.controllers')

  .controller('TaskController', function ($scope, $stateParams, Todo) {
    $scope.task = $stateParams.taskObject;
  });
