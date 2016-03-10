'use strict';

var drawChart = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    if(scope.data == undefined) {
        return;
    }

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels,
        dataset = _.sortBy(scope.data, x => x.order);
<<<<<<< HEAD
=======

    // var keys = _.keys(scope.data);
    // var dataset = _.map(keys, d => ({ key: d, value: scope.data[d] }) );
>>>>>>> faction-stats

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 100, left: 30, right: 30};
    
    var labelPadding = 10,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right,
        chartHeight = yBottom - yTop;

    // var bars = dataset.map(function(d) { return d.key; });

    var xScale = d3.scale.ordinal()
        .domain(dataset.map(x => x.key))
        .rangeRoundBands([xLeft, xRight], .1);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return d.value; })])
        .range([0, chartHeight]);

    var barGroups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d) { 
            var x = xScale(d.key);
            return "translate(" + x + "," + yTop + ")";
        });

    barGroups.append("rect")
        .attr("width", xScale.rangeBand())
        .attr("height", function(d) { return yScale(d.value); })
        .attr("y", function(d) { return chartHeight - yScale(d.value); })
        .attr("class", "bar");

    barGroups.append("text")
        .attr("x", xScale.rangeBand() / 2)
        .attr("y", function(d) { return chartHeight - yScale(d.value) - labelPadding; })
        .text(function(d) { return d.value; })
        .attr("class", "bar-label");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis)
        .selectAll("text");
}

angular.module('d3').directive('d3Histogram', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '=', // binding to an angular object
            width: '@', // static binding to a value
            height: '@',
            labels: '='
        },
        link: function(scope, iElement, iAttrs) {
            var svg = d3.select(iElement[0])
                .append("svg");

            // use auto scaling for width
            if(scope.width == undefined) {
                svg.style("width", "100%");
            }

            // on window resize, re-render d3 canvas
            window.onresize = function() {
                return scope.$apply();
            };
            scope.$watch(function() {
                return angular.element(window)[0].innerWidth;
            }, function() {
                return scope.render();
            });

            // watch for data changes and re-render
            scope.$watch('data', function(newVals, oldVals) {
                return scope.render(newVals);
            }, true);

            // define render function
            scope.render = function() {
                drawChart(d3, svg, scope, iElement, iAttrs);
            };
        }
    };
}]);