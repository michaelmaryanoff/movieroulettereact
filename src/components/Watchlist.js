import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { getWatchList, updatingWatchListCompleted } from '../actions';

import WatchlistCards from './WatchlistCards';
import WatchlistLoginError from './WatchlistLoginError';
import Footer from './Footer';
import PageHeader from './PageHeader';

class Watchlist extends React.Component {
  // This will display the watchlist of our logged in user.
  // If our user is not logged in, it will display an error message
  // (hence the conditional render below)
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.getWatchList();
    }

    this.props.updatingWatchListCompleted();
  }
  render() {
    return (
      <Fragment>
        <div className="ui container">
          <div className="ui basic segment">
            <PageHeader label="Watchlist" />
            {this.props.isLoggedIn ? <WatchlistCards /> : <WatchlistLoginError />}
          </div>
        </div>
        <Footer />
      </Fragment>
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
