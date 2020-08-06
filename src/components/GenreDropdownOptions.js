import React, { Component } from 'react';
import { connect } from 'react-redux';

class GenreDropdownOptions extends Component {
  constructor(props) {
    super(props);
    this.state = { genreArray: [{ id: 'Loading...', value: 'Loading...' }] };
  }

  handleUserInput = event => {
    // These arguments are passed for the parent form to create a controlled component
    const { rawvalue } = event.target.selectedOptions[0].dataset;
    const { value } = event.target;

    this.props.onChange(value, rawvalue);
  };

  renderGenreOptions() {
    let { genreCodes } = this.props;
    if (genreCodes) {
      return genreCodes.map(option => {
        let { id, name } = option;
        return (
          <option data-rawvalue={id} key={id} value={name} label={name}>
            {name}
          </option>
        );
      });
    } else {
      const { id, value } = this.state;
      return (
        <option data-rawvalue={id} key={id} value={value} label={value}>
          {value}Loading...
        </option>
      );
    }
  }

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
          {this.renderGenreOptions()}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genreDropdownDataSource,
    isFetchingGenres: state.spin.isFetchingGenres
  };
};

export default connect(mapStateToProps)(GenreDropdownOptions);
