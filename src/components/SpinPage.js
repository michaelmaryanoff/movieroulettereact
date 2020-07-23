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
