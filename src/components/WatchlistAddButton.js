import React from 'react';
import { connect } from 'react-redux';
import AuthedWatchListAddButton from './AuthedWatchlistAddButton';
import GuestWatchlistAddButton from './GuestWatchlistAddButton';

class WatchlistAddButton extends React.Component {
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? <AuthedWatchListAddButton /> : <GuestWatchlistAddButton />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default connect(mapStateToProps)(WatchlistAddButton);
