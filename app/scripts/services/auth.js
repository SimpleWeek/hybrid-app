'use strict';

angular.module('Simpleweek.services', [])

  .service('AuthService', function($http, $rootScope, $q, ENV) {

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

          return this.currentUser['access_token'] ? this.currentUser['access_token'].length > 0 : false ;
        },

        login: function (userData) {
          var self = this;
          var deferred = $q.defer();

          var success = function (response) {
            console.log('success', response);
            userData['access_token'] = response['access_token'];
            self.updateUser(userData, {set: true});

            //set token on success
            //$cordovaLocalStorage.setItem('sessionToken',token);

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

        updateUser: function (user, options) {
          var self = this;
          var opts = {remove:false, set:false};

          angular.extend(opts,options);
          angular.extend(self.currentUser, user);

          if (opts.remove === true) {
            //$cordovaLocalStorage.removeItem('app_user');
          }

          if (opts.set === true) {
            //$cordovaLocalStorage.setItem('app_user',JSON.stringify(self.currentUser.info));
          }
        }
      };

      return auth;

    });
