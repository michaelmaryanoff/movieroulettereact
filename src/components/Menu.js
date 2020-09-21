import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';
import MenuContainer from './MenuContainer';

import LoadingBar from 'react-redux-loading-bar';

class Menu extends React.Component {
  render() {
    return (
      <div className="ui secondary pointing inverted menu">
        <LoadingBar />
        <div className="ui container">
          <MenuContainer isLoggedIn={this.props.isLoggedIn} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { signOut })(Menu));
