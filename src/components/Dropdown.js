import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGenreCodes } from '../actions';
import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const yearArray = this.generateYearArray();

    this.state = {
      // An array of years used to populate dropdown menu
      yearArray,

      // A default "yearFrom" set to 1955, since people are probably not going
      // To be wanding to look much earlier than that
      // This will be used to manage to make the dropdown a controlled component
      yearFrom: yearArray[35],

      // A default "yearTo", set at the current year
      // This will be used to manage to make the dropdown a controlled component
      yearTo: yearArray[yearArray.length - 1],

      minimumRating: 0,

      // The title of the currently selected genre
      genreName: '',

      // The code of the currently selected genre (used for our network request)
      genreCode: '',

      labelText: '',

      genreCodes: []
    };
  }

  generateYearArray() {
    // Creates an array of genres in order to populate the dropdown lists
    let currentYear = new Date().getFullYear();
    let firstYear = 1920;
    let years = [];

    for (let i = firstYear; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }

  handleUserInput = () => event => {
    const { target } = event;

    if (this.props.inputtype === yearFromInput) {
      this.setState({ yearFrom: target.value });
    }

    if (this.props.inputtype === yearToInput) {
      this.setState({ yearTo: target.value });
    }

    if (this.props.inputtype === minimumRatingInput) {
      this.setState({ minimumRating: target.value });
    }

    if (this.props.inputtype === genreInput) {
      // We need these variables to get the text of the label in order to set the state
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].label;

      this.setState({ genreCode: target.value, genreName: label });
    }
  };

  renderDropDown(inputType) {
    // This function will render the various dropdown menus

    // Creates an indexed array for ratings.
    // TMDB expects an integer
    const ratingArray = Array.from(new Array(10), (i, index) => index + 1);

    if (inputType === yearFromInput) {
      return this.state.yearArray.map(year => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      });
    }

    if (inputType === yearToInput) {
      return this.state.yearArray.map(year => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      });
    }
    if (inputType === minimumRatingInput) {
      return ratingArray.map(rating => {
        let displayRating = rating * 10;

        return (
          <option key={displayRating} value={rating}>
            {displayRating}%
          </option>
        );
      });
    }
    if (inputType === genreInput && this.props.genreCodes) {
      //   let newGenreCodeArray = this.props.genreCodes;
      //   newGenreCodeArray.unshift({ id: 'selectGenre', name: 'Select Genre' });

      return this.props.genreCodes.map(genre => {
        return <option key={genre.name} label={genre.name} value={genre.id}></option>;
      });
    }
  }

  render() {
    console.log('full state', this.props.fullState);

    return (
      <div className="field">
        <label>{this.props.labeltext}</label>
        <select
          name={this.props.inputtype}
          className="ui dropdown"
          value={this.state.yearFrom}
          onChange={this.handleUserInput(this.props.inputtype)}
        >
          {this.renderDropDown(this.props.inputtype)}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genres,
    fullState: state
  };
};

export default connect(mapStateToProps, { getGenreCodes })(Dropdown);
