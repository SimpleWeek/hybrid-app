'use strict';
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
  'angular-momentjs'
])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {

    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: "Internet Disconnected",
          content: "The internet is disconnected on your device."
        })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
      }
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent' :{
          templateUrl: 'templates/search.html'
        }
      }
    })

    .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent' :{
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.tasks', {
      url: '/tasks',
      views: {
        'menuContent' :{
          templateUrl: 'templates/tasks.html',
          controller: 'TasksController'
        }
      }
    })

    .state('app.single_task', {
      url: '/tasks/:taskId',
      views: {
        'menuContent' :{
          'templateUrl': 'templates/task.html',
          controller: 'TaskController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tasks');
});

