import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import WatchList from './WatchList';
import Header from './Header';
import SpinPage from './SpinPage';
import ErrorPage from './ErrorPage';

import { LoadingBar } from 'react-redux-loading-bar';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar progressIncrease={100} showFastActions />
          <Header />
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact component={LoginForm} />
            <Route path="/spin" exact component={SpinPage} />
            <Route path="/watchlist" exact component={WatchList} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
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
