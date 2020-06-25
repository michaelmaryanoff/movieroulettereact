import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';
import SpinPage from './SpinPage';
import WatchList from './WatchList';
import history from '../history';
import { withRouter } from 'react-router';

class App extends React.Component {
  componentDidUpdate() {}
  render() {
    console.log('props in App', this.props);

    return (
      <div className="ui container">
        <Router history={history}>
          <ProtectedRoute
            exact
            path="/spin"
            component={SpinPage}
            isLoggedIn={this.props.isLoggedIn}
          />
          <Route exact path="/watchlist" component={WatchList} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={LoginPage} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(App);
