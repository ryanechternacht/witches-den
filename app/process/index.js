'use strict';

var angular = require('angular');

angular.module('wd.process', [])
    .factory('rulesengine', require('./rules_engine.js'));