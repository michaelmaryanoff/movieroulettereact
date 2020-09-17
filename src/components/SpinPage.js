import React from 'react';
import { connect } from 'react-redux';

import { resetWatchlistUpdateStatus } from '../actions';

import SpinForm from './SpinForm';
import LoadingCard from './LoadingCard';
import WelcomeHeader from './WelcomeHeader';
import Footer from './Footer';
import FirstLoadSpinCard from './FirstLoadSpinCard';
import MasterSpinCard from './MasterSpinCard';

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
          <div className="ui basic doubling segment">
            <div className="ui center aligned centered segment">
              <div className="ui two column stackable center aligned grid">
                <div className="six wide column">
                  <SpinForm />
                </div>
                <div className="ten wide column">
                  <LoadingCard />
                  <FirstLoadSpinCard />
                  {this.props.isSpinning ? null : <MasterSpinCard />}
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
