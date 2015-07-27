'use strict';

angular.module('Simpleweek.filters', [])
  .filter('markdown', function(Micromarkdown) {
    return function(input) {
      return Micromarkdown.parse(input);
    };
  });
