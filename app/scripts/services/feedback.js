'use strict';

angular.module('Simpleweek.services')

  .factory('Feedback', function ($moment, Restangular) {
    var _feedbackService = Restangular.all('feedbacks');

    return {
      post: _feedbackService.post,
    };
  });
