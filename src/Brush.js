
import React from "react";
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

var donutData = require("./json/dataLines.json");

class BrushGraphic extends React.Component {
    constructor() {
        super()
        // this.state = {data: [["Jan", 4], ["Feb", 2], ["Mar", 10], ["Apr", 5], ["May", 3], ["Jun", 8], ["Jul", 4]]}
        // this.state = {data:[
        //     {"name":"Workout", "data": {"2017-01": 3, "2017-01": 4, "2017-03": 2, "2018-01": 3}},
        //     {"name":"Call parents", "data": {"2017-01": 5, "2017-01": 3, "2017-03": 2, "2017-04": 3}}
        //   ]
        // };
        this.state={data:donutData};
        
      }
      componentDidMount() {
        const boom = () => this.setState({data: [...this.state.data, ["Aug", 10]], download: true, id: "chart-99"})
        setTimeout(boom, 1000)
      }
      render() {
        return (
          <div>
            <LineChart data={this.state.data} height="500px" min={100} max={1000}/>
          </div>
        )
      }
}
export default BrushGraphic;