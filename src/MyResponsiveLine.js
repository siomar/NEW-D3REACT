import { ResponsiveLine } from '@nivo/line'

import React, { Component } from 'react';

var data = require("./json/teste.json");

class MyResponsiveLine extends Component {
  state = {
    dados: data.chart_data,
    max: 1000
  };
  selectLineLegend = (point, event) => {
    if (this.state.dados.length > 1) {
      if (point !== undefined) {
        console.log(point)
        const estado = this.state.dados;
        let maior = 0;
        const filtro = estado.filter(item => item.id === point.id);
        for (const key in filtro) {
          const data = filtro[key].data;
          for (const i in data) {
            if (key === 0) {
              maior = data[i].y;
            }
            if (data[i].y > maior) {
              maior = data[i].y;
              console.log(maior)
            }
          }
        }
        
        console.log(point)
        this.setState({ max:maior, dados: filtro });
      }
    } else {
      this.setState({ max:1000, dados: data.chart_data });
    }
  };
  selectLine = (point, event) => {
    if (this.state.dados.length > 1) {
      if (point !== undefined) {
        console.log(point)
        const estado = this.state.dados;
        let maior = 0;
        const filtro = estado.filter(item => item.id === point.serieId);
        for (const key in filtro) {
          const data = filtro[key].data;
          for (const i in data) {
            if (key === 0) {
              maior = data[i].y;
            }
            if (data[i].y > maior) {
              maior = data[i].y;
              console.log(maior)
            }
          }
        }
        
        console.log(point)
        this.setState({ max:maior, dados: filtro });
      }
    } else {
      this.setState({ max:1000, dados: data.chart_data });
    }
  };
  getMax = () => {
    // if (this.state.dados.length > 1) {
    //   return 1000;
    // }else{
    //   const dados = this.state.dados.data;
    //   for (const key in dados) {
    //     console.log(dados[key])
    //   }
    //   return 1000;
    // }
    return 1000;
  }
  render() {
    return (<ResponsiveLine
      data={this.state.dados}
      colors={{"scheme":"red_blue"}}
      keys={['words']}
      margin={{ top: 20, right: 320, bottom: 50, left: 60 }}
      curve='monotoneX'
      animate={true}
      motionStiffness={90}
      lineWidth={3}
      enablePoints={false}
      enablePointLabel={true}
      enableGridX={false}
      enableGridY={true}
      yScale={{ type: 'linear', min: 0, max: this.state.max }}

      axisBottom={{
        tickValues: 5,
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 9,
        tickRotation: 45
      }}
      legends={[{
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        onClick: this.selectLineLegend,
        justify: true,
        translateX: 280,
        translateY: 40,
        itemWidth: 200,
        symbolSize: 10,
        itemsSpacing: 10,
        itemHeight: 20,
        justify: true,
        itemDirection: 'left-to-right',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }]}
      isInteractive={true}
      useMesh={true}
      debugMesh={false}
      onClick={this.selectLine}
    />
    )
  }
}

export default MyResponsiveLine;