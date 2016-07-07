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
            labels: '=',
            legend: '='
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

    // legend: [
    //     { group: 0, name: "SH bonus", class: "bar" },
    //     { group: 1, name: "No SH bonus", class: "bar-negative" }    
    // ]

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels,
        dataset = _.sortBy(scope.data, x => x.order),
        legend = scope.legend;

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 30, left: 30, right: 30 },
        legendMargin = { top: 30, bottom: 10, left: 20, right: 20},
        labelPadding = 10,
        legendHeight = 30;

    var legendOffset = !legend ? 0 : legendHeight + legendMargin.top + legendMargin.bottom,
        yBottom = height - margin.bottom - legendOffset,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right,
        chartHeight = yBottom - yTop;

    var largestValue = d3.max(dataset, f => d3.max(f.value, d => d));

    var xScale = d3.scale.ordinal()
        .domain(dataset.map(x => translator(x.key)))
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
            var x = xScale(translator(d.key));
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
        .text(d => d != 0 ? d : "")
        .attr("class", "bar-label");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + yBottom + ")")
        .call(xAxis)
        .selectAll("text");

    // legend
    if(legend) {
        var legendTop = yBottom + legendMargin.top,
            legendBottom = legendTop + legendHeight,
            legendLeft = legendMargin.left,
            legendRight = width - legendMargin.right,
            box = { height: 15, width: 15 };

        var legendScale = d3.scale.ordinal()
            .domain(_.map(legend, l => l.name))
            .rangeRoundBands([legendLeft, legendRight], .1);

        var legendZone = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + legendLeft + "," + legendTop + ")");

        var legendEntries = legendZone.selectAll("g")
            .data(legend)
            .enter()
            .append("g")
            .attr("transform", l => {
                var x = legendScale(l.name);
                return "translate(" + x + ",0)";
            });

        // sample colors
        legendEntries.append("rect")
            .attr("width", box.width)
            .attr("height", box.height)
            //pad in x and y
            .attr("class", l => l.class);

        // // text
        legendEntries.append("text")
            .attr("x", box.width + 10)
            .attr("y", box.height / 2)
            .attr("class", "legend-text")
            .text(l => l.name);
    }
}
