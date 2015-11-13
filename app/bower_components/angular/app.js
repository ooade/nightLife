'use strict';

angular.module('nightLife',[
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngRoute',
])

.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });