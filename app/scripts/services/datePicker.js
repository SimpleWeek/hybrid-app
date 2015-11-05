'use strict';

angular.module('Simpleweek.services')

  .factory('DatePicker', function () {
    return {
      getConfig: function() {
        return {
          titleLabel: 'Select a Date',  //Optional
          setButtonType : 'button-assertive',  //Optional
          todayButtonType : 'button-assertive',  //Optional
          closeButtonType : 'button-assertive',  //Optional
          modalHeaderColor: 'bar-balanced',
          modalFooterColor: 'bar-balanced',
          templateType: 'modal', //Optional
          from: new Date(),   //Optional
          callback: function (val) {    //Mandatory
          }
        }
      }
    }
  });
