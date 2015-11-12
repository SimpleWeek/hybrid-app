'use strict';
angular.module('Simpleweek.controllers')
  .controller('TasksController', function ($scope, $http, $moment, $ionicPopup, $ionicModal, swLoading, ENV, AuthService, Todo, DatePicker, TaskListState, _) {
    $scope.taskListState = TaskListState;
    $scope.env = ENV;
    $scope.newTask = {};
    TaskListState.currentDate = $moment();

    $scope.datepickerObject = DatePicker.getConfig();
    $scope.datepickerObject.callback = function (val) {
      if (typeof(val) !== 'undefined') {
        $scope.newTask.startDate = $moment(val);
      }
    };

    $scope.$on('$ionicView.beforeEnter', function() {
      if (0 === TaskListState.tasks.length) {
        Todo.getForToday().then(function (tasks) {
          TaskListState.tasks = tasks;
        });
      }
      TaskListState.buildWeekDays();
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
      taskForm.$setSubmitted();
      if (taskForm.$valid) {
        // create
        $scope.newTask.recurring = $scope.newTask.frequency > 0 ? 1 : 0;
        $scope.newTask.permanent = 0;
        $scope.newTask.position = 10;

        var newTask = $scope.newTask;

        Todo.post($scope.newTask).then(function(restangularTask) {
          // push to today's tasks array only if task created for today
          if (TaskListState.currentDate.format('YYYY-MM-DD') === newTask.startDate.format('YYYY-MM-DD')) {
            TaskListState.tasks.push(restangularTask);
          }
        });

        $scope.newTask = {};
        taskForm.$setPristine();

        $scope.modal.hide();
      }
    };

    $scope.onSwipeContentRight = function (event) {
      modifyCurrentDate(event, 'subtract', 1);
    };

    $scope.onSwipeContentLeft = function (event) {
      modifyCurrentDate(event, 'add', 1);
    };

    $scope.create = function() {
      $scope.modal.show();
      $scope.newTask.startDate = TaskListState.currentDate;
    };

    $scope.remove = function(task) {
      swLoading.show();

      task.remove().then(function() {
        swLoading.hide();
        TaskListState.tasks.splice(TaskListState.tasks.indexOf(task), 1);
      });
    };

    $scope.refresh = function() {
      Todo.getForToday().then(function (tasks) {
        TaskListState.tasks = tasks;
        TaskListState.buildWeekDays();
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
      swLoading.show();
      _.each(TaskListState.weekDays, function (day) {
        day.active = false;
      });

      var currentWeekDay = _.find(TaskListState.weekDays, {date: weekDay.date});
      currentWeekDay.active = true;
      TaskListState.currentDate = currentWeekDay.dateMoment;

      Todo.getByDay(weekDay.date).then(function (tasks) {
        swLoading.hide();
        TaskListState.tasks = tasks;
      });
    };

    function modifyCurrentDate(event, method, dayCount) {
      if ('ION-CONTENT' === event.target.tagName) { // to not conflict with list item gestures
        var nextDay = TaskListState.currentDate[method](dayCount, 'day').format('YYYY-MM-DD');
        swLoading.show();

        var isPastDate = 'subtract' == method;
        TaskListState.setWeekDay(nextDay, isPastDate);

        Todo.getByDay(nextDay).then(function (tasks) {
          swLoading.hide();
          TaskListState.tasks = tasks;
        });
      }
    }
  });
