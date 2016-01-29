'use strict';

var drawChart = function(d3, svg, scope, iElement, iAttrs) { 
    svg.selectAll("*").remove();

    if(scope.data == undefined) {
        return;
    }

    var height = scope.height,
        width = scope.width || d3.select(iElement[0])[0][0].offsetWidth - 20,
        translator = scope.labels;

    var barOrdering;
    if(scope.ordering) { 
        barOrdering = scope.ordering.map(function(d) { return translator(d); });
    } else { 
        barOrdering = dataset.map(function(d) { return translator(d.key); });
    }

    var factionNames = _.map(scope.data, function(f) { return f.faction;});


    var dataset = [];
    var scorecards = scope.data;
    var keys = _.keys(scorecards[0].simple);
    for(var i = 0; i < keys.length; i++) { 
        var key = keys[i];
        if(_.contains(scope.ordering, key)) { 
            var arr = [];
            for(var j = 0; j < scorecards.length; j++) { 
                var sc = scorecards[j];
                arr.push({faction: sc.faction, points: sc.simple[key] || 0});
            }
            dataset.push({ source: key, factions: arr});
        }
    }

    svg.attr("width", width)
        .attr("height", height);

    var margin = { top: 30, bottom: 30, left: 100, right: 30};

    var barPadding = 5,
        yBottom = height - margin.bottom,
        yTop = margin.top,
        xLeft = margin.left,
        xRight = width - margin.right;   
        
    // some numbers can be negative (e.g. leech). We'll take the absolute value
    // of all numbers for building the graphs, and use color styling to mark 
    // these as negative 

    var yScale = d3.scale.ordinal()
        .domain(barOrdering)
        .rangeRoundBands([yTop, yBottom], .1);

    var yScaleInner = d3.scale.ordinal()
        .domain(factionNames)
        .rangeRoundBands([0, yScale.rangeBand()]);

    var largestValue = d3.max(dataset, function(f) { 
        return d3.max(f.factions, function(d) { 
            return Math.abs(d.points);
        })
    });

    var xScale = d3.scale.linear()
        .domain([0, largestValue])
        .range([xLeft, xRight]);

    var barGroup = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { 
            var y = yTop + yScale(translator(d.source)) - (yScale.rangeBand() / 2);
            return "translate(" + xLeft + "," + y + ")";
        })
        // setting width/height on a group doesn't do anything as far as i can tell
        .attr("height", yScale.rangeBand())
        .attr("width", xRight - xLeft);

    barGroup.selectAll("rect")
        .data(function(d) { return d.factions })
        .enter()
        .append("rect")
        .attr("width", function(d) { return xScale(Math.abs(d.points)); })
        .attr("height", function(d) { return yScaleInner.rangeBand(); })
        .attr("y", function(d) { return yScaleInner(d.faction); })
        .attr("class", function(d) {
            if(d.points >= 0) { 
                return "bar";
            }
            else {
                return "bar negative-bar"
            }
        });


    // barGroup.append("rect")
    //     // .attr("x", function(d) { return yScale(Math.abs(d.value)); })
    //     .attr("height", function(d) { return yScale.rangeBand(); })
    //     .attr("width", function(d) { return xScale(Math.abs(d.factions[3].points)); })
    //     .attr("class", function(d) {
    //         if(d.factions[3].points >= 0) { 
    //             return "bar";
    //         }
    //         else {
    //             return "bar negative-bar"
    //         }
    //     });


    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xLeft + ",0)")
        .call(yAxis)
        .selectAll("text");
        // .style("text-anchor", "end")
        // .attr("dx", "-.8em")
        // .attr("dy", ".15em")
        // .attr("transform", function(d) {
        //     return "rotate(-30)" 
        // });
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