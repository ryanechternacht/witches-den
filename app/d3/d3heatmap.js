'use strict';

var drawHeatmap = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    if(scope.data == undefined) {
        return;
    }

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels,
        factions = scope.factions,
        dataset = _.sortBy(scope.data, x => x.order);

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 100, bottom: 30, left: 100, right: 30};
    
    var labelPadding = 10,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right,
        chartHeight = yBottom - yTop,
        chartWidth = xRight - xLeft;

        console.log(yBottom, yTop, xLeft, xRight, chartHeight);

    var yScale = d3.scale.ordinal()
        .domain(factions.map(x => x))
        .rangeRoundBands([yTop, yBottom], .1);

    var xScale = d3.scale.ordinal()
        .domain(factions.map(x => x))
        .rangeRoundBands([0, chartWidth], .1);

        console.log(d3.map(factions, x => x));

    var rows = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            var y = yScale(i);
            return "translate(" + xLeft + "," + y + ")";
        });

    // var cells = rows.selectAll("text")
    //     .data(d => d)
    //     .enter()
    //     .append("text")
    //     .text(d => d)
    //     .attr("x", (d, i) => xScale(i))

    var cells = rows.selectAll("g")
        .data(d => d)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            var x = xScale(i);
            return "translate(" + x + ",0)";
        });

    cells.append("rect")
        .attr("width", xScale.rangeBand())
        .attr("height", yScale.rangeBand())
        .attr("class", d => { 
            if(d == 0 || d == "-") {
                return "heatmap-off"
            } else {
                return "heatmap-cell";
            }
        });

    cells.append("text")
        .text(d => d)
        .attr("y", yScale.rangeBand() / 2 + 1) // +2 moves it down a bit
        .attr("x", xScale.rangeBand() / 2)
        .attr("class", "heatmap-cell-text");
}

angular.module('d3').directive('d3Heatmap', ['d3', function(d3) { 
    return {
        restrict: 'EA',
        scope: {
            data: '=', // binding to an angular object
            width: '@', // static binding to a value
            height: '@',
            labels: '=',
            factions: '='
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
                drawHeatmap(d3, svg, scope, iElement, iAttrs);
            };
        }
    };
}]);