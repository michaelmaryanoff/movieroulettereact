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
    // console.log('props', this.props);
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
      yearFrom: yearFrom,
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
                      <option id="selectGenre">Select Genre</option>
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

  handleAddToWatchlist = () => {
    console.log('selected movie', this.props.selectedMovie.id);
    // We are going to need a funciton for making the watchlist call
  };

  renderAddButton() {
    // Renders a the "Add to watchlist button"
    if (this.props.isLoggedIn) {
      return (
        <div>
          <button className="ui fluid large teal submit button" onClick={this.handleAddToWatchlist}>
            Add to Watchlist
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="ui fluid large inactive submit button"
            onClick={this.handleAddToWatchlist}
          >
            Log in to add to Watchlist
          </button>
        </div>
      );
    }
  }

  renderSpinCard() {
    if (this.props.selectedMovie) {
      let {
        poster_path,
        id,
        original_title,
        release_date,
        overview,
        vote_average
      } = this.props.selectedMovie;
      let imageURL = `https://image.tmdb.org/t/p/original/${poster_path}`;

      return (
        <div className="pusher">
          <div className="ui middle aligned center aligned grid">
            <div className="three column row">
              <div className="column">
                <div className="ui card" key={id}>
                  <div className="content">
                    <h3>
                      <em>Tonight you're watching...</em>
                    </h3>
                    <h1>{original_title}</h1>
                  </div>
                  <div className="image">
                    <img src={imageURL} alt={id} />
                  </div>
                  <div className="content">
                    <div className="meta">Released: {release_date}</div>
                    <div className="description">{overview}</div>
                    <div className="extra content">Average Score:{vote_average}</div>
                    <p />
                    <div>{this.renderAddButton()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui basic segment">{this.renderSpinForm()}</div>
        <div className="ui basic segment">{this.renderSpinCard()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in props', state);

  return {
    genreCodes: state.spin.genres,
    selectedMovie: state.spin.selectedMovie,
    isLoggedIn: state.session.isLoggedIn,
    isGuestSession: state.session.isGuestSession
  };
};

export default connect(mapStateToProps, { getGenreCodes, submitSpin })(SpinPage);
