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

    var dataset = [];
    var scorecards = scope.data;
    var keys = _.keys(scorecards[0].simple);
    for(var i = 0; i < keys.length; i++) { 
        var key = keys[i];
        if(_.contains(scope.ordering, key)) { 
            var obj = {};
            for(var j = 0; j < scorecards.length; j++) { 
                var sc = scorecards[j];
                obj[sc.faction] = sc.simple[key] || 0;
            }
            dataset.push({ key: key, value: obj});
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