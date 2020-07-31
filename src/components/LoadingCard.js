import React from 'react';
import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';
import { connect } from 'react-redux';

const LoadingCard = props => {
  if (props.isSpinning) {
    return (
      <div className="segment">
        <div className="ui card centered" key="1">
          <div className="content">
            <h3>
              <em>Spinning!</em>
            </h3>
            <h3 className="header">Finding a movie...</h3>
            <div className="ui centered small image">
              <img src={reelLogoPlaceHolder} alt="Spinning" />
            </div>
          </div>
          <div className="ui active dimmer">
            <div className="ui loader"></div>
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
