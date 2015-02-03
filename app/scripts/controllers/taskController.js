'use strict';
angular.module('Simpleweek.controllers')

.controller('TaskController', function($scope, $stateParams) {
  $scope.task = $stateParams["taskId"];
});
