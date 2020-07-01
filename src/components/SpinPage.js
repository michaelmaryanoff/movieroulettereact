import React from 'react';
import { connect } from 'react-redux';
import { getGenreCodes } from '../actions';

class SpinPage extends React.Component {
  constructor(props) {
    super(props);
    const yearArray = this.generateYearArray();

    this.state = {
      // An array of years used to populate dropdown menu
      yearArray,

      // A default "yearFrom" set at the earliest year movies are available.
      // This will be used to manage to make the dropdown a controlled component
      yearFrom: yearArray[0],

      // A default "yearTo", set at the current year
      // This will be used to manage to make the dropdown a controlled component
      yearTo: yearArray[yearArray.length - 1]
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

    if (inputType === 'yearFrom') {
      return this.state.yearArray.map(year => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      });
    }

    if (inputType === 'yearTo') {
      return this.state.yearArray.map(year => {
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      });
    }
    if (inputType === 'minimumRating') {
      return ratingArray.map(rating => {
        let displayRating = (rating + 1) * 10;
        return (
          <option key={displayRating} value={displayRating}>
            {displayRating}%
          </option>
        );
      });
    }

    if (inputType === 'genres' && this.props.genreCodes) {
      return this.props.genreCodes.map(genre => {
        return (
          <option key={genre.name} value={genre.name}>
            {genre.name}
          </option>
        );
      });
    }
  }

  handleUserInput = inputType => event => {
    const { target } = event;
    if (inputType === 'yearFrom') {
      this.setState({ yearFrom: target.value });
    }
  };

  renderSpinForm() {
    return (
      <div className="pusher">
        <div className="ui middle aligned center aligned grid">
          <div className="two column row">
            <div className="column">
              <form className="ui large form error">
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
                        onChange={this.handleUserInput('yearFrom')}
                      >
                        {this.renderDropDown('yearFrom')}
                      </select>
                    </div>
                    <div className="field">
                      <label>To</label>
                      <select name="yearTo" className="ui dropdown">
                        {this.renderDropDown('yearTo')}
                      </select>
                    </div>
                    <div className="field">
                      <label>Minimum Rating</label>
                      <select name="Minimum Rating" className="ui dropdown">
                        {this.renderDropDown('minimumRating')}
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Genre</label>
                    <select name="Genres" className="ui fluid dropdown">
                      {this.renderDropDown('genres')}
                    </select>
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
    console.log('render state', this.state);

    return <div className="ui container">{this.renderSpinForm()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genres,
    currState: state
  };
};

export default connect(mapStateToProps, { getGenreCodes })(SpinPage);
