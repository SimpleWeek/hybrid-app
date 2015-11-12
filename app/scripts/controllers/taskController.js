'use strict';
angular.module('Simpleweek.controllers')

  .controller('TaskController', function ($scope, $stateParams, $ionicModal, $moment, DatePicker, Restangular, TaskListState) {
    var vm = this;

    vm.task = $stateParams.taskObject;
    vm.edit = edit;
    vm.saveFromModal = saveFromModal;
    vm.datepickerObject = DatePicker.getConfig();
    vm.datepickerObject.callback = function (val) {
      if (typeof(val) !== 'undefined') {
        vm.task.startDate = $moment(val);
        // it is needed because of strange bug in DatePicker when model is not updated
        vm.taskForm.$setDirty();
      }
    };

    activate();

    return vm;

    function activate() {
      $ionicModal.fromTemplateUrl('templates/modal/editTask.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modal = modal;
      });
    }

    function edit() {
      vm.modal.show();
      vm.task.startDate = $moment(vm.task.startDate);
    }

    function saveFromModal() {
      vm.taskForm.$setSubmitted();

      if (vm.taskForm.$valid) {
        // workaround for Restangular (known bug)
        var taskCopy = Restangular.copy(vm.task);
        taskCopy.put().then(function() {
          vm.task = taskCopy;
          var index = _.findIndex(TaskListState.tasks, {'id': vm.task.id});
          if (TaskListState.currentDate.format('YYYY-MM-DD') !== vm.task.startDate.format('YYYY-MM-DD')) {
            if (index > -1) {
              TaskListState.tasks.splice(index, 1);
            }
          } else {
            TaskListState.tasks.splice(index, 1, vm.task);
          }
        });

        vm.taskForm.$setPristine();
        vm.modal.hide();
      }
    }
  });
