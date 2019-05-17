
import React from "react";
import { Line } from 'react-chartjs-2';

var donutData = require("./json/dataLines.json");

class BrushGraphic extends React.Component {
clickLine = () =>{
  alert();
}
      render() {
        const data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              fill: false,
              lineTension: 0.1,
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40],
            }, {
              label: 'My First dataset',
              fill: false,
              data: [45, 59, 56, 78, 23, 55, 40],
            }
          ]
        };
        return (
          <Line data={data} getElementAtEvent={ (elems) => {console.log(elems);}} onElementsClick={elems => {
            // if required to build the URL, you can 
            // get datasetIndex and value index from an `elem`:
            // console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
            // and then redirect to the target page:
        }} />
        )
      }
}
export default BrushGraphic;