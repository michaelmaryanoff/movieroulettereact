import '../assets/fomantic/dist/semantic.css';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginPage from './LoginPage';
import Watchlist from './Watchlist';
import Menu from './Menu';
import SpinPage from './SpinPage';
import ErrorPage from './ErrorPage';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path="/login" exact component={LoginPage} />
          <Route path="/" exact component={SpinPage} />
          <Route path="/spin" exact component={SpinPage} />
          <Route path="/watchlist" exact component={Watchlist} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    // This is here in case we need to access app state for debugging
    currentState: state
  };
};

export default connect(mapStateToProps, {})(App);
