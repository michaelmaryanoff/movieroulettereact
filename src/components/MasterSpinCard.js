import React, { Component } from 'react';
import WatchlistAddButton from './WatchlistAddButton';
import { connect } from 'react-redux';
import { addToWatchlist } from '../actions';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class MasterSpinCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posterPath: reelLogoPlaceHolder,
      id: '',
      originalTitle: '',
      releaseDate: '',
      overview: '',
      voteAverage: '',
      movieURL: ''
    };
  }

  componentDidMount() {
    if (this.props.selectedMovie) {
      if (this.props.selectedMovie === 'NO_RESULTS') {
        this.setState({
          posterPath: reelLogoPlaceHolder,
          originalTitle: 'No results found!',
          overview:
            'Unfortunatley, we could not find any movies that fit the selected criteria. Please spin again with a broader set of criteria.'
        });
      } else {
        const {
          poster_path,
          id,
          original_title,
          release_date,
          overview,
          vote_average
        } = this.props.selectedMovie;

        const modifiedOverview = `${overview.slice(0, 450)}...`;
        const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`;
        const movieURL = `https://www.themoviedb.org/movie/${id}`;

        this.setState({
          posterPath: posterPath,
          id: id,
          originalTitle: original_title,
          releaseDate: release_date,
          overview: modifiedOverview,
          voteAverage: vote_average,
          movieURL: movieURL
        });
      }
    }
  }

  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };

  renderCard() {}
  render() {
    const {
      posterPath,
      id,
      originalTitle,
      releaseDate,
      overview,
      voteAverage,
      movieURL
    } = this.state;
    return (
      <div className="ui stackable grid">
        <div className="ui two column row">
          <div className="six wide column">
            <a className="ui fluid image" href={movieURL}>
              <img src={posterPath} alt={id} />
            </a>
          </div>
          <div className="ten wide column">
            <div className="ui centered fluid card" style={{ fontSize: 16 }} key={id}>
              <div className="left aligned content">
                <div className="header">{originalTitle}</div>
                <div className="meta">Released: {releaseDate}</div>
                <div className="description">{overview}</div>
                <div className="extra content">Average Score: {voteAverage}</div>
              </div>
            </div>
            <WatchlistAddButton handleAdd={this.handleAddToWatchlist} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, { addToWatchlist })(MasterSpinCard);
