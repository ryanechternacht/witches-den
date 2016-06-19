'use strict';

var angular = require('angular');
var shared = require('./shared.js');

angular.module('wd.shared', [])
    .factory('format', shared.format)
    .controller('AboutCtrl', shared.about)
    .controller('ChangeLogCtrl', shared.changeLog)
    // from shared.js
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'shared/about.html', 
            controller: 'AboutCtrl'
        });
        $routeProvider.when('/changelog', {
            templateUrl: 'shared/changelog.html',
            controller: 'ChangeLogCtrl'
        });
    }]);