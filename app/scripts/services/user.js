'use strict';

angular.module('Simpleweek.services')

  .factory('User', function ($moment, Restangular) {
    var userService = Restangular.all('users/me');

    return {
      post: userService.post,
      get: userService.get
    };
  });
