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
        .rangeRoundBands([0, yScale.rangeBand()], .1);

    var largestValue = d3.max(dataset, function(f) { 
        return d3.max(f.factions, function(d) { 
            return Math.abs(d.points);
        })
    });

    var xScale = d3.scale.linear()
        .domain([0, largestValue])
        .range([0, xRight - xLeft]);

    var barGroup = svg.selectAll("g")
        .data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { 
            var y = yScale(translator(d.source));
            return "translate(" + xLeft + "," + y + ")";
        })
        // setting width/height on a group doesn't do anything as far as i can tell
        .attr("height", yScale.rangeBand())
        .attr("width", xRight - xLeft);

    var bars = barGroup.selectAll("g")
        .data(function(d) { return d.factions })
        .enter()
        .append("g");

    bars.append("rect")
        .attr("width", function(d) { return xScale(Math.abs(d.points)); })
        .attr("height", function(d) { return yScaleInner.rangeBand(); })
        .attr("y", function(d) { return yScaleInner(d.faction); })
        .attr("class", function(d) {
            if(d.faction == "cultists" || d.faction == "halflings") {
                if(d.points >= 0) { return "bar-brown"; }
                else { return "bar-brown-negative"; }
            } else if(d.faction == "engineers" || d.faction == "dwarves") {
                if(d.points >= 0) { return "bar-gray"; }
                else { return "bar-gray-negative"; }
            } else if(d.faction == "giants" || d.faction == "chaosmagicians") {
                if(d.points >= 0) { return "bar-red"; }
                else { return "bar-red-negative"; }
            } else if(d.faction == "mermaids" || d.faction == "swarmlings") {
                if(d.points >= 0) { return "bar-blue"; }
                else { return "bar-blue-negative"; }
            } else if(d.faction == "witches" || d.faction == "auren") {
                if(d.points >= 0) { return "bar-green"; }
                else { return "bar-green-negative"; }
            } else if(d.faction == "nomads" || d.faction == "fakirs") {
                if(d.points >= 0) { return "bar-yellow"; }
                else { return "bar-yellow-negative"; }
            } else if(d.faction == "darklings" || d.faction == "alchemists") {
                if(d.points >= 0) { return "bar-black"; }
                else { return "bar-black-negative"; }
            } else if(d.faction == "icemadiens" || d.faction == "yetis") {
                if(d.points >= 0) { return "bar-ice"; }
                else { return "bar-ice-negative"; }
            } else if(d.faction == "acolytes" || d.faction == "dragonlords") {
                if(d.points >= 0) { return "bar-volcano"; }
                else { return "bar-volcano-negative"; }
            } else if(d.faction == "shapeshifters" || d.faction == "riverwalkers") {
                if(d.points >= 0) { return "bar-variable"; }
                else { return "bar-variable-negative"; }
            }
            // there shouldn't be another else
        });

    // score amount
    bars.append("text")
        .attr("x", function(d) { return xScale(Math.abs(d.points)) + 5; })
        .attr("y", function(d) { return yScaleInner(d.faction) + (yScaleInner.rangeBand() / 2); })
        .text(function(d) { return d.points; })
        .attr("class", "bar-label");

    // faction name
    bars.append("text")
        .attr("x", 5)
        .attr("y", function(d) { return yScaleInner(d.faction) + (yScaleInner.rangeBand() / 2); })
        .text(function(d) { return d.faction; })
        .attr("class", function(d) { 
            if(d.faction == "darklings" || d.faction == "alchemists") {
                return "bar-label-inverse";
            } else {
                return "bar-label";
            }
        });

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xLeft + ",0)")
        .call(yAxis)
        .selectAll("text");
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