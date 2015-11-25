'use strict';

// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Simpleweek', [
  'ionic',
  'ngMaterial',
  'ionic-datepicker',
  'ngCordova',
  'config',
  'Simpleweek.controllers',
  'Simpleweek.services',
  'Simpleweek.filters',
  'Simpleweek.directives',
  'Simpleweek.validators',
  'angular-momentjs',
  'ngStorage',
  'restangular',
  'monospaced.elastic'
])

  .run(function ($ionicPlatform, $ionicPopup, $rootScope, $state, $ionicHistory, $http, AuthService, Restangular, ENV, _) {
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

      if (window.screen && window.screen.lockOrientation) {
        window.screen.lockOrientation('portrait');
      }

      $http.defaults.headers.common['X-SW-MOBILE'] = '1';

      AuthService.init();

      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate && !AuthService.isLoggedIn()) {
          // User isn’t authenticated
          $state.transitionTo('public.start');
          event.preventDefault();
        }
      });

      if (AuthService.isLoggedIn()) {
        $ionicHistory.nextViewOptions({disableBack: true});
        $state.go('app.tasks');
      }

      Restangular.setBaseUrl(ENV.api.endpoint);
      Restangular.setDefaultRequestParams({'access_token': AuthService.currentUser['access_token']});

      Restangular.setErrorInterceptor(function(resp) {
        console.log('error interceptor - ', resp);

        if (401 === resp.status) {
          AuthService.currentUser['access_token'] = null;
          $ionicHistory.nextViewOptions({disableBack: true});
          $state.transitionTo('public.signin');
        } else if (400 === resp.status) {
          return true;
        }

        return false; // stop the promise chain
      });

      var goToTasksFromStartView = function($state, $ionicHistory) {
        if ($state.current.name === 'public.start') {
          $ionicHistory.nextViewOptions({disableBack: true});
          $state.go('app.tasks');
        }
      };

      goToTasksFromStartView($state, $ionicHistory);

      $ionicPlatform.on('resume', function(event) {
        goToTasksFromStartView($state, $ionicHistory);
      });
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {

    // DELETE request by default is sent with text/plain, so explicitly set to json
    RestangularProvider.setDefaultHeaders({
      'Content-Type': 'application/json',
      'X-SW-MOBILE': '1'
    });

    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppController'
      })
      .state('public', {
        url: '/public',
        abstract: true,
        views: {
          '@': {
            templateUrl: 'templates/public.html',
            controller: 'AppController'
          }
        }
      })

      .state('public.start', {
        url: '/start',
        cache: false,
        views: {
          'content': {
            templateUrl: 'templates/start.html',
            controller: 'AppController'
          }
        },
        authenticate: false
      })

      .state('app.profile', {
        cache: true,
        url: '/profile',
        views: {
          'content': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController'
          }
        },
        authenticate: true
      })

      .state('app.feedback', {
        cache: true,
        url: '/feedback',
        views: {
          'content': {
            templateUrl: 'templates/feedback.html',
            controller: 'FeedbackController as feedback',
          }
        },
        authenticate: true
      })

      .state('app.tasks', {
        cache: true,
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
        params: {
          taskObject: null
        },
        views: {
          'content': {
            templateUrl: 'templates/task.html',
            controller: 'TaskController as task'
          }
        },
        authenticate: true
      })

      // authentication page
      .state('public.signin', {
        url: '/signin',
        cache: false,
        views: {
          'content': {
            controller: 'AuthController',
            templateUrl: 'templates/auth/signin.html'
          }
        },
        authenticate: false
      })
      .state('public.signup', {
        url: '/signup',
        cache: false,
        views: {
          'content': {
            controller: 'AuthController',
            templateUrl: 'templates/auth/signup.html'
          }
        },
        authenticate: false
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/public/start');
  });
