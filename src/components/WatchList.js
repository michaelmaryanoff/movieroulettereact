import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import WatchlistCard from './WatchlistCard';

class WatchList extends React.Component {
  render() {
    return <WatchlistCard />;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    watchList: state.session.watchList
  };
};

export default withRouter(connect(mapStateToProps)(WatchList));
