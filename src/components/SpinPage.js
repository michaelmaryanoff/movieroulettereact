import React from 'react';
import { connect } from 'react-redux';

import SpinForm from './SpinForm';

import LoadingCard from './LoadingCard';

import { resetWatchlistUpdateStatus } from '../actions';
import WelcomeHeader from './WelcomeHeader';

import SpinCard from './SpinCard';

class SpinPage extends React.Component {
  componentDidMount() {
    this.props.resetWatchlistUpdateStatus();
  }

  render() {
    return (
      <div className="ui container">
        <WelcomeHeader />
        <div className="ui basic segment">
          <div className="ui center aligned segment">
            <div className="ui two column stackable center aligned grid">
              <div className="ui vertical divider"></div>
              <div className="ui middle aligned row">
                <div className="column">
                  <SpinForm />
                </div>
                <div className="column">
                  <LoadingCard />
                  {this.props.isSpinning ? null : <SpinCard />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSpinning: state.spin.isSpinning,
    selectedMovie: state.spin.selectedMovie
  };
};

export default connect(mapStateToProps, {
  resetWatchlistUpdateStatus
})(SpinPage);
