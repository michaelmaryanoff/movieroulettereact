import React, { Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginPage';
import SpinPage from './SpinPage';
import WatchList from './WatchList';
import Header from './Header';

import ProtectedRoute from './ProtectedRoute';
import history from '../history';
import { withRouter } from 'react-router';

class App extends React.Component {
  render() {
    history.listen(match => {
      console.log('match', match);
    });
    console.log('props', history);

    return (
      <div className="ui container">
        <Router history={history}>
          <Fragment>
            <Header />
            <Switch>
              {/* <ProtectedRoute
                exact
                path="/spin"
                component={SpinPage}
                isLoggedIn={this.props.isLoggedIn}
              /> */}

              {/* <Route exact path="/login" component={LoginForm} /> */}

              <Route exact path="/watchlist" component={WatchList} />

              <Route exact path="/" component={LoginForm} />
            </Switch>
          </Fragment>
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

export default connect(mapStateToProps)(App);
