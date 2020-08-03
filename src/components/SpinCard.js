import React from 'react';
import { connect } from 'react-redux';

import SpinNoResultsCard from './SpinNoResultsCard';
import SpinResultCard from './SpinResultCard';

const SpinCard = props => {
  return props.selectedMovie === 'NO_RESULTS' ? <SpinNoResultsCard /> : <SpinResultCard />;
};

const mapStateToProps = state => {
  return {
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps)(SpinCard);
