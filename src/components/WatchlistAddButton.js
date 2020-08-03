import React from 'react';
import { connect } from 'react-redux';
import AuthedWatchListAddButton from './AuthedWatchListAddButton';
import GuestWatchListAddButton from './GuestWatchListAddButton';

class WatchlistAddButton extends React.Component {
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? <AuthedWatchListAddButton /> : <GuestWatchListAddButton />}
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
