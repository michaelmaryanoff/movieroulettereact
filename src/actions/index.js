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
  SUBMIT_SPIN,
  ADD_TO_WATCHLIST,
  AUTH_ERROR
  // SUBMIT_SPIN,
  // SELECT_RANDOM_MOVIE
} from './types';
import tmdbClient, { apiKey } from '../api/tmdbClient';

export const signIn = ({ username, password }) => async dispatch => {
  // Holds our api key
  const apiKeyParams = { params: { api_key: apiKey } };

  // Creates an authorization token
  const token = await tmdbClient.get('/authentication/token/new', apiKeyParams);
  console.log('token', token);

  const requestToken = token.data.request_token;
  console.log('requestToken', requestToken);

  // Authorizes our token
  const authenticated = await tmdbClient
    .post(
      '/authentication/token/validate_with_login',
      { username, password, request_token: requestToken },
      apiKeyParams
    )
    .then(response => {
      console.log('response', response);
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: error });
    });

  dispatch({
    type: SIGN_IN,
    payload: authenticated
  });

  // console.log('authenticated', authenticated);

  // const authenticatedToken = authenticated.data.request_token;
  // console.log('authenticatedToken', authenticatedToken);

  // // Creates a new session and gets us a session_id
  // const response = await tmdbClient.post(
  //   '/authentication/session/new',
  //   { request_token: authenticatedToken },
  //   apiKeyParams
  // );
  // console.log('response', response);

  // const sessionId = response.data.session_id;
  // console.log('sessionId', sessionId);

  // // Gets details about the authorized user
  // const accountDetails = await tmdbClient.get('/account', {
  //   params: { api_key: apiKey, session_id: sessionId }
  // });
  // console.log('accountDetails', accountDetails);

  // // Creates a sessionDetails variable that has all the releveant info we need for future requests
  // const sessionDetails = {
  //   sessionId,
  //   accountDetails: accountDetails.data,
  //   isLoggedIn: true
  // };
  // console.log('sessionDetails', sessionDetails);

  // dispatch({
  //   type: SIGN_IN,
  //   payload: sessionDetails
  // });
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
  console.log('state', getState());

  const state = getState();
  if (state.session.authError) {
    console.log('error!');
    return;
  }
  const { id } = state.session.accountDetails;
  const { sessionId } = state.session;

  const { data } = await tmdbClient.get(`/account/${id}/watchlist/movies`, {
    params: { api_key: apiKey, session_id: sessionId, sort_by: 'created_at.desc' }
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

export const signOut = params => async (dispatch, getState) => {
  let state = getState();
  let { sessionId } = state.session;

  const response = await tmdbClient.delete(`/authentication/session?api_key=${apiKey}`, {
    data: {
      session_id: sessionId
    }
  });

  dispatch({
    type: SIGN_OUT,
    payload: response
  });
};

export const submitSpin = selection => async dispatch => {
  let { genreCode, minimumRating, yearFrom, yearTo } = selection;
  // Need to format date here
  let dateFrom = `${yearFrom}-01-01`;
  let dateTo = `${yearTo}-12-31`;

  const pageResponse = await tmdbClient.get('/discover/movie', {
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
  let totalPages = pageResponse.data.total_pages;

  /** In order to increase the randomness of the movies selected, we want to select a random page
   * The issue that we run into is that if we get the first page of results (with the popularity sorted
   * in descending order) or an early page we will get a movie that has a very low popularity with a small chance
   * of wide availability. So we will be using results for the first 40% of pages instead.
   */

  let pageRange = totalPages * 0.4;

  let randomPage = Math.floor(Math.random() * pageRange) + 1;

  const movieResponse = await tmdbClient.get('/discover/movie', {
    params: {
      api_key: apiKey,
      include_adult: false,
      language: 'en-US',
      sort_by: 'popularity.desc',
      'vote_average.gte': minimumRating,
      page: randomPage,
      with_genres: genreCode,
      'primary_release_date.gte': dateFrom,
      'primary_release_date.lte': dateTo
    }
  });
  console.log('movieResponse', movieResponse);

  let { length } = movieResponse.data.results;

  let randomIndex = Math.floor(Math.random() * length);

  let selectedMovie = movieResponse.data.results[randomIndex];

  dispatch({ type: SUBMIT_SPIN, payload: selectedMovie });
};

export const addToWatchlist = selection => async (dispatch, getState) => {
  let { session, spin } = getState();
  let { accountDetails } = session;

  // Parameters for watchlist add
  let accountId = accountDetails.id;
  let sessionId = session.sessionId;
  const mediaType = 'movie';
  let mediaId = spin.selectedMovie.id;
  const watchlist = true;
  let pathParams = { api_key: apiKey, session_id: sessionId };

  let bodyParams = {
    media_type: mediaType,
    media_id: mediaId,
    watchlist
  };

  let url = `/account/${accountId}/watchlist`;

  const response = await tmdbClient.post(url, bodyParams, { params: pathParams });
  dispatch(getWatchList());

  dispatch({ type: ADD_TO_WATCHLIST, payload: response });
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
