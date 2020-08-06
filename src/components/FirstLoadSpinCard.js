import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToWatchlist } from '../actions';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

class FirstLoadSpinCard extends Component {
  // This card will be loaded the first time the user loads the page

  renderCard() {
    const imageURL = reelLogoPlaceHolder;

    const cardToRenderOnFirstLoad = () => {
      return (
        <div className="ui card centered" key="First load">
          <div className="content">
            <h3>
              <em>Spin the wheel!</em>
            </h3>
            <h3 className="header">Find a movie to watch tonight</h3>
            <div className="meta">_______</div>
            <p />
            <div className="ui centered small image">
              <img src={imageURL} alt="Take a spin!" />
            </div>
            <div className="description">
              <p />
              <p />
              Enter some optional criteria (or don't) and click "Spin" to find something to watch
              tonight!
            </div>
            <p />
          </div>
        </div>
      );
    };

    let { selectedMovie, isSpinning } = this.props;

    return !selectedMovie && !isSpinning ? cardToRenderOnFirstLoad() : null;
  }
  render() {
    return <div>{this.renderCard()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSpinning: state.spin.isSpinning,
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, { addToWatchlist })(FirstLoadSpinCard);
