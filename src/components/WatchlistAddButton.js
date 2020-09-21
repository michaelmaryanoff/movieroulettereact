import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import AuthedWatchListAddButton from './AuthedWatchlistAddButton';
import GuestWatchlistAddButton from './GuestWatchlistAddButton';

class WatchlistAddButton extends React.Component {
  render() {
    return (
      <Fragment>
        {this.props.isLoggedIn ? <AuthedWatchListAddButton /> : <GuestWatchlistAddButton />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default connect(mapStateToProps)(WatchlistAddButton);
