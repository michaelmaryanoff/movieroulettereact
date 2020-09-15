import React, { Component } from 'react';
import WatchlistAddButton from './WatchlistAddButton';
import { connect } from 'react-redux';
import { addToWatchlist } from '../actions';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class SpinResultCard extends Component {
  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };
  renderCard() {
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
    const movieURL = `https://www.themoviedb.org/movie/${id}`;

    if (!this.props.selectedMovie.poster_path) {
      imageURL = reelLogoPlaceHolder;
    }

    return (
      <div className="ui two column stackable grid">
        <div className="ui row">
          <div className="column">
            <div className="ui fluid centered center aligned basic segment">
              <a className="ui small image" href={movieURL}>
                <img src={imageURL} alt={id} />
              </a>
              {/* <div className="content">
                <div className="header">{original_title}</div>
                <div className="meta">Released: {release_date}</div>
              </div> */}
            </div>
          </div>
          <div className="column">
            <div className="ui fluid centered basic card" key={id}>
              <div className="left aligned content">
                <div className="description">{overview}</div>
                <div className="extra content">Average Score: {vote_average}</div>
              </div>
            </div>
          </div>
          <WatchlistAddButton handleAdd={this.handleAddToWatchlist} />
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderCard()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, { addToWatchlist })(SpinResultCard);
