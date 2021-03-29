import React, { Component } from 'react';
import { Scatter } from 'react-chartjs-2';

class ScatterPlot extends Component {

    // // create the x-axis labels
    // createlabels() {
	// 	let len = this.props.values.length;
	// 	let labels = [];
	// 	for(let i = 0; i < len; i++) {
	// 		labels[i] = this.props.time[i].substring(11, 16);
	// 	}
	// 	return labels;
	// }

    getHeight() {
        if (this.props.height === undefined) {
            return 300
        }
        else {
            return this.props.height
        }
    }

    render() {
        return(
            <div className="chart" height="600px">
                <Scatter data = {{
                    // labels: this.createlabels(),
                    datasets: [
                    {
                        label: 'Normal',
                        data: this.props.normal,
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderWidth: 1,
                        radius: 6
                    },
                    {
                        label: 'Anomalous',
                        data: this.props.anomalous,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderWidth: 1,
                        radius: 6
                    },
                ]}}
                height={this.getHeight()}
                options = {{
                    responsive: true,
                    responsiveAnimationDuration: 400,
                    maintainAspectRatio: false,
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            fontColor: 'rgb(255, 255, 255)'
                        }
                    },
                    scales: {
                        xAxes: [{ 
                            gridLines: {
                                display: false,
                                color: "#666"
                            },
                            ticks: {
                                display: false,
                                fontColor: "#999"
                            },
                        }],
                        yAxes: [{
                            gridLines: {
                                display: false,
                                color: "#666"
                            },
                            ticks: {
                                display: false,
                                fontColor: "#999"
                                },
                        }],
                    }
                }}/>
            </div>
        )
    }
}

export default ScatterPlot;