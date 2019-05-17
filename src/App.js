import React, { Component } from "react";
import * as d3 from "d3";
import { ResponsiveLine } from '@nivo/line'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import "./App.css";

import Waveform from "./Waveform";
import Word from "./Word";
import Lines from "./Lines";
import BrushGraphic from "./BrushD3";
import MyResponsiveLine from "./MyResponsiveLine";

var words = require("./json/words.json");
var donutData = require("./json/data2.json");
var data = require("./json/teste.json");

class App extends Component {
  state = {
    words: this.getArray(),
    canvas: ''
  };
  componentDidMount() { }
  getArray() {
    return words.map(function (item, i) {
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
  gerarPDF = () => {
    html2canvas(document.body).then((canvas) => {

      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);
      // this.setState({...this.state,canvas:imgData});
      const pdf = new jsPDF("p", "mm", "a4");
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save("download.pdf");
    }, this);
  }
  render() {
    const { words } = this.state;
    console.log(data);
    return (
      <div className="App">
        
        <button onClick={e => this.gerarPDF()}>Gerar PDF</button>

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
        {/* <BrushGraphic/> */}
        <br />
        <div className="chart"><MyResponsiveLine data={data} /></div>
      </div>
    );
  }
}

export default App;
