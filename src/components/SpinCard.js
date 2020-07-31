import React, { Component } from 'react';
import { connect } from 'react-redux';

import { spinningCompleted } from '../actions';

import LoadingCard from './LoadingCard';
import NoResultsCard from './NoResultsCard';
import SpinResultCard from './SpinResultCard';

export class SpinCard extends Component {
  componentDidMount() {
    this.props.spinningCompleted();
  }

  renderSpinCard() {
    if (this.props.isSpinning === true) {
      return <LoadingCard />;
    }

    if (this.props.selectedMovie === 'NO_RESULTS') {
      return <NoResultsCard />;
    }

    if (this.props.selectedMovie) {
      return <SpinResultCard />;
    }
  }

  render() {
    return <div>{this.renderSpinCard()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    selectedMovie: state.spin.selectedMovie,

    isSpinning: state.spin.isSpinning,
    currentState: state
  };
};

export default connect(mapStateToProps, {
  spinningCompleted
})(SpinCard);
