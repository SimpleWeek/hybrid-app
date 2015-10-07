'use strict';

angular.module('Simpleweek.services')
  .factory('$ionicContentBanner', [
    '$document',
    '$rootScope',
    '$compile',
    '$timeout',
    '$ionicPlatform',
    function ($document, $rootScope, $compile, $timeout, $ionicPlatform) {

      function isActiveView (node) {
        // walk up the child-parent node chain until we get to the root or the BODY
        while (node !== null && node.nodeName !== 'BODY') {
          var navView = node.getAttribute("nav-view");

          // as soon as we encounter a cached (parent) view then we know the view can't be active
          if (navView !== null && navView === 'cached') {
            return false;
          }
          node = node.parentNode;
        }
        // no cached parent seen, the view must be really active
        return true;
      }

      function getActiveView (body) {
        // first, search under side menu (this fixes bug when public.start view is hidded but has active state)
        var views = body.querySelectorAll('ion-side-menus ion-view[nav-view="active"]');

        // if nothing is found, then search without tag (it could be a form[nav-view="active"])
        if (views.length == 0) {
          views = body.querySelectorAll('ion-side-menus [nav-view="active"]');
        }

        // get the candidate active views
        if (views.length == 0) {
          views = body.querySelectorAll('ion-view[nav-view="active"]');
        }

        // If the view is in ion-nav-view, instead of ion-view, it should just be div
        if (views.length == 0) {
          views = body.querySelectorAll('div[nav-view="active"]');
        }

        if (views.length == 0) {
          views = body.querySelectorAll('form[nav-view="active"]');
        }

        // only one candidate, so we just take it
        if (views.length === 1) {
          return views[0];
        }

        // convert the NodeList to an array, filter it using 'isActiveView' and return the first element
        return Array.prototype.slice.call(views).filter(function (view) {
          return isActiveView(view);
        })[0];
      }

      /**
       * @ngdoc method
       * @name $ionicContentBanner#show
       * @description
       * Load and show a new content banner.
       */
      function contentBanner (opts) {
        var scope = $rootScope.$new(true);

        angular.extend(scope, {
          icon: 'ion-ios-close-empty',
          transition: 'vertical',
          interval: 3000,
          type: 'info',
          $deregisterBackButton: angular.noop,
          closeOnStateChange: true,
          autoClose: null,
          showCloseButton: true
        }, opts);

        // Compile the template
        var classes = 'content-banner ' + scope.type + ' content-banner-transition-' + scope.transition;
        var element = scope.element = $compile('<ion-content-banner class="' + classes + '"></ion-content-banner>')(scope);
        var body = $document[0].body;

        var stateChangeListenDone = scope.closeOnStateChange ?
          $rootScope.$on('$stateChangeSuccess', function() { scope.close(); }) :
          angular.noop;

        scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(
          function() {
            $timeout(scope.close);
          }, 300
        );

        scope.close = function() {
          if (scope.removed) {
            return;
          }
          scope.removed = true;

          ionic.requestAnimationFrame(function () {
            element.removeClass('content-banner-in');

            $timeout(function () {
              scope.$destroy();
              element.remove();
              body = stateChangeListenDone = null;
            }, 400);
          });

          scope.$deregisterBackButton();
          stateChangeListenDone();
        };

        scope.show = function() {
          if (scope.removed) {
            return;
          }

          var activeView = getActiveView(body);
          activeView.querySelector('.scroll-content').appendChild(element[0]);

          ionic.requestAnimationFrame(function () {
            $timeout(function () {
              element.addClass('content-banner-in');
              //automatically close if autoClose is configured
              if (scope.autoClose) {
                $timeout(function () {
                  scope.close();
                }, 7000, false);
              }
            }, 20, false);
          });
        };

        //set small timeout to let ionic set the active/cached view
        $timeout(function () {
          scope.show();
        }, 10, false);

        // Expose the scope on $ionContentBanner's return value for the sake of testing it.
        scope.close.$scope = scope;

        return scope.close;
      }

      return {
        show: contentBanner
      };
    }]);
