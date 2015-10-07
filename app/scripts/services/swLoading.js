'use strict';

angular.module('Simpleweek.services')
  .factory('swLoading', function ($ionicLoading) {
    var timeoutId;

    var swLoading = {
      show: function () {
        $ionicLoading.show({
          template: 'Loading...'
        });

        timeoutId = setTimeout(function() {
          $ionicLoading.hide();
        }, 10000);
      },
      hide: function() {
        if (null !== timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }

        $ionicLoading.hide();
      }
    }

    return swLoading
  });
