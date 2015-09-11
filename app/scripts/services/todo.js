'use strict';

angular.module('Simpleweek.services')

  .factory('Todo', function ($moment, Restangular) {
    var _todosService = Restangular.all('todos');

    return {
      post: _todosService.post,
      get: _todosService.get,

      getForToday: function () {
        return _todosService.getList({'day': 'today'});
      },

      getByDay: function (day) {
        return _todosService.getList({'day': day});
      },

      buildWeekDays: function () {
        var weekDays = [];
        var day;
        var momentObj;

        for (var i = 0; i < 5; i++) {
          momentObj = $moment().add(i, 'day');

          day = {
            title: momentObj.format('ddd').toUpperCase(),
            number: momentObj.format('DD'),
            date: momentObj.format('YYYY-MM-DD'),
            dateMoment: momentObj,
            active: 0 === i
          };

          weekDays.push(day);
        }

        return weekDays;
      }
    };
  });
