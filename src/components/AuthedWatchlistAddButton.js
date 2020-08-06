import React from 'react';
import { connect } from 'react-redux';
import { addToWatchlist } from '../actions';

class AuthedWatchlistAddButton extends React.Component {
  // This component will render the watchlist button when the user is logged in
  //
  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };

  renderButton() {
    let { isWatchListUpdated } = this.props;
    let buttonClassName = isWatchListUpdated
      ? 'ui fluid large inactive submit button'
      : 'ui fluid large teal submit button';
    let buttonLabel = isWatchListUpdated ? 'Added to Watchlist!' : 'Add to Watchlist';
    let isButtonDisabled = isWatchListUpdated ? true : false;

    return (
      <div>
        <button
          disabled={isButtonDisabled}
          className={buttonClassName}
          onClick={event => this.handleAddToWatchlist(event)}
        >
          {buttonLabel}
        </button>
      </div>
    );
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isWatchListUpdated: state.spin.isWatchListUpdated,
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, { addToWatchlist })(AuthedWatchlistAddButton);
