'use strict'

var memoryGameTimer = angular.module("memoryGameTimer", ['timer']);

memoryGameTimer.directive("memoryGameTimer", function() {

    return {
        restrict: 'E',
        scope : {
            maxtimetowin: '='
        },
        templateUrl: 'views/timer/timer.html',
        link: function(scope, element, attrs) {
            scope.maxTimeToWin = scope.maxtimetowin();
            
            scope.stopTimer = function (){
                scope.$broadcast('timer-stop');
            };
        }
    };

});