'use strict';

angular.module('Simpleweek.services')

  .factory('TaskListState', function ($moment, _) {
    var taskListState = {
      currentDate: $moment(),
      tasks: [],
      weekDays: [],

      buildWeekDays: function (startDate, activeDateString) {
        this.weekDays = [];
        var day;
        var momentObj;
        var dateString;

        for (var i = 0; i < 5; i++) {
          momentObj = $moment(startDate).add(i, 'day');
          dateString = momentObj.format('YYYY-MM-DD');

          day = {
            title: momentObj.format('ddd').toUpperCase(),
            number: momentObj.format('DD'),
            date: dateString,
            dateMoment: momentObj,
            active: activeDateString ? (activeDateString === dateString) : (0 === i)
          };

          this.weekDays.push(day);
        }
      },

      setWeekDay: function(dateString, isPastDate) {
        var startDateString = dateString;
        var activeDateString = dateString;
        _.forEach(this.weekDays, function(weekDay) {
          weekDay.active = false;
        });

        var weekDay = _.find(this.weekDays, {date: dateString});

        if (weekDay) {
          weekDay.active = true;
        } else {
          // create new set of days
          if (isPastDate) {
            activeDateString = startDateString;
            startDateString = moment(startDateString).subtract(4, 'day').format('YYYY-MM-DD');

          }
          taskListState.buildWeekDays(startDateString, activeDateString);
        }
      }
    };

    taskListState.buildWeekDays();

    return taskListState;
  });
