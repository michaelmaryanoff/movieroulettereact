import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { resetWatchlistUpdateStatus } from '../actions';

import SpinForm from './SpinForm';
import LoadingCard from './LoadingCard';
import PageHeader from './PageHeader';
import Footer from './Footer';
import MasterSpinCard from './MasterSpinCard';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class SpinPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardProps: {
        posterPath: reelLogoPlaceHolder,
        id: '',
        originalTitle: '',
        releaseDate: '',
        overview: '',
        voteAverage: '',
        movieURL: '',
        isSpinning: false
      }
    };
  }

  componentDidMount() {
    this.props.resetWatchlistUpdateStatus();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const cardProps = this.updateSpinProps();

      this.setState({ cardProps: { ...cardProps } });
    }
  }

  updateSpinProps() {
    const { selectedMovie } = this.props;

    let cardProps = {
      posterPath: reelLogoPlaceHolder,
      id: '',
      originalTitle: '',
      releaseDate: '',
      overview: '',
      voteAverage: '',
      movieURL: '',
      isSpinning: false,
      testProp: 'testprop'
    };

    const firstLoadProps = {
      originalTitle: 'Find something to watch!',
      overview: 'Hit the "spin" button to find something to watch.'
    };

    const noResultsProps = {
      posterPath: reelLogoPlaceHolder,
      originalTitle: 'No results found!',
      overview:
        'Unfortunatley, we could not find any movies that fit the selected criteria. Please spin again with a broader set of criteria.'
    };

    if (!selectedMovie) {
      cardProps.originalTitle = firstLoadProps.originalTitle;
      cardProps.overview = firstLoadProps.overview;
    }

    if (selectedMovie === 'NO_RESULTS') {
      cardProps.originalTitle = noResultsProps.originalTitle;
      cardProps.overview = noResultsProps.overview;
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
      const posterPath = poster_path
        ? `https://image.tmdb.org/t/p/original/${poster_path}`
        : reelLogoPlaceHolder;
      const movieURL = `https://www.themoviedb.org/movie/${id}`;

      cardProps.posterPath = posterPath;
      cardProps.id = id;
      cardProps.originalTitle = original_title;
      cardProps.releaseDate = release_date;
      cardProps.overview = modifiedOverview;
      cardProps.voteAverage = vote_average;
      cardProps.movieURL = movieURL;
    }

    return cardProps;
  }

  render() {
    return (
      <Fragment>
        <div className="ui container">
          <PageHeader label="Welcome to Movie Roulette" />
          <div className="ui basic doubling inverted blue segment">
            <div className="ui center aligned centered inverted segment">
              <div className="ui two column stackable center aligned grid">
                <div className="six wide column">
                  <SpinForm />
                </div>
                <div className="ten wide column">
                  <LoadingCard />
                  {this.props.isSpinning ? null : (
                    <MasterSpinCard selectedMovie={this.state.cardProps} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSpinning: state.spin.isSpinning,
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, {
  resetWatchlistUpdateStatus
})(SpinPage);
