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
      movieURL: '',
      isSpinning: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const {
        posterPath,
        id,
        originalTitle,
        releaseDate,
        overview,
        voteAverage,
        movieURL,
        isSpinning
      } = this.props.selectedMovie;

      this.setState({
        posterPath,
        id,
        originalTitle,
        releaseDate,
        overview,
        voteAverage,
        movieURL,
        isSpinning
      });
    }
  }

  handleAddToWatchlist = event => {
    event.preventDefault();

    this.props.addToWatchlist(this.props.selectedMovie.id);
  };

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

    const rawDate = new Date(Date.parse(releaseDate));
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const convertedDate = rawDate.toLocaleDateString('en-US', options);

    let releaseString = releaseDate ? `Released: ${convertedDate}` : '';
    let scoreString = voteAverage ? `Average score: ${voteAverage}` : '';

    return (
      <div className="ui stackable grid">
        <div className="ui two column row">
          <div className="six wide column">
            <a className="ui fluid image" href={movieURL}>
              <img src={posterPath} alt={id} />
            </a>
          </div>

          <div className="ten wide column">
            <div className="ui inverted segment">
              <div className="ui centered fluid inverted card" style={{ fontSize: 16 }} key={id}>
                <div className="left aligned content">
                  <div className="header">{originalTitle}</div>
                  <div className="meta">{releaseString}</div>
                  <div className="description">{overview}</div>
                  <div className="extra content">{scoreString}</div>
                </div>
              </div>
              <WatchlistAddButton handleAdd={this.handleAddToWatchlist} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { addToWatchlist })(MasterSpinCard);
