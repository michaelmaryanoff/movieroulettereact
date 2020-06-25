import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class WatchList extends React.Component {
  componentDidMount() {
    console.log('session details ', this.props);
    console.log('watchlist', this.props);
  }

  renderWatchList() {
    if (this.props.watchList) {
      return this.props.watchList.results.map(movie => {
        // return <div>{movie}</div>;
        let imageURL = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

        return (
          <div className="ui card">
            <div className="image">
              <img src={imageURL} alt={movie.id} />
            </div>
            <div class="content">
              <div className="header">{movie.original_title}</div>
              <div className="meta">Released: {movie.release_date}</div>
              <div className="description">{movie.overview}</div>
              <div className="extra content">Average Score:{movie.vote_average}</div>
            </div>
          </div>
        );
      });
    }
    return <div>Loading...</div>;
  }
  render() {
    return <div>{this.renderWatchList()}</div>;
  }
}

const mapStateToProps = state => {
  console.log('state', state);

  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn,
    watchList: state.session.watchList
  };
};

export default withRouter(connect(mapStateToProps)(WatchList));
