import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

class BarPlot extends Component {

  getHeight() {
    if (this.props.height === undefined) {
      return 220
    }
    else {
      return this.props.height
    }
  }

  render() {
    // background colors for the bars
    let backgroundColor = [
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ];
    // border colors for the bars
    let borderColor = [
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(255, 99, 132, 0.7)',
      'rgba(54, 162, 235, 0.7)',
      'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)',
      'rgba(255, 159, 64, 0.7)'
    ];
    return (
      <div className="chart" height="600px">
        <Bar data={{
          labels: this.props.xLabels,
          datasets: [
            // uncomment this to get a line chart
            // ---------------------------------------------//
            // {
            //     type: 'line',
            //     label: 'null',
            //     data: this.props.values,
            //     borderColor: 'rgba(2, 136, 209, 0.5)',
            //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //     borderWidth: 2
            // }, 
            //-----------------------------------------------//
            {
              type: 'bar',
              label: this.props.title,
              data: this.props.values,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1
            }
          ]
        }}
          height={this.getHeight()}
          options={{
            responsive: true,
            responsiveAnimationDuration: 400,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display: false,
                  color: "#666"
                },
                ticks: {
                  fontColor: "#999"
                },
              }],
              yAxes: [{
                gridLines: {
                  display: false,
                  color: "#666"
                },
                ticks: {
                  display: this.props.dispY,
                  min: this.props.min,
                  max: this.props.max,
                  fontColor: "#999"
                },
              }],
            }
          }} />
      </div>
    )
  }
}

export default BarPlot;