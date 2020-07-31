import React, { Component } from 'react';

class Dropdown extends Component {
  handleUserInput = event => {
    // These arguments are passed for the parent form to create a controlled component
    const { rawvalue } = event.target.selectedOptions[0].dataset;
    const { value } = event.target;

    this.props.onChange(value, rawvalue);
  };

  render() {
    return (
      <div className="field">
        <label>{this.props.labeltext}</label>
        <select
          name={this.props.inputtype}
          className="ui dropdown"
          value={this.props.value}
          onChange={this.handleUserInput}
        >
          {this.props.children}
        </select>
      </div>
    );
  }
}

export default Dropdown;
