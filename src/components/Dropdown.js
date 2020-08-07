import React, { Component } from 'react';

class Dropdown extends Component {
  handleUserInput = event => {
    // These arguments are passed to the parent form in order to create a controlled component

    // This is going to give us more useful information than event.value
    // e.g. the genre code instead of the genre name
    const { rawvalue } = event.target.selectedOptions[0].dataset;

    // This is going to give us the actual data from the selected itself.
    const { value } = event.target;

    this.props.onChange(value, rawvalue);
  };

  render() {
    return (
      <div className="field">
        <label>{this.props.labeltext}</label>
        <select
          name={this.props.inputtype}
          className="ui simple dropdown"
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
