import {
  SIGN_IN,
  SIGN_OUT,
  SELECT_GENRES,
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING,
  GET_WATCHLIST
  // SUBMIT_SPIN,
  // SELECT_RANDOM_MOVIE
} from './types';
import tmdbClient, { apiKey } from '../api/tmdbClient';
import history from '../history';
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
