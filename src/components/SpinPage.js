import React from 'react';
import { connect } from 'react-redux';

import SpinForm from './SpinForm';
import SpinCard from './SpinCard';

import { resetWatchlistUpdateStatus } from '../actions';

class SpinPage extends React.Component {
  componentDidMount() {
    this.props.resetWatchlistUpdateStatus();
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="eight wide column">
            <SpinForm />
          </div>
          <div className="eight wide column">
            <SpinCard />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  resetWatchlistUpdateStatus
})(SpinPage);
