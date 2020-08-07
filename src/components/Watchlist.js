import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getWatchList, updatingWatchListCompleted } from '../actions';

import WatchlistCards from './WatchlistCards';
import WatchlistLoginError from './WatchlistLoginError';
import Footer from './Footer';

class Watchlist extends React.Component {
  componentDidMount() {
    this.props.getWatchList();

    this.props.updatingWatchListCompleted();
  }
  render() {
    return (
      <div className="ui container">
        <div className="ui basic segment">
          {this.props.isLoggedIn ? <WatchlistCards /> : <WatchlistLoginError />}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default withRouter(
  connect(mapStateToProps, { getWatchList, updatingWatchListCompleted })(Watchlist)
);