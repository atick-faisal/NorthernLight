import React, { Component } from "react";

class HealthCard extends Component {
  render() {
    let color = 'rgba(54, 162, 235, 0.4)';
    if (this.props.status === true) {
      color = 'rgba(54, 162, 235, 0.4)';
    } else {
      color = 'rgba(255, 159, 64, 0.4)';
    }
    return (
      <div className="card health_card">
        <div className="health_icon"><img src={this.props.icon} alt="icon" width="32vw" /></div>
        <div className="health_title"><h3>{this.props.title}</h3></div>
        <div className="health_value" style={{ backgroundColor: color }}><h3>{this.props.value}</h3></div>
      </div>
    );
  }
}

export default HealthCard;