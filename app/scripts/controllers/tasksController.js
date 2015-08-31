'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, $ionicPopup, $ionicLoading, ENV, AuthService, Todo) {
    $scope.tasks = [];
    $scope.env = ENV;

    $scope.weekDays = Todo.buildWeekDays();

    $scope.$on('$ionicView.beforeEnter', function() {
      if (0 === $scope.tasks.length) {
        Todo.getForToday().then(function (tasks) {
          $scope.tasks = tasks;
        });
      }
      $scope.weekDays = Todo.buildWeekDays();
    });

    $scope.update = function (task) {
      task.put();
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
          var newTask = {
            text: result,
            recurring: 0,
            description: 'from mobile',
            permanent: 0,
            position: 10,
            startDate: $moment()
          };

          Todo.post(newTask).then(function(restangularTask) {
            $scope.tasks.push(restangularTask);
          });
        }
      });
    };

    $scope.remove = function(task) {
      $ionicLoading.show({template: 'Loading...'});

      task.remove().then(function() {
        $ionicLoading.hide();
        $scope.tasks.splice($scope.tasks.indexOf(task), 1);
      });
    };

    $scope.refresh = function() {
      Todo.getForToday().then(function (tasks) {
        $scope.tasks = tasks;
        $scope.weekDays = Todo.buildWeekDays();
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    $scope.changeCompleted = function(task) {
      // todo move to Task resource constant
      if (1 === task.status) {
        task.status = 2;
      } else {
        task.status = 1;
      }

      task.put();
    };

    $scope.chooseWeekDay = function(weekDay) {
      $ionicLoading.show({template: 'Loading...'});
      _.each($scope.weekDays, function (day) {
        day.active = false;
      });
      $scope.weekDays[$scope.weekDays.indexOf(weekDay)].active = true;

      Todo.getByDay(weekDay.date).then(function (tasks) {
        $ionicLoading.hide();
        $scope.tasks = tasks;
      });
    };
  });
