'use strict'

var gameModal = angular.module("gameModal", []);

gameModal.directive("gameModal", function() {
    return {
        restrict: 'E',
        scope : {
            won: '=',
            time: '='
        },
        templateUrl: 'views/game-modal/game-modal.html',        
        link: function(scope, element, attrs) {    
            var successPrases = [
                'Amazing! You did it!',
                'WOW! Good job!',
                'Perfect! Great job!'
            ]
            
            var failPrases = [
                'Try next time...',
                'Seems you run out of time, maybe next time...',
                'Oh no! You run out of time!'
            ]
            
            scope.getRandomPrase = function(){
                if(scope.won) {
                    return successPrases[Math.floor(Math.random()*successPrases.length)];
                } else {
                    return failPrases[Math.floor(Math.random()*failPrases.length)];
                }
            }
            
            scope.$watch('won',function(newVal,oldVal){
                scope.randomPhrase = scope.getRandomPrase();
            });
            
            scope.close = function (){
                scope.$emit('restart');
            };
            
        }
    };

});