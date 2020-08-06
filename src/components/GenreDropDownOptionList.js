import React, { Component } from 'react';
import { connect } from 'react-redux';

class GenreDropDownOptionList extends Component {
  // This needed to be broken off into a different component due to the async nature
  // of loading genres.
  constructor(props) {
    super(props);
    this.state = { genreArray: [{ id: 'Loading...', name: 'Loading...' }] };
  }

  render() {
    let { genreCodes } = this.props;

    if (genreCodes) {
      return genreCodes.map(option => {
        let { id, name } = option;
        return (
          <option data-rawvalue={id} key={id} value={name} label={name}>
            {name}
          </option>
        );
      });
    } else {
      const { id, name } = this.state;
      return (
        <option data-rawvalue={id} key={id} value={name} label={name}>
          {name}Loading...
        </option>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    genreCodes: state.spin.genreDropdownDataSource,
    isFetchingGenres: state.spin.isFetchingGenres
  };
};

export default connect(mapStateToProps)(GenreDropDownOptionList);
