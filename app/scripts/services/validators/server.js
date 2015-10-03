
'use strict';

angular.module('Simpleweek.validators', [])
  .factory('ServerValidator', function () {
    return {
      validateField: function(apiFieldName, scope, form, errorResponse, formField) {
        formField = formField || apiFieldName;
        var fieldData = errorResponse.errors.children[apiFieldName];
        var errors = fieldData && fieldData.errors;

        var isValidField = ! (errors && errors.length > 0);
        form[formField].$setValidity('server', isValidField);

        if (! isValidField) {
          scope.errorMessages[formField] = errors.join('. ');
        }

        if (errors && errors.length) {
          return errors.join('. ');
        }

        return null;
      }
    };
  });
