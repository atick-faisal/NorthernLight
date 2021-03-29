import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class LinePlot extends Component {

  getHeight() {
    if (this.props.height === undefined) {
      return 220
    }
    else {
      return this.props.height
    }
  }

  getDataset() {
    // background colors for the bars
    let backgroundColor = [
      'rgba(54, 162, 235, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ];
    // border colors for the bars
    let borderColor = [
      'rgba(54, 162, 235, 0.7)',
      'rgba(75, 192, 192, 0.7)',
      'rgba(153, 102, 255, 0.7)'
    ];

    if (this.props.datasets.length === 1) {
      return [
        {
          type: 'line',
          label: this.props.labels[0],
          data: this.props.datasets[0],
          borderColor: borderColor[0],
          backgroundColor: backgroundColor[0],
          borderWidth: 2
        }]
    }
    else if (this.props.datasets.length === 2) {
      return [
        {
          type: 'line',
          label: this.props.labels[0],
          data: this.props.datasets[0],
          borderColor: borderColor[0],
          backgroundColor: backgroundColor[0],
          borderWidth: 2
        },
        {
          type: 'line',
          label: this.props.labels[1],
          data: this.props.datasets[1],
          borderColor: borderColor[1],
          backgroundColor: backgroundColor[1],
          borderWidth: 2
        }]
    } else if (this.props.datasets.length === 3) {
      return [
        {
          type: 'line',
          label: this.props.labels[0],
          data: this.props.datasets[0],
          borderColor: borderColor[0],
          backgroundColor: backgroundColor[0],
          borderWidth: 2
        },
        {
          type: 'line',
          label: this.props.labels[1],
          data: this.props.datasets[1],
          borderColor: borderColor[1],
          backgroundColor: backgroundColor[1],
          borderWidth: 2
        },
        {
          type: 'line',
          label: this.props.labels[2],
          data: this.props.datasets[2],
          borderColor: borderColor[2],
          backgroundColor: backgroundColor[2],
          borderWidth: 2
        },
      ]
    }
  }

  render() {
    return (
      <div className="chart" height="600px">
        <Line data={{
          labels: this.props.xLabels,
          datasets: this.getDataset()
        }}
          height={this.getHeight()}
          options={{
            responsive: true,
            responsiveAnimationDuration: 400,
            maintainAspectRatio: false,
            legend: {
              display: true
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
                  min: 10,
                  max: 100,
                  fontColor: "#999"
                },
              }],
            }
          }} />
      </div>
    )
  }
}

export default LinePlot;