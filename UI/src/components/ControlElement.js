import React, { Component } from "react";

class ControlElement extends Component {
  render() {
    let color = 'rgba(56, 142, 60, 0.5)'
    if (this.props.state === true) {
      color = 'rgba(56, 142, 60, 0.5)'
    } else {
      color = 'rgba(216, 67, 21, 0.5)';
    }
    return (
      <div
        className="card control_element"
        style={{ backgroundColor: color }}
        onClick={() => this.props.onClick(this.props.port, this.props.state)}>
        {this.props.name} : {this.props.state ? 'ON' : 'OFF'}
      </div>
    );
  }
}

export default ControlElement;