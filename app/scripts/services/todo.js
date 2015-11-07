'use strict';

angular.module('Simpleweek.services')

  .factory('Todo', function ($moment, Restangular, _) {
    var _todosService = Restangular.all('todos');

    return {
      post: _todosService.post,
      get: _todosService.get,

      getForToday: function () {
        return _todosService.getList({'day': 'today'});
      },

      getByDay: function (day) {
        return _todosService.getList({'day': day});
      }
    };
  });
