'use strict';

angular.module('Simpleweek.controllers')

  .controller('AuthController', function ($scope, $stateParams, $ionicLoading, $state, $ionicHistory, $ionicPopup, AuthService) {

    $scope.user = {};

    $scope.authenticateUser = function () {
      var success = function (response) {
        $ionicLoading.hide();
        $ionicHistory.nextViewOptions({disableBack: true});

        $state.go('app.tasks');
      };

      var error = function(response) {
        $ionicLoading.hide();
        alert('error');
        // TODO add form validation (red errors)
      };

      $ionicLoading.show({template: 'Loading...'});

      // use AuthService to login
      AuthService.login($scope.user).then(success, error);
    },

    $scope.registerUser = function () {
      var success = function(response){
  				console.log("Registering user successful");
  				console.log(response);
  			$ionicLoading.hide();
  			$scope.authenticateUser();
  		}

  		var error = function(error) {
  			$ionicLoading.hide();
  			console.log(error);
  			$scope.error = error;

  			var errorPopup = $ionicPopup.show({
  		    	templateUrl: 'templates/modal/error.html',
  		    	title: 'Error',
  		    	scope: $scope,
  		    	buttons: [
  		       		{ text: 'Ok' }
  		    	]
  		   	});

  		   errorPopup.then(function(res) {
           console.log('popup ok Tapped!', res);
  		   });

  		   $timeout(function() {
  		      errorPopup.close(); //close the popup after 3 seconds for some reason
  		   }, 3000);
  		}

  		$ionicLoading.show({
        template: 'Loading...'
   		});

  		AuthService.register($scope.user).then(success,error);
    }
  });
