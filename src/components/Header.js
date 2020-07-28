import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { signOut } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = { headerShouldRender: true };
  }

  handleLogout = () => {
    this.props.signOut().then(this.props.history.push('/login'));
  };

  renderBlankHeader() {
    return <div></div>;
  }
  // componentDidMount() {
  //   let thisPropsMatch = this.props.match.path === '/';
  //   console.log(
  //     `this.props.match.path === ('/login' || '/') in cdm: `,
  //     this.props.match.path === ('/login' && '/')
  //   );

  //   console.log('thisPropsMatch', thisPropsMatch);
  // }

  // componentDidUpdate() {
  //   let thisPropsMatch = this.props.match.path === '/';
  //   console.log(
  //     `this.props.location.pathname === ('/login' || '/') in cdu: `,
  //     this.props.match.path === ('/login' || '/')
  //   );

  //   console.log('thisPropsMatch', thisPropsMatch);
  // }

  renderHeader() {
    console.log('render header');
    if (this.props.isLoggedIn) {
      return (
        <div className="ui stackable menu">
          <div>
            <Link to="/watchlist" className="header item">
              Watchlist
            </Link>
          </div>
          <div>
            <Link to="/spin" className="header item">
              Spin
            </Link>
          </div>
          <div className="right menu">
            <button className="ui button item" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui stackable menu">
          <div>
            <Link to="/spin" className="header item">
              Spin
            </Link>
          </div>
          <div>
            <Link to="/login" className="header item">
              Log in to see Watchlist
            </Link>
          </div>

          <div className="right menu">
            <Link to="/login" className="header item">
              Log in
            </Link>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log('match path', this.props.match.path);
    console.log(
      `this.props.location.pathname === ('/login' || '/') in rend: `,
      this.props.match.path === '/login' || this.props.match.path === '/'
    );
    console.log('full props', this.props.location.pathname);

    return (
      <div>
        {this.props.location.pathname === '/login' || this.props.location.pathname === '/'
          ? this.renderBlankHeader()
          : this.renderHeader()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.session,
    isLoggedIn: state.session.isLoggedIn
  };
};

// get our props into our header
export default withRouter(connect(mapStateToProps, { signOut })(Header));
