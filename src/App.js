import React, { Component } from "react";
import * as d3 from "d3";

import "./App.css";

import Waveform from "./Waveform";
import Word from "./Word";
import Lines from "./Lines";
import BrushGraphic from "./Brush";

var words = require("./json/words.json");
var donutData = require("./json/data2.json");

class App extends Component {
  state = {
    words: this.getArray()
  };
  componentDidMount() {}
  getArray() {
    return words.map(function(item, i) {
      item.select = false;
      return item;
    });
  }
  wordSelect = e => {
    if (e != null) {
      const words = this.getArray();
      const dados = words.map(item => {
        if (item.text == e.text) {
          item.select = true;
        }
        return item;
      });
      this.setState({ words: dados });
    } else {
      this.setState({ words: this.getArray() });
    }
  };
  render() {
    const { words } = this.state;
    return (
      <div className="App">
        <Waveform data={donutData} />
        <div className="d-flex">
          <Word
            data={words}
            selectWord={e => this.wordSelect(e)}
            selected={this.state.selected}
          />
          <Lines
            data={words}
            className="w-100"
            selectWord={e => this.wordSelect(e)}
            selected={this.state.selected}
          />
          
          
        </div>
        <BrushGraphic/>
      </div>
    );
  }
}

export default App;
