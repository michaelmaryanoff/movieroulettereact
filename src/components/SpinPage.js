import React from 'react';
import { connect } from 'react-redux';

import SpinForm from './SpinForm';
import SpinCard from './SpinCard';

import { resetWatchlistUpdateStatus } from '../actions';

import {
  getGenreCodes,
  submitSpin,
  addToWatchlist,
  spinningStarted,
  spinningCompleted
} from '../actions';
import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class SpinPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Let's us know if spin was clicked
      isSpinning: false,

      // Let's us know if we are updating the watchlist
      isUpdatingWatchlist: false,

      // Used for rendering the watchlist button once watchlist is updated
      watchListIsUpdated: false
    };
  }

  componentDidMount() {
    this.props.resetWatchlistUpdateStatus();
  }

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

  renderSpinCard() {
    if (this.props.selectedMovie === 'NO_RESULTS') {
      return (
        <div className="pusher">
          <div className="ui middle aligned center aligned grid">
            <div className="three column row">
              <div className="column">
                <div className="ui card" key="placeholder">
                  <div className="content">
                    <h3>
                      <em>No movies match this criteria</em>
                    </h3>
                    <h1>Please try again</h1>
                  </div>
                  <div className="image">
                    <img
                      className="ui medium bordered image"
                      src={reelLogoPlaceHolder}
                      alt="No results found"
                    />
                  </div>
                  <div className="content">
                    <div className="description">Please spin again</div>
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

      if (!this.props.selectedMovie.poster_path) {
        imageURL = reelLogoPlaceHolder;
      }
      return (
        <div className="pusher">
          <div className="eight wide column">
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
                <div className="extra content">Average Score: {vote_average}</div>
                <p />
                <div>{this.renderAddToWatchlistButton()}</div>
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
          <div className="column">
            <div className="ui active dimmer">
              <div className="ui loader"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="eight wide column">
            <SpinForm />
          </div>
          {/* <div className="eight wide column">{this.renderSpinCard()}</div> */}
          <div className="eight wide column">
            <SpinCard />
          </div>
        </div>
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
  spinningCompleted,
  resetWatchlistUpdateStatus
})(SpinPage);
