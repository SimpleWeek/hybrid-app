'use strict';

angular.module('Simpleweek.services')

  .factory('Todo', function (Restangular) {
    var _todosService = Restangular.all('todos');

    return {
      getForToday: function () {
        return _todosService.getList({'day': 'today'});
      }
    }
  });
