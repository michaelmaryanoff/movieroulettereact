import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class WatchList extends React.Component {
  renderWatchList() {
    if (this.props.watchList) {
      return this.props.watchList.results.map(movie => {
        let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        if (!movie.poster_path) {
          imageURL = reelLogoPlaceHolder;
        }

        return (
          <div className="ui card" key={`${movie.id}`}>
            <div className="image">
              <img src={imageURL} alt={movie.id} />
            </div>
            <div className="content">
              <div className="header">{movie.original_title}</div>
              <div className="meta">Released: {movie.release_date}</div>
              <div className="description">{movie.overview}</div>
              <div className="extra content">Average Score:{movie.vote_average}</div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className="ui center aligned segment">
        <h3>You must be logged in to access this page.</h3>
      </div>
    );
  }
  render() {
    return <div>{this.renderWatchList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    watchList: state.session.watchList
  };
};

export default withRouter(connect(mapStateToProps)(WatchList));
