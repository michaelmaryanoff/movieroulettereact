import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import WatchlistFetchError from './WatchlistFetchError';
import WatchlistCard from './WatchlistCard';

class WatchlistCards extends React.Component {
  renderWatchList() {
    // This returns a list of "cards" which display the user's watchlist from
    // their tmdb profile.
    return this.props.watchList.results.map(movie => (
      <WatchlistCard movie={movie} key={movie.id} />
    ));
  }

  render() {
    // If there is a watchlist found, we will render the watchlist for the user.
    // If no watchlist is found, we will render and error message letting the user know no
    // watchlist could be displayed.
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
