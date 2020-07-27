import React from 'react';
import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

const LoadingCard = () => {
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
};

export default LoadingCard;
