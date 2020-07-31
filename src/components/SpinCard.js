import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToWatchlist, resetWatchlistUpdateStatus, spinningCompleted } from '../actions';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

import WatchlistAddButton from './WatchlistAddButton';
import LoadingCard from './LoadingCard';
import NoResultsCard from './NoResultsCard';
import SpinResultCard from './SpinResultCard';

export class SpinCard extends Component {
  componentDidMount() {
    this.props.spinningCompleted();
  }
  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };

  renderSpinCard() {
    if (this.props.isSpinning === true) {
      return <LoadingCard />;
    }

    if (this.props.selectedMovie === 'NO_RESULTS') {
      return <NoResultsCard />;
    }

    if (this.props.selectedMovie) {
      return <SpinResultCard />;
    }
  }

  render() {
    return <div>{this.renderSpinCard()}</div>;
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
  addToWatchlist,
  resetWatchlistUpdateStatus,
  spinningCompleted
})(SpinCard);
