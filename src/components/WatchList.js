import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import WatchlistCard from './WatchlistCard';
import { WatchlistLoginError } from './WatchlistLoginError';

class WatchList extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui basic segment">
          {this.props.isLoggedIn ? <WatchlistCard /> : <WatchlistLoginError />}
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps)(WatchList));
