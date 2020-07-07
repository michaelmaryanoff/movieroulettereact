import React from 'react';
import { connect } from 'react-redux';
import {
  getGenreCodes,
  submitSpin,
  addToWatchlist,
  spinningStarted,
  spinningCompleted
} from '../actions';
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
      genreCode: '',

      // Let's us know if spin was clicked
      isSpinning: false,

      // Let's us know if we are updating the watchlist
      isUpdatingWatchlist: false,

      // Used for rendering the watchlist button once watchlist is updated
      watchListIsUpdated: false
    };
  }
  // ANCHOR: Lifecycle methods
  componentDidMount() {
    // Since genre codes change over time, we need to make a network call to make sure we have
    // the correct genre codes
    this.props.getGenreCodes();
  }
  // ANCHOR: Helper methods
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

  // ANCHOR: Handle input methods
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

  handleAddToWatchlist = event => {
    event.preventDefault();

    this.setState({ isUpdatingWatchlist: true });

    this.props.addToWatchlist(this.props.selectedMovie.id).then(() => {
      if (this.props.watchListResponseStatus >= 200 && this.props.watchListResponseStatus <= 299) {
        this.setState({ isUpdatingWatchlist: false });
        this.setState({ watchListIsUpdated: true });
      }
    });
  };

  // ANCHOR: Render methods
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

  renderAddToWatchlistButton() {
    // Renders a the "Add to watchlist button"
    if (this.props.isLoggedIn && this.state.watchListIsUpdated === false) {
      return (
        <div>
          <button
            className="ui fluid large teal submit button"
            onClick={event => this.handleAddToWatchlist(event)}
          >
            Add to Watchlist
          </button>
        </div>
      );
    }

    if (this.props.isLoggedIn && this.state.watchListIsUpdated === true) {
      return (
        <div>
          <button
            className="ui fluid large inactive submit button"
            onClick={event => this.handleAddToWatchlist(event)}
            disabled={true}
          >
            Added to Watchlist!
          </button>
        </div>
      );
    }
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <button disabled={true} className="ui fluid large inactive submit button">
            Log in to add to Watchlist
          </button>
        </div>
      );
    }
  }

  renderSpinForm() {
    return (
      <div className="pusher">
        <div className="ui middle aligned center aligned grid">
          <div className="two column row">
            <div className="column">
              <form className="ui large form error" onSubmit={event => this.handleSpin(event)}>
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

  renderSpinCard() {
    if (this.props.isSpinning === true) {
      return <div>{this.renderLoadingCard()}</div>;
    }

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
                    <div>{this.renderAddToWatchlistButton()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  renderLoadingCard() {
    return (
      <div className="pusher">
        <div className="ui middle aligned center aligned grid">
          <div className="three column row">
            <div className="column">
              <div className="ui active dimmer">
                <div className="ui loader"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="ui basic segment">{this.renderSpinForm()}</div>
        <div className="ui basic segment">{this.renderSpinCard()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genres,
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
})(SpinPage);
