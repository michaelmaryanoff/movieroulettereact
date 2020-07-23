import React from 'react';
import { WatchlistAddButton } from './WatchlistAddButton';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

export const NoResultsCard = () => {
  return (
    <div className="pusher">
      <div className="ui middle aligned center aligned grid">
        <div className="three column row">
          <div className="column">
            <div className="ui card" key="placeholder">
              <div className="content">
                <h3>
                  <em>No movies match this criteria</em>
                </h3>
                <h1>Please try again</h1>
              </div>
              <div className="image">
                <img
                  className="ui medium bordered image"
                  src={reelLogoPlaceHolder}
                  alt="No results found"
                />
              </div>
              <div className="content">
                <div className="description">Please spin again</div>
                <p />
                <div>
                  <WatchlistAddButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
