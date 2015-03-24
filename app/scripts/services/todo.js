'use strict';

angular.module('Simpleweek.services')

  .factory('Todo', function (Restangular, AuthService, ENV) {

    var url = ENV.api.endpoint + '/todos?access_token=' + AuthService.currentUser["access_token"] + '&day=today';

    var _todosService = Restangular.all('todos');

    return {
      getForToday: function () {
        return _todosService.getList({'day': 'today'});
      }
    }
  });
