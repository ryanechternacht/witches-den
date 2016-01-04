'use strict';

var drawChart = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels;

    var dataset = [];
    var keys = _.keys(scope.data);
    for(var i = 0; i < keys.length; i++) { 
        var k = keys[i];
        dataset.push( { key: k, value: scope.data[k] } );
    }

    var barOrdering;
    if(scope.ordering) { 
        barOrdering = scope.ordering.map(function(d) { return translator(d); });
    } else { 
        barOrdering = dataset.map(function(d) { return translator(d.key); });
    }

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 70, left: 30, right: 30};

    var barPadding = 5,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right;

    // some numbers can be negative (e.g. leech). We'll take the absolute value
    // of all numbers for building the graphs, and use color styling to mark 
    // these as negative

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return Math.abs(d.value); })])
        .range([yBottom, yTop]);

    var xScale = d3.scale.ordinal()
        .domain(barOrdering)
        .rangeRoundBands([xLeft, xRight], .1);

    var bar = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { 
            return "translate(" + xScale(translator(d.key)) + ",0)";
        });

    bar.append("rect")
        .attr("y", function(d) { return yScale(Math.abs(d.value)); })
        .attr("height", function(d) { return yBottom - yScale(Math.abs(d.value)); })
        .attr("width", function(d) { return xScale.rangeBand(); })
        .attr("class", function(d) {
            if(d.value >= 0) { 
                return "bar";
            }
            else {
                return "bar negative-bar"
            }
        });

    bar.append("text")
        .text(function(d) { return d.value; })
        .attr("y", function(d) { return yScale(Math.abs(d.value)) - 5; })
        .attr("x", xScale.rangeBand() / 2)
        .attr("class", "bar-label");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-30)" 
        });
}

angular.module('d3').directive('d3Scoregraph', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '=', // binding to an angular object
            width: '@',    // static binding to a value
            height: '@',
            ordering: '=',
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