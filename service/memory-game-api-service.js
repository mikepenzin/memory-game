var memoryGameAPIService = angular.module("memoryGameAPIService", []);

memoryGameAPIService.service("memoryGameAPIService", ['$http', '$q' , function($http, $q){ 
    this._$q = $q;
    this.imagesData = {};
    this.imagesURLsData = {};
    this.imageIDs = [];
    this.maxTimeToWin = null;
    this.userSuccessData = {};
    
    var self = this;
    
    var config = {
        headers : {
            'Content-Type': 'text/plain'
        }
    }

    
    self.init = function() {
        var defer = self._$q.defer();
        
        self.getDataFromAPI().then(function(response) {
            self.maxTimeToWin = response.data.data.time;
            for(i=0; response.data.data.images.length > i; i++) {
                self.imagesData[response.data.data.images[i].id] = response.data.data.images[i];
                self.imagesData[response.data.data.images[i].id].isAlreadySelected = false;
                self.imageIDs.push(response.data.data.images[i].id);
                self.userSuccessData.user_id = response.data.data.user_id;
            }
            defer.resolve(self);
        });
        
        return defer.promise;
    }
    
    self.getDataFromAPI = function(){
        return $http.get('https://dev-bot.pico.buzz/memory');
    }
    
//    self.init();
    
    self.sendDataToAPI = function(){
        return $http.post('https://dev-bot.pico.buzz/memory', JSON.stringify(self.userSuccessData), config);
    }
    
    self.getIdList = function (){
        return this.imageIDs;
    }
    
    self.getMaxTimeToWin = function() {
        return this.maxTimeToWin;
    }
    
    self.getImagesInfo = function() {
        return this.imagesData;
    }
    
    self.returnPairId = function(id) {
        return this.imagesData[id].pair_id;
    }
    
    self.setPairNumberFound = function(num) {
        self.userSuccessData.matches = num / 2;
    }
    
    self.setTimeData = function(time){
        self.userSuccessData.time = self.maxTimeToWin-(time.millis / 1000);
    }
    
    return self;
}]);