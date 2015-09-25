'use strict';

angular.module('Simpleweek.services')

  .factory('Timezone', function (Restangular) {
    var timezoneService = Restangular.all('timezones');

    return {
      getList: timezoneService.getList,
    };
  });
