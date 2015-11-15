'use strict';

angular.module('nightLife')
.controller('MainCtrl', function ($scope, $http, $window) {
    $scope.events = [];
    $scope.myEvents = {};
    $('.loader').hide();
    
    $scope.dismiss = (function(){
        $('.modal').hide();
    });
    
    $scope.submit = function(location){  
    $scope.events = [];
    $('.loader').show();
    $('.form-search').animate({top:'-200px'},"slow");
    $http({
        url:'https://api.foursquare.com/v2/venues/search',
        method:'GET',
        params: {
                client_id:'SILQ2D52N1ELWIMITWQHN350KN3VUTQMEPI4GKH0WQFJGAHC',
                client_secret:'AX1IPI520FC1SHAOJMFRH15AOM0SEEHHVMSQGYH53GRUZTPD',
                near:location,
                v:20130815,
                query:'Bar'
            }
    }).success(function(data) {  
        $('.loader').hide();
        console.log("fetched");
        angular.forEach(data.response.venues,function(venue){
            $scope.events.push({
                id: venue.id,
                name: venue.name,
                icon: venue.categories[0].icon.prefix+"bg_88"+venue.categories[0].icon.suffix,
                url: "https://foursquare.com/v/"+venue.id,
                going: 0
            });
        });
    });   
    };
    
    $http({
        url:'api/id',
        method:'GET'
    }).success(function(data) {
        $scope.userInfo = data;
    });
    
    $scope.addMe = function(index){
        if($scope.userInfo.username === undefined){
              $window.location.href = '/auth/github'; 
        }
        else{
              $scope.events[index].going += 1;
        }
    };
    
    $scope.removeMe = function(index){
        $scope.events[index].going -= 1;
    };
    
//    $http.get('/api/things').success(function(awesomeThings) {
//      $scope.awesomeThings = awesomeThings;
//    });
//    $scope.deleteThing = function(thing) {
//      $http.delete('/api/things/' + thing._id);
//    };
  });