import React, { Component } from 'react';
import BarPlot from './components/BarPlot';
import LinePlot from './components/LinePlot';
import HealthCard from './components/HealthCard';
import FeedbackButton from './components/FeedbackButton';
import ControlElement from './components/ControlElement';
import bpIcon from './assets/bp.svg'
import calIcon from './assets/calories.svg'
import heartIcon from './assets/heart.svg'
import stepsIcon from './assets/steps.svg'
import logo from './assets/logo.png'
import './App.css';

// pooling interval of serial data
// lower this value to get faster refresh rate
const interval = 5000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      values: [],
      devices: [],
      time: '',
      condition: 666
    };

    this.handleDeviceClick = this.handleDeviceClick.bind(this);
    this.handleFeedbackClick = this.handleFeedbackClick.bind(this);
  }

  // when component is mounted reset the timer
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getValues(), interval);
  }

  getValues() {
    fetch('/api/status/')
      .then(res => res.json())
      .then(values => {
        values.reverse();
        this.setState({
          values: values,
          time: values[values.length - 1].time.substring(11, 16)
        }, function () {
          // console.log('values fetched...', values.map(value => value.time));
        })
      }
      );

    fetch('/api/devices/')
      .then(res => res.json())
      .then(devices => {
        this.setState({
          devices: devices
        }, function () {
          // console.log('values fetched...', values.map(value => value.time));
        })
      }
      );
  }

  patchDevice(port, state) {
    fetch(`/api/devices/${port}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"state": state})
    })
      .then(res => res.json());
  }

  handleDeviceClick(port, state) {
    let devices = this.state.devices;
    let newState = !state;
    devices.map(device => {
      if (device.port === port) {
        device.state = newState;
      }
      return 0;
    })
    this.setState({
      devices: devices
    })
    this.patchDevice(port, newState);
  }

  handleFeedbackClick(positive) {
    if (positive) {
      this.setState({
        condition: 1
      })
    } else {
      this.setState({
        condition: 0
      })
    }
  }

  createXLabels(xAxes, isTimestamp = false) {
    let len = xAxes.length;
    let labels = [];
    for (let i = 0; i < len; i++) {
      if (isTimestamp) labels[i] = xAxes[i].substring(11, 16);
      else labels[i] = xAxes[i];
    }
    return labels;
  }


  render() {
    let temp = this.state.values.map(value => value.temp);
    let hum = this.state.values.map(value => value.hum);
    let light = this.state.values.map(value => value.light);
    let time = this.state.values.map(value => value.time);
    let anomaly = this.state.values.map(value => value.anomaly);
    let anomalous = anomaly[anomaly.length - 1]
    let normal = 100 - anomalous;

    return (
      <div className="App">
        <div className="container">
          <img className="logo" src={logo} alt="logo" width="60vw" />
          <p>Northern Light</p>
          <div className="topbar"><h1>User Dashboard</h1></div>
          <div className="card_container">
            <div className="card">
              <div className="card_container_vertical">
                <div className="control_title">Control Panel</div><br></br>
                <div className="current_time">{this.state.time}</div>
                <div className="last_updated"><p>Last Updated</p></div><br></br>
                {this.state.devices.map((device) =>
                  <ControlElement
                    port={device.port}
                    name={device.name}
                    state={device.state}
                    onClick={this.handleDeviceClick} />)}
              </div>
            </div>
            <div className="card_container_vertical">
              <HealthCard icon={calIcon} title={'Calories'} value={1600} status={true} />
              <HealthCard icon={heartIcon} title={'Heart Rate'} value={100} status={false} />
              <HealthCard icon={bpIcon} title={'Blood Pressure'} value={'80/120'} status={true} />
              <HealthCard icon={stepsIcon} title={'Step Count'} value={8124} status={true} />
              <HealthCard icon={stepsIcon} title={'Step Count'} value={8124} status={true} />
            </div>
            <div className="card">
              <h3>Behaviour Analysis</h3>
              <BarPlot xLabels={['Normal', 'Anomalous']} values={[normal, anomalous]} height={160} min={0} max={100} />
              <h4>How are you feeling today?</h4>
              <FeedbackButton
                text={'Great / Usual'}
                positive={true}
                condition={this.state.condition}
                onClick={this.handleFeedbackClick} />
              <FeedbackButton
                text={'Not So Great / Bad'}
                positive={false}
                condition={this.state.condition}
                onClick={this.handleFeedbackClick} />
            </div>
          </div>
          <div className="card_container">
            <div className="card">
              <h3>Temperature | Light</h3>
              <LinePlot xLabels={this.createXLabels(time, true)} datasets={[temp, light]} labels={['Temperature', 'Light']} />
            </div>
            <div className="card">
              <h3>{'Temperature: ' + temp[temp.length - 1]}</h3>
              <BarPlot xLabels={this.createXLabels(time, true)} values={temp} title={'Temperature'} dispY={true} />
            </div>
          </div>
          <div className="card_container">
            <div className="card">
              <h3>{'Humidity: ' + hum[hum.length - 1]}</h3>
              <BarPlot xLabels={this.createXLabels(time, true)} values={hum} title={'Humidity'} dispY={true} />
            </div>
            <div className="card">
              <h3>Temperature | Humidity | Light</h3>
              <LinePlot xLabels={this.createXLabels(time, true)} datasets={[temp, hum, light]} labels={['Temperature', 'Humidity', 'Light']} />
            </div>
          </div>
        </div>
        <footer>
          <a href="https://github.com/atick-faisal/Sensor-Dashboard">Documentation</a>
					&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;
					<a href="https://github.com/atick-faisal/Sensor-Dashboard/blob/master/api_reference.md">Reference</a>
          <p>&copy; Atick Faisal, 2021</p>
        </footer>
      </div>
    );
  }
}

export default App;