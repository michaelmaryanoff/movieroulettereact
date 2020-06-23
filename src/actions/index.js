import {
  SIGN_IN,
  SIGN_OUT,
  SELECT_GENRES,
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING
  // SUBMIT_SPIN,
  // SELECT_RANDOM_MOVIE
} from './types';
import tmdbClient, { apiKey } from '../api/tmdbClient';
import axios from 'axios';

export const signIn = ({ username, password }) => async dispatch => {
  const token = await tmdbClient.get('/authentication/token/new', { params: { api_key: apiKey } });
  const response = await await tmdbClient.get(
    '/authentication/token/new',
    { params: { api_key: apiKey } },
    { data: { username, password, request_token: token } }
  );
  console.log(response);

  return {
    type: SIGN_IN,
    payload: token
  };
};

export const signOut = params => {
  return {
    type: SIGN_OUT
  };
};

export const selectGenres = genres => {
  // A funciton that saves the genres we have selected
  return {
    type: SELECT_GENRES,
    payload: genres
  };
};

export const selectYearFrom = yearFrom => {
  // A funciton that saves the year from
  return {
    type: SELECT_YEAR_FROM,
    payload: yearFrom
  };
};

export const selectYearTo = yearTo => {
  // A funciton that saves the year to
  return {
    type: SELECT_YEAR_TO,
    payload: yearTo
  };
};

export const selectRating = rating => {
  // A funciton that saves the rating we want
  // Might this be good as a zero indexed integer list
  // instead of actual rating?
  return {
    type: SELECT_RATING,
    payload: rating
  };
};

export const submitSpin = selections => {
  // This will call an async request (I think it is GET but
  // I need to check the TMDB documentation) to give us a random movie.
  // We will use async await to return a list of movies that meets those params
  // From that list of movies we will select a movie
  //* check for null and pass either nothing or null into fetchMovieList
  // TODO: We will need to add dispatch and getState as arguments here
  // TODO: Do we actually select the movie here using what is returned or do we move that
  // TODO: logic to a component? Probably here for best practices
  // * const response = await fetchMovieList(selections)
  // fetchMovieList() is going to make an async call and get a movie list
  // We can use fetchMovieList with axios and put it in a utils funciton somewhere else
  // * await spinForMovie(response)
};
