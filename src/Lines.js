import React from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";

import "./index.css";

class Lines extends React.Component {
  state = {
    selected: {}
  };
  componentDidMount() {
    this.svgBars();
  }
  componentDidUpdate() {
    d3.selectAll("#bars > *").remove();
    this.svgBars();
  }
  getArray() {
    const values = this.props.data;
    return values.slice(0, 20);
  }
  decr(pr1, pr2) {
    return pr2 - pr1;
  }
  onWordClick(e) {
    console.log(e);
  }
  svgBars = word => {
    var scale = d3
      .scaleLinear()
      .domain([0, 141356])
      .range([0, 200]);

    const raiz = d3
      .select("#bars")
      .selectAll("div")
      .data(this.getArray())
      .enter()
      .append("div")
      .attr("class", "line-pai");

    const text = raiz
      .append("div")
      .attr("class", "line-text")
      .text(function(d, i) {
        return d.text;
      });

    const line = raiz
      .append("div")
      .attr("class", "line")
      .append("div")
      .attr("class", "dados")
      .style("width", function(d) {
        return scale(d.value) + "px";
      })
      .on("click", (d, i) => {
        // return this.setState({ selected: d.text });
        this.props.selectWord(d);
      })
      .style("font-size", "8px")
      .style("background-color", (d, i) => {
        return !d.select ? "rgba(25,50,87,1)" : "rgba(59,199,95,1)";
      })
      .transition()
      .duration(500)
      .text(function(d, i) {
        return d.value;
      });
  };
  render() {
    return <div id="bars" />;
  }
}
export default Lines;
