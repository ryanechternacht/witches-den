'use strict';

var angular = require('angular');

angular.module('d3', [])
    .factory('d3', require('./d3.js'))
    .directive('d3Heatmap', require('./d3heatmap.js'))
    .directive('d3Histogram', require('./d3histogram.js'))
    .directive('d3Scoregraph', require('./d3scoregraph.js'));