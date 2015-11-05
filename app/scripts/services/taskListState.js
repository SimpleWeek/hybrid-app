'use strict';

angular.module('Simpleweek.services')

  .factory('TaskListState', function ($moment) {
    return {
      currentDate: $moment(),
      tasks: []
    };
  });
