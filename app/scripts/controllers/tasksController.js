'use strict';
angular.module('Simpleweek.controllers')

  .controller('TasksController', function ($scope, $http, $moment, $ionicPopup, $ionicLoading, $ionicModal, ENV, AuthService, Todo) {
    $scope.tasks = [];
    $scope.env = ENV;
    $scope.newTask = {};

    $scope.weekDays = Todo.buildWeekDays();

    $scope.$on('$ionicView.beforeEnter', function() {
      if (0 === $scope.tasks.length) {
        Todo.getForToday().then(function (tasks) {
          $scope.tasks = tasks;
        });
      }
      $scope.weekDays = Todo.buildWeekDays();
    });

    $ionicModal.fromTemplateUrl('templates/modal/createTask.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    $scope.update = function (task) {
      task.put();
    };

    $scope.saveFromModal = function(taskForm) {
      // TODO fetch config from server to get timezone, save in localstorage. Use it fot startDate
      if (taskForm.$valid) {
        // create
        $scope.newTask.recurring = 0;
        $scope.newTask.permanent = 0;
        $scope.newTask.position = 10;
        $scope.newTask.startDate = $moment();
        $scope.newTask.description = 'from mobile';

        Todo.post($scope.newTask).then(function(restangularTask) {
          $scope.tasks.push(restangularTask);
        });

        $scope.newTask = {};
        taskForm.$setPristine();

        $scope.modal.hide();
      }
    };

    $scope.create = function() {
      $scope.modal.show();
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
