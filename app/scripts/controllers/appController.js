'use strict';
angular.module('Simpleweek.controllers', [])

  .controller('AppController', function($scope, $state) {
    $scope.navigateTo = function(state){
      return $state.go(state);
    }
  });
