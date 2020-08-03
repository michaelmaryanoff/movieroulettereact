import React from 'react';
import { connect } from 'react-redux';
import { generateYearArray, generateRatingArray } from '../utils';

import {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
} from '../actions';

import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

import Dropdown from './Dropdown';
import DropdownOptions from './DropdownOptions';

class SpinForm extends React.Component {
  constructor(props) {
    super(props);
    const yearArray = generateYearArray();
    const ratingsArray = generateRatingArray();
    const genreArray = this.generateGenreArray();

    this.state = {
      // These arrays are used to populate dropdown menu
      yearArray,
      ratingsArray,
      genreArray,

      // A default "yearFrom" set to 1955, since people are probably not going
      // to looking for a movie much earlier than that.
      // This will be used to to make the dropdown a controlled component.
      yearFrom: yearArray[35].value,

      // A default "yearTo", set at the current year
      // This will be used to to make the dropdown a controlled component.
      yearTo: yearArray[yearArray.length - 1].value,

      minimumRating: 0,

      minimumRatingDisplay: '10%',

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

  generateGenreArray() {
    return this.props.genreCodes
      ? this.props.genreCodes.map(genre => ({ id: genre.id, value: genre.name }))
      : [];
  }

  // Handle the spin
  // Some of these will use actions
  handleSpin = event => {
    event.preventDefault();

    this.props.spinningStarted();
    this.props.resetWatchlistUpdateStatus();

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

  // Will update component state based on user input
  handleUserInput = (event, inputType, id) => {
    switch (inputType) {
      case yearFromInput:
        return this.setState({ yearFrom: event });
      case yearToInput:
        return this.setState({ yearTo: event });
      case minimumRatingInput:
        return this.setState({ minimumRatingDisplay: event, minimumRating: id });
      case genreInput:
        return this.setState({ genreName: event, genreCode: id });
      default:
        return;
    }
  };

  renderSpinForm() {
    return (
      <form className="ui large form error" onSubmit={event => this.handleSpin(event)}>
        <h2 className="ui teal image header">
          <div className="content">Find a movie to watch tonight!</div>
        </h2>
        <div className="fields">
          <Dropdown
            inputtype={yearFromInput}
            labeltext="From"
            value={this.state.yearFrom}
            onChange={(event, id) => {
              this.handleUserInput(event, yearFromInput, id);
            }}
          >
            <DropdownOptions optiondata={this.state.yearArray} />
          </Dropdown>
          <Dropdown
            inputtype={yearToInput}
            labeltext="To"
            value={this.state.yearTo}
            onChange={(event, id) => {
              this.handleUserInput(event, yearToInput, id);
            }}
          >
            <DropdownOptions optiondata={this.state.yearArray} />
          </Dropdown>
          <Dropdown
            inputtype={minimumRatingInput}
            labeltext="Minimum Rating"
            value={this.state.minimumRatingDisplay}
            onChange={(event, id) => {
              this.handleUserInput(event, minimumRatingInput, id);
            }}
          >
            <DropdownOptions optiondata={this.state.ratingsArray} />
          </Dropdown>

          <div className="ui basic segment"></div>
          <p />
          <Dropdown
            inputtype={genreInput}
            labeltext="Genre"
            value={this.state.genreName}
            onChange={(event, id) => {
              this.handleUserInput(event, genreInput, id);
            }}
          >
            <DropdownOptions optiondata={this.state.genreArray} />
          </Dropdown>
        </div>

        <div className="ui basic segment"></div>
        <button className="ui fluid large teal submit button">Spin!</button>
      </form>
    );
  }

  render() {
    return <div>{this.renderSpinForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genreDropdownDataSource
  };
};

export default connect(mapStateToProps, {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
})(SpinForm);
