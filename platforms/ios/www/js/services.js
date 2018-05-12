angular.module('starter.services', ['ionic'])

.factory('npvFactory', ['$http','APP_CONSTANTS',function($http,APP_CONSTANTS) {
   
    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    return {
            
        getCategories: function() {
           return $http({
             method: 'GET',
                url: APP_CONSTANTS.API_ENDPOINT+"/getProductCategories"
            });
        },
         getDesigns: function(category) {
           return $http({
             method: 'GET',
                url: APP_CONSTANTS.API_ENDPOINT+"/getCategoryDesigns/"+category
            });
        },
        getProducts: function(category) {
           return $http({
             method: 'GET',
             url: APP_CONSTANTS.API_ENDPOINT+"/getProduct/"+category
            });
        },
        getVideos: function(category) {
           return $http({
             method: 'GET',
             url: APP_CONSTANTS.API_ENDPOINT+"/getVideos/"
            });
        }
    }
}]);

