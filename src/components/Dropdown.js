import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGenreCodes } from '../actions';
import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

class Dropdown extends Component {
  handleUserInput = event => {
    const { rawvalue } = event.target.selectedOptions[0].dataset;
    const { value } = event.target;
    this.props.onChange(value, rawvalue);
  };

  renderDropDown(inputType) {
    //* This function will render the various dropdown menus

    // Creates an indexed array for ratings.
    // TMDB expects an integer
    const ratingArray = Array.from(new Array(10), (i, index) => index + 1);

    if (inputType === yearFromInput) {
      return this.props.yearArray.map(year => {
        return <option data-rawvalue={year} key={year} value={year} label={year} />;
      });
    }

    if (inputType === yearToInput) {
      return this.props.yearArray.map(year => {
        return <option data-rawvalue={year} key={year} value={year} label={year} />;
      });
    }
    if (inputType === minimumRatingInput) {
      return ratingArray.map(rating => {
        const displayRating = rating * 10;
        const displayRatingLabel = `${displayRating}%`;

        return (
          <option
            data-rawvalue={rating}
            key={displayRating}
            value={rating}
            label={displayRatingLabel}
          />
        );
      });
    }
    if (inputType === genreInput && this.props.genreCodes) {
      return this.props.genreCodes.map(genre => {
        return (
          <option
            data-rawvalue={genre.id}
            key={genre.id}
            label={genre.name}
            value={genre.name}
          ></option>
        );
      });
    }
  }

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
          {this.renderDropDown(this.props.inputtype)}
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
