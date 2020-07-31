import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LoggedOutHeader extends React.Component {
  render() {
    console.log('loggedoutheader');
    return (
      <Fragment>
        <div>
          <Link to="/login" className="header item">
            LOG IN TO SEE WATCHLIST
          </Link>
        </div>
        <div>
          <Link to="/spin" className="header item">
            SPIN
          </Link>
        </div>
        <div className="right menu">
          <Link to="/login" className="header item">
            LOG IN
          </Link>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(LoggedOutHeader);
