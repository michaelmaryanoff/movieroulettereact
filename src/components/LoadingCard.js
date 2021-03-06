import React from 'react';
import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';
import { connect } from 'react-redux';

const LoadingCard = props => {
  if (props.isSpinning) {
    return (
      <div className="ui stackable grid">
        <div className="ui two column row">
          <div className="six wide column">
            <div className="dimmer">
              <div className="ui medium image">
                <div className="ui massive active red loader"></div>
                <img src={reelLogoPlaceHolder} alt="Loading" />
              </div>
            </div>
          </div>
          <div className="ten wide column">
            <div className="ui centered fluid inverted card" style={{ fontSize: 16 }}>
              <div className="left aligned content">
                <div className="header">Spinning!</div>
                <div className="description">Finding you a movie to watch!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = state => {
  return {
    isSpinning: state.spin.isSpinning
  };
};

export default connect(mapStateToProps)(LoadingCard);
