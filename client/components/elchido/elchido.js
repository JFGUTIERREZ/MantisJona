angular.module('app').directive('elchido',
function ($rootScope, $injector, $ionicModal) {
    'use strict';

    return {
        template: 
        '<button ng-click="openPad()">CLICK ME</button>',
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