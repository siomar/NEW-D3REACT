import React from "react";
import * as d3 from "d3";
import { scaleLinear } from "d3-scale";
// import { render } from 'react-dom';
import WordCloud from "react-d3-cloud";

import "./index.css";

class Word extends React.Component {
  state = {
    selected: ""
  };
  onWordClick(e) {
    if (e.text == this.state.selected) {
      this.props.selectWord(null);
    } else {
      this.props.selectWord(e);
    }
    d3.select("#word")
      .selectAll("text")
      .style("opacity", "1");
    if (this.state.selected != e.text) {
      d3.select("#word")
        .selectAll("text")
        .filter(function() {
          if (d3.select(this).text() != e.text) {
            return true;
          }
          if (d3.select(this).text() == e.text) {
            return false;
          }
        })
        .style("opacity", "0.1");
    } else {
      d3.select("#word")
        .selectAll("text")
        .style("opacity", "1");
    }
    // this.props.selectWord(e);
    this.setState({ selected: e.text });
  }
  seleteWord = e => {
    d3.select("#word")
      .selectAll("text")
      .filter(function() {
        if (d3.select(this).text() != e.text) {
          return true;
        }
        if (d3.select(this).text() == e.text) {
          return false;
        }
      })
      .style("opacity", "0.1");
  };
  shouldComponentUpdate(nextProps, nextState) {
    const data = this.props.data.filter(item => item.select == true);
    this.seleteWord(data[0]);
    return false;
  }
  render() {
    const data = this.props.data;
    const fontSizeMapper = word => {
      return (word.value / data[0].value) * 100;
    };
    const rotate = word => {
      const result = word.value % 360;
      if (result < 270 && result > 90) {
        return result - 180;
      }
      return result;
    };
    return (
      <div id="word">
        <WordCloud
          font="Open Sans"
          data={data}
          width={700}
          rotate={rotate}
          fontSizeMapper={fontSizeMapper}
          onWordClick={word => this.onWordClick(word)}
        />
      </div>
    );
  }
}
export default Word;
