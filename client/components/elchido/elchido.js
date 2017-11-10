angular.module('app').directive('elchido',
function ($rootScope, $injector, $ionicModal) {
    'use strict';

    return {
        template: 
        '<input class="button button-block button-energized" data-comp-id="button.1" ' +
        'ng-click="openPad()" '+
        'style="border-color: rgba(255, 255, 255, 0);" type="button" value="El boton chido">',
        restrict: 'E',
        transclude: true,
        scope: {
            selectStyle: '@',
            labelStyle: '@',
            labelClass: '@',
            headerClass: '@',
            imgSrc: '@',
            ngModel: '=',
            ngChange: '&',
            title: '@',
            placeholder: '@',
            name: '@'
        },
        controller: function ($scope) {
            $scope.openPad = function() {
              alert("Si funciona chido");
            }
        }
    };
});