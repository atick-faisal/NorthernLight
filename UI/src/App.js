import React, { Component } from 'react';
import BarPlot from './components/BarPlot';
import './App.css';

// pooling interval of serial data
// lower this value to get faster refresh rate
const interval = 1000;

class App extends Component {
  constructor() {
		super();
		this.state = {
			values: []
		}
	}

	// when component is mounted reset the timer
	componentWillUnmount() {
		clearInterval(this.timer);
		this.timer = null;
	  }

	componentDidMount() {
		this.timer = setInterval(() => this.getValues(), interval);
	}

	// fetch values from the server
	// it is hosted at http://localhost:3500/values
	getValues() {
		fetch('/api/northernlight/')
		.then(res => res.json())
		.then(values => {
			values.reverse();
			this.setState({values}, function() {
				// console.log('values fetched...', values.map(value => value.time));
			})}
		);
  	}

  
  	render() {
		let color = ['rgba(56, 142, 60,1.0)'];
		// setting the color (red/green) for the digital values
		for(let i = 0; i < 14; i++) {
			if(true) {
				color[i] = 'rgba(56, 142, 60, 0.5)';
			} else {
				color[i] = 'rgba(216, 67, 21, 0.5)';
			}
		}

		let temp = this.state.values.map(value => value.temp);
		let hum = this.state.values.map(value => value.hum);
		let light = this.state.values.map(value => value.light);
		let time = this.state.values.map(value => value.time);

		return(
		<div className="App">
			<div className="container">
				<h1>Arduino Serial Monitor</h1>
				<div className="card_container">
					<BarPlot time = {time} values = {temp} title = {'Temperature'}/>
					<BarPlot time = {time} values = {hum} title = {'Humidity'}/>
					<BarPlot time = {time} values = {light} title = {'Light'}/>
				</div>
				<div className="card_container">
					<BarPlot time = {time} values = {this.state.values.map(value => value.a3)} title = {3}/>
					<BarPlot time = {time} values = {this.state.values.map(value => value.a4)} title = {4}/>
					<BarPlot time = {time} values = {this.state.values.map(value => value.a5)} title = {5}/>
				</div>
				<div className="card_container">
					<div className="card" style={{ backgroundColor: color[0]}}>
						<p><b>D0</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[1]}}>
						<p><b>D1</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[2]}}>
						<p><b>D2</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[3]}}>
						<p><b>D3</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[4]}}>
						<p><b>D4</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[5]}}>
						<p><b>D5</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[6]}}>
						<p><b>D6</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[7]}}>
						<p><b>D7</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[8]}}>
						<p><b>D8</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[9]}}>
						<p><b>D9</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[10]}}>
						<p><b>D10</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[11]}}>
						<p><b>D11</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[12]}}>
						<p><b>D12</b></p>
					</div>
					<div className="card" style={{ backgroundColor: color[13]}}>
						<p><b>D13</b></p>
					</div>
				</div>
			</div>
		</div> );
  	}
}

export default App;