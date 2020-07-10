import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGenreCodes } from '../actions';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    const yearArray = this.generateYearArray();

    this.state = {
      // An array of years used to populate dropdown menu
      yearArray,

      // A default "yearFrom" set to 1955, since people are probably not going
      // To be wanding to look much earlier than that
      // This will be used to manage to make the dropdown a controlled component
      yearFrom: yearArray[35],

      // A default "yearTo", set at the current year
      // This will be used to manage to make the dropdown a controlled component
      yearTo: yearArray[yearArray.length - 1],

      minimumRating: 0,

      // The title of the currently selected genre
      genreName: '',

      // The code of the currently selected genre (used for our network request)
      genreCode: '',

      // The name of the field we are rendering
      inputType: ''
    };
  }

  componentDidMount() {
    console.log('cdm props', this.props);

    this.setState({ fieldName: this.props.inputtype });
  }

  generateYearArray() {
    // Creates an array of genres in order to populate the dropdown lists
    let currentYear = new Date().getFullYear();
    let firstYear = 1920;
    let years = [];

    for (let i = firstYear; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }

  render() {
    return <div>Dropdown</div>;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { getGenreCodes })(Dropdown);
