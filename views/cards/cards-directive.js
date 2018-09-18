'use strict'

angular.module("memoryGameCardsView", ['gameModal', 'memoryGameTimer', 'memoryGameCardsController'])

.directive("memoryGameCardsView", function() {

    return {
        restrict: 'A',
        scope : false,
        controller: 'memoryGameCardsController',
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'views/cards/cards-view.html',        
        link: function(scope, element, attrs) {            
            var element = angular.element('#memoryGameModal');
                
            scope.$on('timer-stopped', function (event, data){
                scope.ctrl.isSelectable = false;
                scope.userWon = (data.millis > 0);
                
                if(scope.userWon) {
                    scope.timeInfo = (((scope.ctrl.maxTimeToWin * 1000) - data.millis)/1000);
                }
                
                scope.ctrl._setDataToAPI().then(function(response){
            
                    element.modal({
                        backdrop: 'static',
                        keyboard: true
                    });

                });
                
                scope.ctrl.sendTimeData(data);      
            });
            
        }
    };

});