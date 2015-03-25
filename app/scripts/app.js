'use strict';

var db;
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Simpleweek', [
  'ionic',
  'config',
  'Simpleweek.controllers',
  'Simpleweek.services',
  'angular-momentjs',
  'ngStorage',
  'restangular'
])

  .run(function ($ionicPlatform, $ionicPopup, $rootScope, $ionicLoading, $state, AuthService, Restangular, ENV) {
    $ionicPlatform.ready(function () {

      if (window.Connection) {
        if (navigator.connection.type === window.Connection.NONE) {
          $ionicPopup.confirm({
            title: 'Internet Disconnected',
            content: 'The internet is disconnected on your device.'
          })
            .then(function (result) {
              if (!result) {
                ionic.Platform.exitApp();
              }
            });
        }
      }

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      AuthService.init();

      $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !AuthService.isLoggedIn()) {
          // User isn’t authenticated
          $state.transitionTo("app.auth");
          event.preventDefault();
        }
      });

      Restangular.setBaseUrl(ENV.api.endpoint);
      Restangular.setDefaultRequestParams({'access_token': AuthService.currentUser["access_token"]});

      Restangular.setErrorInterceptor(function(resp) {
        console.log('error interceptor - ', resp);
        return false; // stop the promise chain
      });
    });
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController'
      })

      .state('app.start', {
        url: '/start',
        views: {
          'content': {
            templateUrl: 'templates/start.html',
            controller: 'AppController'
          }
        },
        authenticate: false
      })

      .state('app.tasks', {
        url: '/tasks',
        views: {
          'content': {
            templateUrl: 'templates/tasks.html',
            controller: 'TasksController'
          }
        },
        authenticate: true
      })

      .state('app.single_task', {
        url: '/tasks/:taskId',
        views: {
          'content': {
            templateUrl: 'templates/task.html',
            controller: 'TaskController'
          }
        },
        authenticate: true
      })

      // authentication page
      .state('app.auth', {
        url: "/auth",
        views: {
          'content': {
            controller: 'AuthController',
            templateUrl: "templates/auth/signin.html"
          }
        },
        authenticate: false
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/start');
  });

