import React from 'react';
import { connect } from 'react-redux';
import AuthedWatchListAddButton from './AuthedWatchListAddButton';

class WatchlistAddButton extends React.Component {
  renderButton() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <button disabled={true} className="ui fluid large inactive submit button">
            Log in to add to Watchlist
          </button>
        </div>
      );
    } else {
      return <AuthedWatchListAddButton />;
    }
  }
  render() {
    return <div>{this.renderButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isWatchListUpdated: state.spin.isWatchListUpdated
  };
};

export default connect(mapStateToProps)(WatchlistAddButton);
