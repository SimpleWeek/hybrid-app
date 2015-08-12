'use strict';

angular.module('Simpleweek.directives', [])
  .directive('targetBlank', function ($timeout) {
    return {
      compile: function (element) {

        $timeout(function() {
          var elems = (element.prop('tagName') === 'A') ? element : element.find('a');
          elems.attr('onclick', "window.open(this.href, '_system', 'location=yes'); return false;");
        }, 0);

      }
    };
  });
