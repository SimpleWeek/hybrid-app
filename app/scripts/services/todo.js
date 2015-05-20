'use strict';

angular.module('Simpleweek.services')

  .factory('Todo', function (Restangular) {
    var _todosService = Restangular.all('todos');

    return {
      post: _todosService.post,
      get: _todosService.get,
      getForToday: function () {
        return _todosService.getList({'day': 'today'});
      }
    }
  });
