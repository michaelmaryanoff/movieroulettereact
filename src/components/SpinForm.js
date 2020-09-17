import React from 'react';
import { connect } from 'react-redux';
import { generateYearArray, generateRatingArray, generateReversedYearArray } from '../utils';

import { Dropdown as SemanticDropdown, Select } from 'semantic-ui-react';

import {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
} from '../actions';

import { languageList } from '../languageList/languageList.js';

import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

import FormHeader from './FormHeader';
import FieldLabel from './FieldLabel';

class SpinForm extends React.Component {
  constructor(props) {
    super(props);
    const yearArray = generateYearArray();
    const ratingsArray = generateRatingArray();
    const languageArray = this.createLanguageList();
    const reversedYearArray = generateReversedYearArray();
    const genreArray = this.populateGenreArray();

    this.state = {
      // These arrays are used to populate dropdown menu
      yearArray,
      reversedYearArray,
      ratingsArray,
      genreArray,

      // A default "yearFrom" set to 1955, since people are probably not going
      // to looking for a movie much earlier than that.
      // This will be used to to make the dropdown a controlled component.
      yearFromInput: yearArray[35].value,

      // A default "yearTo", set at the current year
      // This will be used to to make the dropdown a controlled component.
      yearToInput: yearArray[yearArray.length - 1].value,

      minimumRatingInput: 0,

      // The code of the currently selected genre (used for our network request)
      genreInput: '',
      languageInput: '',

      languageArray
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

  populateGenreArray = () => {
    let genreArrayToMap = this.props.genreCodes
      ? this.props.genreCodes
      : [{ key: 'Loading...', value: 'Loading...', text: 'Loading...' }];
    return genreArrayToMap.map(({ id, name }) => {
      return { key: id, value: id, text: name };
    });
  };

  // Handle the spin
  handleSpin = event => {
    event.preventDefault();

    this.props.spinningStarted();
    this.props.resetWatchlistUpdateStatus();

    this.setState({ watchListIsUpdated: false });
    let {
      yearFromInput: yearFrom,
      yearToInput: yearTo,
      minimumRatingInput: minimumRating,
      genreInput,
      languageInput
    } = this.state;

    let submissionObject = {
      yearFrom,
      yearTo,
      minimumRating,
      genreInput,
      languageInput
    };

    this.props.submitSpin(submissionObject).then(this.props.spinningCompleted);
  };

  handleSemanticDropDownChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="ui four column centered doubling stackable center aligned grid">
        <div className="ui centered center aligned basic fluid inverted segment">
          <form className="ui large inverted form error" onSubmit={event => this.handleSpin(event)}>
            <FormHeader label="Find a movie to watch!" />
            <div className="inverted field">
              <FieldLabel label="Language" />
              <SemanticDropdown
                name="languageInput"
                onChange={this.handleSemanticDropDownChange}
                placeholder="Select Language"
                search
                selection
                labeled={true}
                options={this.state.languageArray}
              />
            </div>

            <div className="row">
              <div className="two fields">
                <div className="field">
                  <FieldLabel label="From" />
                  <Select
                    name={yearFromInput}
                    onChange={this.handleSemanticDropDownChange}
                    placeholder={`${this.state.yearFromInput}`}
                    search
                    selection
                    labeled={true}
                    options={this.state.yearArray}
                  />
                </div>
                <div className="field">
                  <FieldLabel label="To" />
                  <Select
                    name={yearToInput}
                    onChange={this.handleSemanticDropDownChange}
                    placeholder={`${this.state.yearToInput}`}
                    search
                    selection
                    labeled={true}
                    options={this.state.reversedYearArray}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="two fields">
                <div className="field">
                  <FieldLabel label="Min. Rating" />
                  <Select
                    name={minimumRatingInput}
                    onChange={this.handleSemanticDropDownChange}
                    placeholder="1 / 10"
                    search
                    selection
                    labeled={true}
                    options={this.state.ratingsArray}
                  />
                </div>
                <div className="field">
                  <FieldLabel label="Genre" />
                  <Select
                    name={genreInput}
                    onChange={this.handleSemanticDropDownChange}
                    placeholder="Adventure"
                    search
                    selection
                    labeled={true}
                    options={this.state.genreArray}
                  />
                </div>
              </div>
            </div>
            <button className="ui fluid large red submit button">Spin!</button>
          </form>
        </div>
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

export default connect(mapStateToProps, {
  getGenreCodes,
  submitSpin,
  spinningStarted,
  spinningCompleted,
  resetWatchlistUpdateStatus
})(SpinForm);
