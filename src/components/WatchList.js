import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class WatchList extends React.Component {
  componentDidMount() {
    console.log('mount');
  }
  render() {
    return <div>WatchList</div>;
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn
  };
};

export default withRouter(connect(mapStateToProps)(WatchList));
