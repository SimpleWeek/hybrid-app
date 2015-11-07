'use strict'

angular.module('Simpleweek.directives')
  .directive('swDetectGestures', function($ionicGesture) {
    return {
      restrict :  'A',
      link : function(scope, elem, attrs) {
        if (attrs.swOnSwipeLeft) {
          $ionicGesture.on('swipeleft', scope[attrs.swOnSwipeLeft], elem);
        }

        if (attrs.swOnSwipeRight) {
          $ionicGesture.on('swiperight', scope[attrs.swOnSwipeRight], elem);
        }
      }
    }
  });
