'use strict';

describe('Controller: TasksController', function () {

  var should = chai.should();
  var expect = chai.expect;

  // load the controller's module
  beforeEach(module('Simpleweek'));

  var TaskController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskController = $controller('TasksController', {
      $scope: scope
    });
  }));

  it('should have initialized empty tasks property', function() {
    assert.lengthOf(scope.tasks, 0);
  });
});
