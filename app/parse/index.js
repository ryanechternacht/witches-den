'use strict';

var angular = require('angular');

angular.module('wd.parse', [])
    .factory('parser', require('./parse.js')); 
