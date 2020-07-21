import React from 'react';
import { connect } from 'react-redux';
import Dropdown from './Dropdown';

import {
  getGenreCodes,
  submitSpin,
  addToWatchlist,
  spinningStarted,
  spinningCompleted
} from '../actions';

import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

class SpinForm extends React.Component {
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
      genreCode: ''
    };
  }

  componentDidMount() {
    /** Since genre codes change over time, we need to make a network
     * call to make sure we have the correct genre codes.
     * This is going to be used in our <Dropdown> component, but we don't want to call it within the
     * component itself because it is not necessary to populate every dropdown component.
     * Better to just pass it to our Redux store here to avoid unecessary network calls.
     */

    this.props.getGenreCodes();
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

  // Will update component state based on user input

  handleUserInput = (event, inputType) => {
    const { target } = event;

    if (inputType === yearFromInput) {
      this.setState({ yearFrom: event });
    }

    if (inputType === yearToInput) {
      this.setState({ yearTo: event });
    }

    if (inputType === minimumRatingInput) {
      this.setState({ minimumRating: event });
    }

    if (inputType === genreInput) {
      // We need these variables to get the text of the label in order to set the state
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].label;

      this.setState({ genreCode: target.value, genreName: label });
    }
  };

  // Handle the spin
  // Some of these will use actions
  handleSpin = event => {
    this.props.spinningStarted();
    event.preventDefault();

    this.setState({ watchListIsUpdated: false });
    let { yearFrom, yearTo, minimumRating, genreCode } = this.state;

    let submissionObject = {
      yearFrom: yearFrom,
      yearTo: yearTo,
      minimumRating: minimumRating,
      genreCode: genreCode
    };

    this.props.submitSpin(submissionObject).then(this.props.spinningCompleted);
  };

  renderSpinForm() {
    return (
      <div className="ui segment">
        <form className="ui large form error" onSubmit={event => this.handleSpin(event)}>
          <h2 className="ui teal image header">
            <div className="content">Find a movie!(SpinForm render)</div>
          </h2>
          <div className="fields">
            <Dropdown
              inputtype={yearFromInput}
              labeltext="From"
              yearArray={this.state.yearArray}
              value={this.state.yearFrom}
              onChange={event => {
                this.handleUserInput(event, yearFromInput);
              }}
            />
            <Dropdown
              inputtype={yearToInput}
              labeltext="To ren"
              yearArray={this.state.yearArray}
              value={this.state.yearTo}
              onChange={event => {
                this.handleUserInput(event, yearToInput);
              }}
            />
            <Dropdown
              inputtype={minimumRatingInput}
              labeltext="Minimum Rating"
              value={this.state.minimumRating}
              onChange={event => {
                this.handleUserInput(event, minimumRatingInput);
              }}
            />
            <Dropdown
              inputtype={genreInput}
              labeltext="Genre"
              genreCodes={this.props.genreCodes}
              value={this.state.genreName}
              onChange={event => {
                this.handleUserInput(event, genreInput);
              }}
            />
            <div className="ui basic segment"></div>
          </div>
          <button className="ui fluid large teal submit button">Spin!</button>
        </form>
      </div>
    );
  }

  renderDropDown(inputType) {
    // This function will render the various dropdown menus

    // Creates an indexed array for ratings.
    // TMDB expects an integer that is not zero indexed
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
      return this.props.genreCodes.map(genre => {
        return <option key={genre.name} label={genre.name} value={genre.id}></option>;
      });
    }
  }

  render() {
    return <div>{this.renderSpinForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genreDropdownDataSource,
    selectedMovie: state.spin.selectedMovie,
    isLoggedIn: state.session.isLoggedIn,
    watchListResponseStatus: state.spin.watchListResponse.status,
    isSpinning: state.spin.isSpinning,
    currentState: state
  };
};

export default connect(mapStateToProps, {
  getGenreCodes,
  submitSpin,
  addToWatchlist,
  spinningStarted,
  spinningCompleted
})(SpinForm);
