import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import WatchlistCards from './WatchlistCards';
import { WatchlistLoginError } from './WatchlistLoginError';

class Watchlist extends React.Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui basic segment">
          {this.props.isLoggedIn ? <WatchlistCards /> : <WatchlistLoginError />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default withRouter(connect(mapStateToProps)(Watchlist));
