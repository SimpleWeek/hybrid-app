'use strict';

angular.module('Simpleweek.services', [])

  .service('AuthService', function($http, $rootScope, $q, $localStorage, ENV) {

      var auth = {
        // the user currently logged in
        currentUser: {},

        /**
         * Initialize current user information from local storage
         */
        init: function () {
          var self = this;

          // setting currentUser
          self.currentUser = $localStorage.appUser || {};
        },

        /**
         * Whether or not current user is logged in
         *
         * @returns {boolean}
         */
        isLoggedIn: function () {
          var self = this;

          return this.currentUser['access_token'] ? this.currentUser['access_token'].length > 0 : false ;
        },

        /**
         * Login user
         *
         * @param userData
         * @returns promise
         */
        login: function (userData) {
          var self = this;
          var deferred = $q.defer();

          var success = function (response) {
            console.log('success', response);
            userData['access_token'] = response['access_token'];
            self.updateUser(userData, {set: true});

            deferred.resolve(self.currentUser);
          };

          var error = function (error, status) {
            console.log('error');
            deferred.reject(error);
          };

          var url = ENV.api["baseUrl"] + '/oauth/v2/token?client_id=' + ENV.api["client.id"] + '&client_secret=' + ENV.api["client.secret"] + '&grant_type=password&username=' + userData.username + '&password=' + userData.password;
          $http.get(url, {user: userData}).success(success).error(error);

          return deferred.promise;
        },

        /**
         * Update information of current user
         *
         * @param user
         * @param options
         */
        updateUser: function (user, options) {
          var self = this;
          var opts = {remove:false, set:false};

          angular.extend(opts,options);
          angular.extend(self.currentUser, user);

          if (opts.remove === true) {
            delete $localStorage.appUser;
          }

          if (opts.set === true) {
            $localStorage.appUser = self.currentUser;
          }
        }
      };

      return auth;

    });
