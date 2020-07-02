import {
  SIGN_IN,
  SIGN_OUT,
  SELECT_GENRES,
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING,
  GET_WATCHLIST,
  START_GUEST_SESSION,
  END_GUEST_SESSION,
  GET_GENRE_CODES,
  SUBMIT_SPIN
  // SUBMIT_SPIN,
  // SELECT_RANDOM_MOVIE
} from './types';
import tmdbClient, { apiKey } from '../api/tmdbClient';

export const signIn = ({ username, password }) => async dispatch => {
  // Holds our api key
  const apiKeyParams = { params: { api_key: apiKey } };

  // Creates an authorization token
  const token = await tmdbClient.get('/authentication/token/new', apiKeyParams);
  const requestToken = token.data.request_token;

  // Authorizes our token
  const authenticated = await tmdbClient.post(
    '/authentication/token/validate_with_login',
    { username, password, request_token: requestToken },
    apiKeyParams
  );
  const authenticatedToken = authenticated.data.request_token;

  // Creates a new session and gets us a session_id
  const response = await tmdbClient.post(
    '/authentication/session/new',
    { request_token: authenticatedToken },
    apiKeyParams
  );
  const sessionId = response.data.session_id;

  // Gets details about the authorized user
  const accountDetails = await tmdbClient.get('/account', {
    params: { api_key: apiKey, session_id: sessionId }
  });

  // Creates a sessionDetails variable that has all the releveant info we need for future requests
  const sessionDetails = {
    sessionId,
    accountDetails: accountDetails.data,
    isLoggedIn: true
  };

  dispatch({
    type: SIGN_IN,
    payload: sessionDetails
  });
};

export const createGuestSession = () => {
  const isGuestSession = true;

  return { type: START_GUEST_SESSION, payload: isGuestSession };
};

export const destroyGuestSession = () => {
  const isGuestSession = false;

  return { type: END_GUEST_SESSION, payload: isGuestSession };
};

export const getWatchList = () => async (dispatch, getState) => {
  const state = getState();
  const { id } = state.session.accountDetails;
  const { sessionId } = state.session;

  const { data } = await tmdbClient.get(`/account/${id}/watchlist/movies`, {
    params: { api_key: apiKey, session_id: sessionId }
  });

  dispatch({ type: GET_WATCHLIST, payload: data });
};

export const getUserDetails = loginFormParams => dispatch => {
  dispatch(signIn(loginFormParams)).then(() => dispatch(getWatchList()));
};

export const getGenreCodes = () => async dispatch => {
  const { data } = await tmdbClient.get('/genre/movie/list', {
    params: { api_key: apiKey }
  });

  dispatch({ type: GET_GENRE_CODES, payload: data });
};

export const signOut = params => {
  return {
    type: SIGN_OUT
  };
};

export const submitSpin = selection => async dispatch => {
  let { genreCode, minimumRating, yearFrom, yearTo } = selection;
  // Need to format date here
  let dateFrom = `${yearFrom}-01-01`;
  let dateTo = `${yearTo}-12-31`;

  const { data } = await tmdbClient.get('/discover/movie', {
    params: {
      api_key: apiKey,
      include_adult: false,
      language: 'en-US',
      sort_by: 'popularity.desc',
      'vote_average.gte': minimumRating,
      page: 1,
      with_genres: genreCode,
      'primary_release_date.gte': dateFrom,
      'primary_release_date.lte': dateTo
    }
  });

  let { length } = data.results;

  let randomIndex = Math.floor(Math.random() * length);

  let selectedMovie = data.results[randomIndex];
  console.log('selected movie', selectedMovie);

  dispatch({ type: SUBMIT_SPIN, payload: selectedMovie });
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
