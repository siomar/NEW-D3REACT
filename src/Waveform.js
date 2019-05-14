import React from 'react';
import * as d3 from 'd3';
import { scaleLinear } from "d3-scale";

import './index.css';
import { thresholdFreedmanDiaconis } from 'd3-array';

var customData = require('./json/data2.json');

class Waveform extends React.Component {
    state = {
        seleted: {}
    };
    componentDidMount() {
        var width = 860,
            height = 350,
            radius = Math.min(width, height) / 2;

        var svg = d3.select('#circle')
            .append("svg")
            .append("g");

        svg.append("g")
            .attr("class", "slices");
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");
        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var pie = d3.pie()
            .sort(null)
            .value(function (d) {
                return d.confidence;
            });

        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);
        var outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

        var key = function (d) { return d.data.desc_topic;};

        var color = d3.scaleOrdinal()
            .range([ "#2276BC", "#FFF6E5", "#193257","#1D5C87","#3F464C", "#2186C4", "#7ECEFC"]);

        change(this.props.data);

        // d3.select("path").on("click", function () {
        //     alert();
        //     // change(randomData());
        // });
        
        function change(data) {
            /* ------- PIE SLICES -------*/
            var slice = svg.select(".slices").selectAll("path.slice")
                .data(pie(data), key);
            slice.enter()
                .insert("path")
                .attr("id", function(d){
                    return d.data.id;
                })
                .on('click',(d) => {
                    // this.state.setState({ seleted : d});
                    // console.log(this.state.seleted);
                    var path = svg;
                    var lines = svg;
                    var labels = svg;
                    
                    let line = lines.select(".lines").selectAll("polyline").classed("opacityPath");
                    lines.select(".lines").selectAll("polyline").classed("opacityPath", !line);

                    let label = labels.select(".labels").selectAll("text").classed("opacityPath");
                    labels.select(".labels").selectAll("text").classed("opacityPath", !label);

                    let paths = path.select(".slices").selectAll("path").classed("opacityPath");
                    path.select(".slices").selectAll("path").classed("opacityPath", !paths);

                    document.getElementById(d.data.id).classList.remove("opacityPath");

                    var element = document.getElementsByClassName(d.data.id);
                    for (var i = 0; i < element.length; i++) {
                        element[i].classList.remove("opacityPath");
                    }
                })
                .style("fill", function (d) { return color(d.data.desc_topic); })
                .attr("class", "slice").transition().duration(1000).attrTween("d", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        return arc(interpolate(t));
                    };
                })

            slice.exit()
                .remove();

            /* ------- TEXT LABELS -------*/

            var text = svg.select(".labels").selectAll("text")
                .data(pie(data), key);

            function midAngle(d) {
                return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }
            text.enter()
                .append("text")
                .attr("dy", ".35em")
                .attr("class", function(d){
                    return d.data.id;
                })
                .text(function (d) {
                    return d.data.desc_topic+ " " +(d.data.confidence * 10).toFixed(2) + "%"; 
                }).transition().duration(1000)
                .attrTween("transform", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                        return "translate(" + pos + ")";
                    };
                })
                .styleTween("text-anchor", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        var d2 = interpolate(t);
                        return midAngle(d2) < Math.PI ? "start" : "end";
                    };
                });

            text.exit()
                .remove();

            /* ------- SLICE TO TEXT POLYLINES -------*/

            var polyline = svg.select(".lines").selectAll("polyline")
                .data(pie(data), key)
                .enter()
                .append("polyline")
                .attr("class", function(d){
                    return d.data.id;
                })
                .transition().duration(1000)
                .attrTween("points", function (d) {
                    this._current = this._current || d;
                    var interpolate = d3.interpolate(this._current, d);
                    this._current = interpolate(0);
                    return function (t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                    };
                });
        };
    }
    render() {
        return (
            <div id="circle"></div>
        )
    }
}
export default Waveform