import React from 'react';
import { connect } from 'react-redux';
import { generateYearArray, generateRatingArray } from '../utils';

import { Dropdown as SemanticDropdown } from 'semantic-ui-react';

import {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
} from '../actions';

import { languageList } from '../languageList/languageList.js';

import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

import Dropdown from './Dropdown';
import DropdownOptions from './DropdownOptions';
import GenreDropDownOptionList from './GenreDropDownOptionList';

class SpinForm extends React.Component {
  constructor(props) {
    super(props);
    const yearArray = generateYearArray();
    const ratingsArray = generateRatingArray();
    const languageArray = this.createLanguageList();

    this.state = {
      // These arrays are used to populate dropdown menu
      // The genre dropdown is populated using a custom component, due to its async nature
      yearArray,
      ratingsArray,

      // A default "yearFrom" set to 1955, since people are probably not going
      // to looking for a movie much earlier than that.
      // This will be used to to make the dropdown a controlled component.
      yearFrom: yearArray[35].value,

      // A default "yearTo", set at the current year
      // This will be used to to make the dropdown a controlled component.
      yearTo: yearArray[yearArray.length - 1].value,

      minimumRating: 0,

      // This is used for making a minimum rating a controlled component
      minimumRatingDisplay: '10%',

      // The title of the currently selected genre
      genreName: '',

      // The code of the currently selected genre (used for our network request)
      genreCode: '',

      languageArray,

      languageCode: ''
    };
  }

  componentDidMount() {
    /** Since genre codes change over time, we need to make a network
     * call to make sure we have the correct genre codes.
     * This is going to be used to populate the GenreDropDownOptionList component
     */

    this.props.getGenreCodes();
  }

  createLanguageList = () => {
    const list = languageList.map(object => {
      return object;
    });
    return list;
  };

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
    // This switch is used to control our components
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

  handleSemanticDropDownChange = (event, data) => {

    this.setState({ languageCode: data.value });
  };

  renderSpinForm() {
    // Note that our genre Dropdown is populated with a custom GenreDropDownOptionList component.
    // It depends on an async call, so the process of populating it is very different from the other components.
    return (
      <form className="ui large form error" onSubmit={event => this.handleSpin(event)}>
        <h2 className="ui teal image header">
          <div className="content">Find a movie to watch tonight!</div>
        </h2>
        <SemanticDropdown
          name="languageInput"
          onChange={this.handleSemanticDropDownChange}
          placeholder="Select Language"
          search
          selection
          options={this.state.languageArray}
          // Change this for controlled component
          text={this.state.displayLanguage}
        />

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
            <GenreDropDownOptionList />
          </Dropdown>
          <p />
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
    genreCodes: state.spin.genreDropdownDataSource,
    isFetchingGenres: state.spin.isFetchingGenres
  };
};

export default connect(mapStateToProps, {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
})(SpinForm);
