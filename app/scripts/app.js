'use strict';

/**
 * @ngdoc overview
 * @name redreamApp
 * @description
 * # redreamApp
 *
 * Main module of the application.
 */
angular
  .module('redreamApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ui.router',
    'ngGiphy'
  ])
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('redream', {
            url: '/redream',
            templateUrl: 'views/redream.html',
            controller: 'RedreamCtrl'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('redream.refeel', {
            url: '/refeel',
            templateUrl: 'views/redream-refeel.html'
        })
        
        // url will be /form/interests
        .state('redream.recall', {
            url: '/recall',
            templateUrl: 'views/redream-recall.html'
        })
        
        // url will be /form/payment
        .state('redream.results', {
            url: '/results',
            templateUrl: 'views/redream-results.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/redream/refeel');
})


