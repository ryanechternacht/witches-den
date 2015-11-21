'use strict';

var drawChart = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    var width = scope.width,
        height = scope.height,
        dataset = scope.data;

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 30, left: 30, right: 30};

    var barPadding = 5,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right,
        barWidth = ((xRight - xLeft) / dataset.length) - (barPadding * 2);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return d; })])
        .range([yBottom, yTop]);

    var xScale = d3.scale.linear()
        .domain([0, dataset.length])
        .range([xLeft, xRight]);

    var bar = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { 
            return "translate(" + xScale(i) + ",0)";
        });

    bar.append("rect")
        .attr("y", function(d) { return yScale(d); })
        .attr("height", function(d) { return yBottom - yScale(d); })
        .attr("width", function(d) { return barWidth; })
        .attr("class", "bar");

    bar.append("text")
        .text(function(d) { return d; })
        .attr("y", function(d) { return yScale(d) - 5; })
        .attr("x", barWidth / 2)
        .attr("class", "bar-label");

    var ticks = dataset.map(function(d) { return d; });

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickValues([1,2,3,4,5,6]);

    svg.append("g")
        .attr("class", "axis x-axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    svg.append("g")
        .attr("class", "axis y-axis")
        .attr("transform", "translate(" + xLeft + ",0)")
        .call(yAxis);

}

angular.module('d3').directive('d3Scoregraph', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '=', // binding to an angular object
            width: '@',    // static binding to a value
            height: '@'
            // label: '@',
            // onClick: '&'
        },
        link: function(scope, iElement, iAttrs) {
            var svg = d3.select(iElement[0])
                .append("svg");

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