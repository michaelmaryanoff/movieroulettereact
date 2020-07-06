import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import WatchList from './WatchList';
import Header from './Header';
import SpinPage from './SpinPage';

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={LoginForm} />
            <Route path="/" exact component={LoginForm} />
            <Fragment>
              <Header />
              <Route path="/spin" exact component={SpinPage} />
              <Route path="/watchlist" exact component={WatchList} />
            </Fragment>
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
