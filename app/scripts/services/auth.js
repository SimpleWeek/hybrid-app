'use strict';

angular.module('Simpleweek.services', [])

  .service('AuthService', function($http, $rootScope, $q) {

      var auth = {
        // the user currently logged in
        currentUser: {},

        init: function () {
          var self = this;

          // setting currentUser
          //self.currentUser = new UserModel(userData);
        },

        isLoggedIn: function () {
          var self = this;

          return false;
        }
      };

      return auth;

    });
