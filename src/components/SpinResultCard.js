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
      <div className="ui card centered" key={id}>
        <div className="content">
          <h3>
            <em>Tonight you're watching...</em>
          </h3>
          <h3 className="header">{original_title}</h3>
          <div className="meta">Released: {release_date}</div>
          <p />
          <div className="ui centered small image">
            <a href={movieURL}>
              <img src={imageURL} alt={id} />
            </a>
          </div>

          <div className="description">
            <p />
            <p />
            {modifiedOverview}
          </div>
          <div className="extra content">Average Score: {vote_average}</div>
          <p />
          <div>
            <WatchlistAddButton handleAdd={this.handleAddToWatchlist} />
          </div>
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
    selectedMovie: state.spin.selectedMovie,
    
  };
};

export default connect(mapStateToProps, { addToWatchlist })(SpinResultCard);
