'use strict';

/**
 * @ngdoc function
 * @name redreamApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redreamApp
 */
angular.module('redreamApp')
  .controller('RedreamCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.start = false;

    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        // alert('awesome!');  
    };

var PUBLIC_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = 'http://api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 1;
var RATING = 'pg';
var $queryInput = $('.query');
var $resultWrapper = $('.result');
var $loader = $('.loader');
var $inputWrapper = $('.input-wrapper');
var $clear = $('.clear');
var $button = $('.random');
var currentTimeout;


var query = {
  text: null,
  offset: 0,
  request: function() {
    return ("" + BASE_URL + ENDPOINT + "?q=" + this.text + "&limit=" + LIMIT + "&rating=" + RATING + "&offset=" + this.offset + "&api_key=" + PUBLIC_KEY);
  },
  fetch: function(callback) {
    $.getJSON(this.request()).success((function(data) {
      var results = data.data;
      if (results.length) {
        var url = results[0].images.downsized.url;
        console.log(results);
        callback(url);
      } else {
        callback('');
      }
    })).fail((function(error) {
      console.log(error);
    }));
  }
};

function buildImg() {
  var src = arguments[0] !== (void 0) ? arguments[0] : '//giphy.com/embed/xv3WUrBxWkUPC';
  var classes = arguments[1] !== (void 0) ? arguments[1] : 'gif hidden';
  return ("<img src=\"" + src + "\" class=\"" + classes + "\" alt=\"gif\" />");
  console.log('imageeeeeeeee');
}
$clear.on('click', (function(e) {
  $queryInput.val('');
  $inputWrapper.removeClass('active').addClass('empty');
  $('.gif').addClass('hidden');
  $loader.removeClass('done');
  $button.removeClass('active');
}));

$button.on('click', (function(e) {
  query.offset = Math.floor(Math.random() * 25);
  query.fetch((function(url) {
    if (url.length) {
      $resultWrapper.html(buildImg(url));
      $button.addClass('active');
    } else {
      $resultWrapper.html(("<p class=\"no-results hidden\">No Results found for <strong>" + query.text + "</strong></p>"));
      $button.removeClass('active');
    }
    $loader.addClass('done');
    currentTimeout = setTimeout((function() {
      $('.hidden').toggleClass('hidden');
    }), 1000);
  }));
}));


$queryInput.on('keyup', (function(e) {
  var key = e.which || e.keyCode;
  query.text = $queryInput.val();
  query.offset = Math.floor(Math.random() * 25);
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    $loader.removeClass('done');
  }
  currentTimeout = setTimeout((function() {
    currentTimeout = null;
    $('.gif').addClass('hidden');
    if (query.text && query.text.length) {
      $inputWrapper.addClass('active').removeClass('empty');
      query.fetch((function(url) {
        if (url.length) {
          $resultWrapper.html(buildImg(url));
          $button.addClass('active');
        } else {
          $resultWrapper.html(("<p class=\"no-results hidden\">No Results found for <strong>" + query.text + "</strong></p>"));
          $button.removeClass('active');
        }
        $loader.addClass('done');
        currentTimeout = setTimeout((function() {
          $('.hidden').toggleClass('hidden');
        }), 1000);
      }));
    } else {
      $inputWrapper.removeClass('active').addClass('empty');
      $button.removeClass('active');
    }
  }), 1000);
}));

    
  });
