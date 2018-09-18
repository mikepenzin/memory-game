'use strict'

var memoryGameMainView = angular.module("memoryGameMainView", []);

memoryGameMainView.directive("memoryGameMainView", ['$window', function($window) {
    var controller = function ($scope) {

        var ctrl = this;
        
        ctrl.GameStarted = function () {
            $scope.isGameStarted = true;
        }
    };   
    
    return {
        restrict: 'AE',
        scope : false,
        controller: controller,
        controllerAs: 'ctrl',
        bindToController: true,
        templateUrl: 'views/main/main-page.html',        
        link: function(scope, element, attrs) {
            
            scope.$on('restart', function (event, data){
                $window.location.reload();
            });
            
        }
    };

}]);