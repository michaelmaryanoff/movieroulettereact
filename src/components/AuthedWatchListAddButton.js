import React from 'react';
import { connect } from 'react-redux';
import { addToWatchlist } from '../actions';

export class AuthedWatchListAddButton extends React.Component {
  // This component will render the watchlist button when the user is logged in
  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };

  renderButton() {
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
    return <div></div>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isWatchListUpdated: state.spin.isWatchListUpdated
  };
};

export default connect(mapStateToProps)(AuthedWatchListAddButton);
