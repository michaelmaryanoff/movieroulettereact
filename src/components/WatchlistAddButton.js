import React, { Component } from 'react';
import { connect } from 'react-redux';

class WatchlistAddButton extends Component {
  renderButton() {
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <button disabled={true} className="ui fluid large inactive submit button">
            Log in to add to Watchlist
          </button>
        </div>
      );
    }

    if (this.props.isLoggedIn && this.props.isWatchListUpdated === false) {
      return (
        <div>
          <button
            className="ui fluid large teal submit button"
            disabled={false}
            onClick={event => this.props.handleAdd(event)}
          >
            Add to Watchlist
          </button>
        </div>
      );
    }

    if (this.props.isLoggedIn && this.props.isWatchListUpdated === true) {
      return (
        <div>
          <button disabled={true} className="ui fluid large inactive submit button">
            Added to Watchlist!
          </button>
        </div>
      );
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
