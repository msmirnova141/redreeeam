'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redreamApp
 */
angular.module('redreamApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
