'use strict';

angular.module('nightLife')
.controller('MainCtrl', function ($scope, $cookies, $http, $window) {
    $scope.events = [];
    $scope.myEvents = [];
    $('.loader').hide(); 
    $scope.loggingIn = false;
    $scope.events = [];
    $scope.userInfo;
    $scope.alertBox;
    
    $http({
        url:'/api/id',
        method:'GET'
    }).success(function(data) {
    if(data.username){
        $scope.userInfo = data;
        $scope.loggingIn = true;
        $cookies.remove('search');
     }
    });
    
    $scope.submit = function(location){  
    $('.loader').show();
    $('.form-search').animate({top:'-200px'},"slow");
    $cookies.put('search',location);
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
        $scope.events = data.response.venues;
        if($scope.userInfo !== undefined){
        var username = $scope.userInfo.username;
        $http.get('/api/events/' + username)
        .success(function(data2){
          $scope.myEvents = data2;
          $scope.subArray = function (arr1,arr2){
            return arr2.filter(function(value){
                return arr1.filter(function(value2){
                    return value.id === value2.eventId;
                }).length===0;
            });
        };
        $scope.events = $scope.subArray($scope.myEvents,$scope.events);
        console.log("ammended");
          });
        }
        
        
        });   
    };

    $scope.login = function(){
        $window.location.href = '/auth/github';
    };
    
    if($cookies.get('search') !== undefined && $scope.userInfo === undefined){
        $scope.submit($cookies.get('search'));
        $scope.location = $cookies.get('search');
    }
    
    $scope.addMe = function(index){
        if($scope.userInfo !== undefined){
            var eventId = $scope.events[index].id;
            var username = $scope.userInfo.username;
            var place = $scope.events[index].name;
            $scope.myEvents.push({eventId:eventId, username:username, place:place});
            
            $http.post('/api/events', {eventId:eventId, username:username, place:place})
                .success(function(data){
                    $scope.alertBox = place;
                    $('.alertBox').show();
                    $cookies.remove('search');
                    $scope.events.splice(index, 1);
                    console.log("data submitted and cookies removed");
                });
            }else{
                alert("Redirecting to GitHub...");
                $scope.login();
            }
    };
    
    $('.viewAll').click(function(){
       $('.events').show(); 
       $('.alertBox').fadeOut(); 
    });
    
    $('.modalClose').click(function(){
        $('.modal').hide();
    })
    
    $scope.removeMe = function(id){
        $http.delete('/api/events/' + $scope.userInfo.username + "/" + id).success(function(){
            angular.forEach($scope.myEvents, function(x, i){
               if(x.eventId === id){
                   $scope.myEvents.splice(i, 1);
               } 
            });
        });
    };
    
//    $http.get('/api/things').success(function(awesomeThings) {
//      $scope.awesomeThings = awesomeThings;
//    });
//    $scope.deleteThing = function(thing) {
//      $http.delete('/api/things/' + thing._id);
//    };
  });