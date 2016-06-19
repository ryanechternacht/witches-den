'use strict';

var angular = require('angular');
var faction = require('./faction.js');

angular.module('wd.analyze.faction', ['ngRoute', 'wd.shared'])
    .controller('AnalyzeFactionCtrl', faction.faction)
    .controller('AnalyzeAllCtrl', faction.all)
    // from faction.js
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/analyze/faction/all', {
            templateUrl: '/analyze/faction/all.html',
            controller: 'AnalyzeAllCtrl'
        });
        $routeProvider.when('/analyze/faction/:faction?', {
            templateUrl: '/analyze/faction/faction.html', 
            controller: 'AnalyzeFactionCtrl'
        });
    }]);

    