import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addToWatchlist, resetWatchlistUpdateStatus } from '../actions';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';
import WatchlistAddButton from './WatchlistAddButton';
import LoadingCard from './LoadingCard';
import { NoResultsCard } from './NoResultsCard';

export class SpinCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Let's us know if spin was clicked
      isSpinning: false
    };
  }

  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id).then(() => {
      if (this.props.watchListResponseStatus >= 200 && this.props.watchListResponseStatus <= 299) {
      }
    });
  };

  renderSpinCard() {
    if (this.props.isSpinning === true) {
      return <LoadingCard />;
    }

    if (this.props.selectedMovie === 'NO_RESULTS') {
      return <NoResultsCard />;
    }

    if (this.props.selectedMovie) {
      let {
        poster_path,
        id,
        original_title,
        release_date,
        overview,
        vote_average
      } = this.props.selectedMovie;

      let modifiedOverview = `${overview.slice(0, 250)}...`;

      let imageURL = `https://image.tmdb.org/t/p/original/${poster_path}`;

      if (!this.props.selectedMovie.poster_path) {
        imageURL = reelLogoPlaceHolder;
      }
      return (
        <div className="ui card centered" key={id}>
          <div className="content">
            <h3>
              <em>Tonight you're watching...</em>
            </h3>
            <h3 className="header">{original_title}</h3>
            <div className="meta">Released: {release_date}</div>
            <p />
            <div className="ui centered small image">
              <img src={imageURL} alt={id} />
            </div>

            <div className="description">{modifiedOverview}</div>
            <div className="extra content">Average Score: {vote_average}</div>
            <p />
            <div>
              <WatchlistAddButton
                isUpdated={this.state.watchListIsUpdated}
                handleAdd={this.handleAddToWatchlist}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderSpinCard()}</div>;
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

export default connect(mapStateToProps, { addToWatchlist, resetWatchlistUpdateStatus })(SpinCard);