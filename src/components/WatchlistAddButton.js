import React, { Component } from 'react';
import { connect } from 'react-redux';

export class WatchlistAddButton extends Component {
  renderButton() {
    if (this.props.isLoggedIn && this.props.isUpdated === false) {
      return (
        <div>
          <button
            className="ui fluid large teal submit button"
            onClick={event => this.props.handleAdd(event)}
          >
            Add to Watchlist
          </button>
        </div>
      );
    }

    if (this.props.isLoggedIn && this.props.isUpdated === true) {
      return (
        <div>
          <button
            className="ui fluid large inactive submit button"
            onClick={event => this.props.handleAdd(event)}
            disabled={true}
          >
            Added to Watchlist!
          </button>
        </div>
      );
    }
    if (!this.props.isLoggedIn) {
      return (
        <div>
          <button disabled={true} className="ui fluid large inactive submit button">
            Log in to add to Watchlist
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
    genreCodes: state.spin.genres,
    selectedMovie: state.spin.selectedMovie,
    isLoggedIn: state.session.isLoggedIn,
    watchListResponseStatus: state.spin.watchListResponse.status,
    isSpinning: state.spin.isSpinning,
    currentState: state
  };
};

export default connect(mapStateToProps)(WatchlistAddButton);
