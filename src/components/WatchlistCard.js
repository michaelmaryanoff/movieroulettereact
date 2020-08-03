import React from 'react';
import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class WatchListCard extends React.Component {
  render() {
    console.log('render call');

    const {
      id,
      original_title,
      release_date,
      overview,
      vote_average,
      poster_path
    } = this.props.movie;

    let imageURL = `https://image.tmdb.org/t/p/original/${poster_path}`;

    let imagePath = poster_path ? imageURL : reelLogoPlaceHolder;

    const modifiedOverview = `${overview.slice(0, 250)}...`;
    const movieURL = `https://www.themoviedb.org/movie/${id}`;

    return (
      <div className="ui centered card" key={`${id}`}>
        <div className="ui image">
          <a href={movieURL}>
            <img src={imagePath} alt={id} />
          </a>
        </div>
        <div className="content">
          <div className="header">{original_title}</div>
          <div className="meta">Released: {release_date}</div>
          <div className="description">{modifiedOverview}</div>
          <div className="extra content">Average Score:{vote_average}</div>
        </div>
      </div>
    );
  }
}

export default WatchListCard;
