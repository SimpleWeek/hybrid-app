'use strict'

angular.module('Simpleweek.directives'/*, ['ngSanitize']*/)
  .filter('nl2br', ['$sanitize', function($sanitize) {
    var tag = (/xhtml/i).test(document.doctype) ? '<br />' : '<br>';
    return function(msg) {
      msg = (msg + '').replace(/(\r\n|\n\r|\r|\n|&#10;&#13;|&#13;&#10;|&#10;|&#13;)/g, tag + '$1');
      return $sanitize(msg);
    };
  }]);
