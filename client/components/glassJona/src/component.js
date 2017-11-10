angular.module('app').directive('glassJona',
    function ($rootScope, $injector, $ionicModal) {
        'use strict';

        return {
            template: '<label class="item item-input item-button-right" ng-class="selectClass"' +
            'ng-click="openPad()"' +
            'style="{{selectStyle}}"><span class="input-label" ng-class="labelClass"' +
            'style="{{labelStyle}}"><ng-transclude></ng-transclude></span>' +
            '<img style="height: 30px;" ng-src={{imgSrc}}>' +
            '<button class="button button-icon button-right">' +
            '<i class="icon positive-icon ion-ios-compose-outline"></i></button>' +
            '</label>',
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
                    $ionicModal.fromTemplateUrl('/components/bower_components/glass-jona/templates/signatureModal.html', {
                        scope: $scope,
                        animation: 'slide-in-up'
                    }).then(function(modal) {
                        $scope.modal = modal;
                        $scope.modal.show().then(function() {
                            var wrapper = document.getElementById("signature-pad"),
                                canvas = wrapper.querySelector("canvas"),
                                signaturePad;

                            // Adjust canvas coordinate space taking into account pixel ratio,
                            // to make it look crisp on mobile devices.
                            // This also causes canvas to be cleared.
                            function resizeCanvas() {
                                // When zoomed out to less than 100%, for some very strange reason,
                                // some browsers report devicePixelRatio as less than 1
                                // and only part of the canvas is cleared then.
                                setTimeout(function() {
                                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                                    canvas.setAttribute('width', canvas.offsetWidth * ratio);
                                    canvas.setAttribute('height', canvas.offsetHeight * ratio);
                                    canvas.getContext("2d").scale(ratio, ratio);
                                }, 500);
                            }
                            window.addEventListener('orientationchange', function() {
                                resizeCanvas();
                            });

                            resizeCanvas();

                            signaturePad = new SignaturePad(canvas);

                            $scope.clear = function() {
                                signaturePad.clear();
                            };

                            $scope.cancel = function() {
                                $scope.modal.hide();
                                $scope.modal.remove();
                            };

                            $scope.save = function() {
                                if (signaturePad.isEmpty()) {
                                    alert("Please provide signature first.");
                                } else {
                                    var signatureData = signaturePad.toDataURL();
                                    $scope.imgSrc = signatureData;
                                    $scope.ngModel = signatureData;
                                    $scope.cancel();
                                }             
                            };
                        });
                    });
                }
            }
        };
    });
