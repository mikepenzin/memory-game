'use strict'

angular.module("memoryGameCardsController", [])

.controller("memoryGameCardsController", ['$scope', 'memoryGameAPIService', '$q', function($scope, memoryGameAPIService, $q) {
    
       
        this._scope = $scope;
        this._memoryGameAPIService = memoryGameAPIService;
        this._$q = $q;
        this.selectedImages = [];
        this.isSelectable = true;
        this.imageURLs = {};
        this.pairCounter = 0;
        this.maxTimeToWin = 0;
        this.comparePair = null;
        var self = this;
            
        /**
        * Randomize array element order in-place.
        * Using Durstenfeld shuffle algorithm.
        */
        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        
        this.init = function() {
          var IDs = self._memoryGameAPIService.getIdList();
          self.maxTimeToWin = self._memoryGameAPIService.getMaxTimeToWin();
          self.imagesIDs = shuffleArray(IDs);
          self.imageData = self._memoryGameAPIService.getImagesInfo();
        }
        
        this._memoryGameAPIService.init().then(function(response){
            self.init();
        });
    
        this.isGameFinished = function(id_1, id_2) {
            self.pairCounter += 2; 
            self._memoryGameAPIService.setPairNumberFound(self.pairCounter);
            if(self.imagesIDs.length === self.pairCounter) {
                self.stopTimer();
                return true;
            } else {
                return false;
            }
        }
        
        this.isSelected = function(id) {
            return self._scope.selectedImages.indexOf(id) == -1 ? false : true;
        }
        
        this.isPair = function(card1, card2){
            return (self._memoryGameAPIService.returnPairId(card1) === card2);
        }
        
        this.selectImage = function(id){
            if(self.pairCounter < (self.imagesIDs.length - 2)){
                if(self.selectedImages.length >= 2) {
                    if(self.isPair(self.selectedImages[0], self.selectedImages[1])){
                        self.isGameFinished(self.selectedImages[0], self.selectedImages[1]);
                    } else {;
                        self.imageData[self.selectedImages[0]].isAlreadySelected = false;
                        self.imageData[self.selectedImages[1]].isAlreadySelected = false;
                    }
                    self.selectedImages = [];
                    self.selectedImages.push(id);
                    self.imageData[id].isAlreadySelected = true;
                } else {
                    self.selectedImages.push(id);
                    self.imageData[id].isAlreadySelected = true;
                }
            } else {
                self.selectedImages.push(id);
                self.imageData[id].isAlreadySelected = true;
                if(self.isPair(self.selectedImages[0], id)){
                    self.isGameFinished(self.selectedImages[0],id);
                } else {
                    self.imageData[self.selectedImages[0]].isAlreadySelected = false;
                    self.imageData[id].isAlreadySelected = false;
                }
            }
        }
        
        this._setDataToAPI = function() {
            var defer = self._$q.defer();
            
            self._memoryGameAPIService.sendDataToAPI()
              .then(function successCallback(response) {
                defer.resolve(response);
              }, function errorCallback(response) {
                // error callback
              });

            return defer.promise;
        }
        
        this.sendTimeData = function(data) {
            self._memoryGameAPIService.setTimeData(data);
        }
        
        this.getTimeData = function() {
            return self._memoryGameAPIService.getMaxTimeToWin();
        }
        
        this.stopTimer = function (){
            self._scope.$broadcast('timer-stop');
        };
        
        return self;
  
}]);