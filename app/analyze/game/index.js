'use strict';

var angular = require('angular');
var shared = require('../../shared');
var process = require('../../process');

angular.module('wd.analyze.game', ['ngRoute', 'wd.shared', 'wd.process', 'wd.parse'])
    .controller('AnalyzeGameCtrl', require('./game.js'))
    // from game.js
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/analyze/game/:game?', {
            templateUrl: '/analyze/game/game.html', 
            controller: 'AnalyzeGameCtrl'
        });
    }]);