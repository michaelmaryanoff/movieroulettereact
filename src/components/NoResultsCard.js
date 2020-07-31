import React from 'react';

import reelLogoPlaceHolder from '../images/ReelLogoPlaceholder.jpg';

const NoResultsCard = () => {
  return (
    <div className="ui card centered" key="no results">
      <div className="content">
        <h3>
          <em>No movies match these criteria</em>
        </h3>
        <h1>Please spin again</h1>
      </div>
      <div className="ui centered small image">
        <img src={reelLogoPlaceHolder} alt="No results found" />
      </div>
      <p />
      <div>
        <button
          className="ui fluid large inactive submit button"
          onClick={event => this.props.handleAdd(event)}
          disabled={true}
        >
          Click "Spin!" to spin again
        </button>
      </div>
    </div>
  );
};

export default NoResultsCard;
