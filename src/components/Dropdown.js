import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGenreCodes } from '../actions';

class Dropdown extends Component {
  handleUserInput = event => {
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

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genreCodes,
    fullState: state
  };
};

export default connect(mapStateToProps, { getGenreCodes })(Dropdown);
