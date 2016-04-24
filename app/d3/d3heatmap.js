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

    var yScale = d3.scale.ordinal()
        .domain(factions.map(x => x))
        .rangeRoundBands([yTop, yBottom], .1);

    var xScale = d3.scale.ordinal()
        .domain(factions.map(x => x))
        .rangeRoundBands([0, chartWidth], 0);

    var rows = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", (d, i) => {
            var y = yScale(i);
            return "translate(" + xLeft + "," + y + ")";
        })
        .attr("class", "row");

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
        .attr("class", (d, i) => {
            if(d == "-" || d == "") {
                return "neutral";
            } else if(d >= 75) {
                return "strong-positive";
            } else if(d >= 60) {
                return "weak-positive";
            } else if(d <= 25) {
                return "strong-negative";
            } else if(d <= 40) {
                return "weak-negative";
            } else {
                return "neutral";
            }
        });

    cells.append("text")
        .text(d => d)
        .attr("y", yScale.rangeBand() / 2 + 1) // +2 moves it down a bit
        .attr("x", xScale.rangeBand() / 2)
        .attr("class", "cell-text");


    var dividers = svg.selectAll(".dividers")
        .data(factions)
        .enter()
        .append("line")
            .attr("x1", (d,i) => {
                if(i % 2 == 0) { // left side
                    return xScale(i) + margin.left + 2;
                } else { // right side
                    return xScale(i) + xScale.rangeBand() + margin.left - 2;
                }
            })
            .attr("x2", (d,i) => {
                if(i % 2 == 0) { // left side
                    return xScale(i) + margin.left + 2;
                } else { // right side
                    return xScale(i) + xScale.rangeBand() + margin.left - 2;
                }
            })
            .attr("y1", margin.top)
            .attr("y2", chartHeight + margin.top)
            .attr("class", (d,i) => {
                if(factions[i] == "nomads" || factions[i] == "fakirs") {
                    return "yellow";
                } else if(factions[i] == "chaosmagicians" || factions[i] == "giants") {
                    return "red";
                } else if(factions[i] == "engineers" || factions[i] == "dwarves") {
                    return "gray";
                } else if(factions[i] == "swarmlings" || factions[i] == "mermaids") {
                    return "blue";
                } else if(factions[i] == "darklings" || factions[i] == "alchemists") {
                    return "black";
                } else if(factions[i] == "cultists" || factions[i] == "halflings") {
                    return "brown";
                } else if(factions[i] == "witches" || factions[i] == "auren") {
                    return "green";
                }
            });

    // labels
    var leftLabels = svg.selectAll(".left-label")
        .data(factions)
        .enter()
        .append("text")
        .text(d => d)
        .attr('x', 0)
        .attr('y', d => yScale(d) + yScale.rangeBand() / 2 + 1)
        .attr("class", "row-header");


    var topLabels = svg.selectAll(".top-label")
        .data(factions)
        .enter()
        .append("g")
            .attr("transform", d => {
                var y = margin.top;
                var x = xScale(d) + xScale.rangeBand() / 2 + margin.left;
                return "translate(" + x + "," + y + ")";
            })
            .attr("class", "top-label")
            .append("text")
                .text(d => d)
                .attr("class", "column-header")
                .attr("transform", d => "rotate(-70)");
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