import React from 'react';
import { connect } from 'react-redux';
import { getGenreCodes, submitSpin } from '../actions';
import { yearFromInput, yearToInput, minimumRatingInput, genreInput } from './inputTypes';

class SpinPage extends React.Component {
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
    // Since genre codes change over time, we need to make a network call to make sure we have
    // The correct genre codes
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

  renderDropDown(inputType) {
    // This function will render the various dropdown menus
    // It takes in

    // Creates a zero indexed array for ratings.
    // The TMDB API takes in a zero index integer for ratings
    const ratingArray = Array.from(new Array(10), (i, index) => index);

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
        let displayRating = (rating + 1) * 10;

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

  handleUserInput = inputType => event => {
    const { target } = event;

    if (inputType === yearFromInput) {
      this.setState({ yearFrom: target.value });
    }

    if (inputType === yearToInput) {
      this.setState({ yearTo: target.value });
    }

    if (inputType === minimumRatingInput) {
      this.setState({ minimumRating: target.value });
    }

    if (inputType === genreInput) {
      // We need these variables to get the text of the label in order to set the state
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].label;

      this.setState({ genreCode: target.value, genreName: label });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    let { yearFrom, yearTo, minimumRating, genreCode } = this.state;

    let submissionObject = {
      yearfrom: yearFrom,
      yearTo: yearTo,
      minimumRating: minimumRating,
      genreCode: genreCode
    };
    this.props.submitSpin(submissionObject);
  };

  renderSpinForm() {
    return (
      <div className="pusher">
        <div className="ui middle aligned center aligned grid">
          <div className="two column row">
            <div className="column">
              <form className="ui large form error" onSubmit={this.handleSubmit}>
                <div className="ui segment">
                  <h2 className="ui teal image header">
                    <div className="content">Find a movie!</div>
                  </h2>
                  <div className="fields">
                    <div className="field">
                      <label>From</label>
                      <select
                        name="yearFrom"
                        className="ui dropdown"
                        value={this.state.yearFrom}
                        onChange={this.handleUserInput(yearFromInput)}
                      >
                        {this.renderDropDown(yearFromInput)}
                      </select>
                    </div>
                    <div className="field">
                      <label>To</label>
                      <select
                        name="yearTo"
                        className="ui dropdown"
                        value={this.state.yearTo}
                        onChange={this.handleUserInput(yearToInput)}
                      >
                        {this.renderDropDown(yearToInput)}
                      </select>
                    </div>
                    <div className="field">
                      <label>Minimum Rating</label>
                      <select
                        name="Minimum Rating"
                        className="ui dropdown"
                        value={this.state.minimumRating}
                        onChange={this.handleUserInput(minimumRatingInput)}
                      >
                        {this.renderDropDown(minimumRatingInput)}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Genre</label>
                    <select
                      name="Genres"
                      className="ui fluid dropdown"
                      onChange={this.handleUserInput(genreInput)}
                    >
                      {this.renderDropDown(genreInput)}
                    </select>
                    <div className="ui basic segment"></div>
                    <button className="ui fluid large teal submit button">Spin!</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    console.log('state', this.state);

    return <div className="ui container">{this.renderSpinForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genres,
    currState: state
  };
};

export default connect(mapStateToProps, { getGenreCodes, submitSpin })(SpinPage);
