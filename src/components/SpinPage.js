import React from 'react';
import { connect } from 'react-redux';

import { resetWatchlistUpdateStatus } from '../actions';

import SpinForm from './SpinForm';
import LoadingCard from './LoadingCard';
import WelcomeHeader from './WelcomeHeader';
import SpinCard from './SpinCard';
import Footer from './Footer';
import FirstLoadSpinCard from './FirstLoadSpinCard';

class SpinPage extends React.Component {
  // Node that both <LoadingCard /> and <FirstLoadSpinCard /> contain logic that will render
  // them when necessary. (i.e. LoadingCard will only render when loading, FirstLoadSpinCard
  // will only render on first load).
  componentDidMount() {
    this.props.resetWatchlistUpdateStatus();
  }

  render() {
    return (
      <div>
        <div className="ui container">
          <WelcomeHeader />
          <div cla ssName="ui basic doubling segment">
            <div className="ui center aligned segment">
              <div className="ui two column stackable center aligned grid">
                <div className="column">
                  <SpinForm />
                </div>
                <div className="column">
                  <div className="ui doubling segment">
                    <LoadingCard />
                    <FirstLoadSpinCard />
                    {this.props.isSpinning ? null : <SpinCard />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
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
