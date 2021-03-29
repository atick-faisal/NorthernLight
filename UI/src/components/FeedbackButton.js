import React, { Component } from "react";

class FeedbackButton extends Component {
  render() {
    let borderColor = 'rgba(56, 142, 60, 1)'
    if (this.props.positive === true) {
      borderColor = 'rgba(56, 142, 60, 1)'
    } else {
      borderColor = 'rgba(255, 159, 64, 0.8)';
    }

    let backgroundColor = 'rgba(56, 142, 60, 0.5)'
    if (this.props.condition === 1 && this.props.positive === true) {
      backgroundColor = 'rgba(56, 142, 60, 0.5)'
    } else if (this.props.condition === 0 && this.props.positive === false) {
      backgroundColor = 'rgba(255, 159, 64, 0.4)';
    } else {
        backgroundColor = 'rgba(0, 0, 0, 0)'
    }

    return (
      <div
        className="feedback_button"
        style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
        onClick={() => this.props.onClick(this.props.positive)}>
        {this.props.text}
      </div>
    );
  }
}

export default FeedbackButton;