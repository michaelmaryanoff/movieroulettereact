import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WatchlistFetchError from './WatchlistFetchError';
import WatchListCard from './WatchListCard';

class WatchlistCards extends React.Component {
  renderWatchList() {
    return this.props.watchList.results.map(movie => (
      <WatchListCard movie={movie} key={movie.id} />
    ));
  }

  render() {
    // If there is a watchlist found, we will render the watchlist for the user.
    // If no watchlist is found, we will render and error message letting the user know no
    // watchlist could be displayed
    return this.props.watchList ? (
      <div className="ui cards">{this.renderWatchList()}</div>
    ) : (
      <WatchlistFetchError />
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    watchList: state.session.watchList
  };
};

export default withRouter(connect(mapStateToProps)(WatchlistCards));
