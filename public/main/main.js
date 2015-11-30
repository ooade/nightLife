'use strict';

angular.module('nightLife')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/main/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({redirectTo:'/'});
  });