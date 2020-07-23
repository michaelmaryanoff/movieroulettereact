import React from 'react';

const LoadingCard = () => {
  return (
    <div className="pusher">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <div className="ui active dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
