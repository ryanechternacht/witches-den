'use strict';

var _ = require('underscore');

d3HistogramMulti.$inject = ['d3'];
module.exports = d3HistogramMulti;

function d3HistogramMulti(d3) { 
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
                drawHistogramMulti(d3, svg, scope, iElement, iAttrs);
            };
        }
    };
}

var drawHistogramMulti = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    if(scope.data == undefined) {
        return;
    }

    // shstats: [
    //     { "order":0, "key":3, "value": [1,0] },
    //     { "order":1, "key":5, "value": [1,1] }
    // ]

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels,
        dataset = _.sortBy(scope.data, x => x.order);

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 30, left: 30, right: 30};
    
    var labelPadding = 10,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right,
        chartHeight = yBottom - yTop;

    var largestValue = d3.max(dataset, f => 
        d3.max(f.value, d => d)
    );

    var xScale = d3.scale.ordinal()
        .domain(dataset.map(x => x.key))
        .rangeRoundBands([xLeft, xRight], .1);

    var xScaleInner = d3.scale.ordinal()
        .domain([0,1])
        .rangeRoundBands([0, xScale.rangeBand()], .1)

    var yScale = d3.scale.linear()
        .domain([0, largestValue])
        .range([0, chartHeight]);

    var barGroups = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d) { 
            var x = xScale(d.key);
            return "translate(" + x + "," + yTop + ")";
        });

    var bars = barGroups.selectAll("g")
        .data(d => d.value)
        .enter()
        .append("g");

    var barClasses = ["bar", "bar-negative"]

    bars.append("rect")
        .attr("width", d => xScaleInner.rangeBand())
        .attr("x", (d,i) => xScaleInner(i))
        .attr("y", d => chartHeight - yScale(d))
        .attr("height", d => yScale(d))
        .attr("class", (d,i) => barClasses[i]);

    bars.append("text")
        .attr("x", (d,i) => xScaleInner.rangeBand() / 2 + xScaleInner(i))
        .attr("y", d => chartHeight - yScale(d) - labelPadding)
        .text(d => d)
        .attr("class", "bar-label");

    // barGroups.append("text")
    //     .attr("x", xScale.rangeBand() / 2)
    //     .attr("y", function(d) { return chartHeight - yScale(d.value) - labelPadding; })
    //     .text(function(d) { return d.value; })
    //     .attr("class", "bar-label");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis)
        .selectAll("text");
}
