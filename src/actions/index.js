import {
  SIGN_IN,
  SIGN_OUT,
  GET_WATCHLIST,
  GET_GENRE_CODES,
  SUBMIT_SPIN,
  ADD_TO_WATCHLIST,
  AUTH_ERROR,
  VALIDATE_REQUEST_TOKEN,
  IS_SPINNING,
  NEW_TOKEN,
  GET_ACCOUNT_DETAILS,
  GENRE_DROPDOWN_DATA_SOURCE,
  WATCHLIST_UPDATED,
  IS_FETCHING_GENRES
} from './types';
import tmdbClient, { apiKey, apiKeyParams } from '../api/tmdbClient';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { generateDateString } from '../utils';

// Action creator that gets the auth token
export const getNewToken = () => async dispatch => {
  await tmdbClient
    .get('/authentication/token/new', apiKeyParams)
    .then(response => {
      dispatch({ type: NEW_TOKEN, payload: response.data.request_token });
    })
    .catch(error => {
      return dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const authorizeToken = (username, password, passedState) => async (
  dispatch,
  getState
) => {
  let token = passedState.session.newToken;

  await tmdbClient
    .post(
      '/authentication/token/validate_with_login',
      { username: username, password: password, request_token: token },
      apiKeyParams
    )
    .then(response => {
      dispatch({ type: SIGN_IN, payload: response.data.request_token });
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const createSessionId = passedState => async dispatch => {
  const { session } = passedState;

  let authenticatedToken = session.responseToken;

  // Creates a new session and gets us a session_id
  await tmdbClient
    .post(
      '/authentication/session/new',
      { request_token: authenticatedToken },
      apiKeyParams
    )
    .then(response => {
      const sessionId = response.data.session_id;
      dispatch({ type: VALIDATE_REQUEST_TOKEN, payload: sessionId });
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const getAccountDetails = passedState => async dispatch => {
  // We need the sessionId here
  let { sessionId } = passedState.session;

  await tmdbClient
    .get('/account', {
      params: { api_key: apiKey, session_id: sessionId }
    })
    .then(response => {
      const sessionDetails = {
        sessionId,
        accountDetails: response.data,
        isLoggedIn: true
      };
      dispatch({ type: GET_ACCOUNT_DETAILS, payload: sessionDetails });
    })
    .catch(error => {
      dispatch({ type: AUTH_ERROR, payload: error });
    });
};

export const signIn = ({ username, password }) => (dispatch, getState) => {
  dispatch(showLoading());
  dispatch(getNewToken())
    .then(() => {
      const state = getState();

      return dispatch(authorizeToken(username, password, state)).then(() => {
        const state = getState();
        return dispatch(createSessionId(state));
      });
    })
    .then(() => {
      const state = getState();

      return dispatch(getAccountDetails(state));
    })
    .then(() => {
      dispatch(hideLoading());
      return dispatch(getWatchList());
    });
};

export const getWatchList = () => async (dispatch, getState) => {
  const state = getState();
  if (state.session.authError) {
    return;
  }

  const { id } = state.session.accountDetails;
  const { sessionId } = state.session;

  const { data } = await tmdbClient.get(`/account/${id}/watchlist/movies`, {
    params: {
      api_key: apiKey,
      session_id: sessionId,
      sort_by: 'created_at.desc'
    }
  });

  dispatch({ type: GET_WATCHLIST, payload: data });
};

export const getGenreCodes = () => async dispatch => {
  dispatch(fetchGenresStarted());
  const { data } = await tmdbClient.get('/genre/movie/list', {
    params: { api_key: apiKey }
  });

  dispatch(fetchGenresCompleted());

  dispatch({ type: GET_GENRE_CODES, payload: data.genres });
  dispatch({ type: GENRE_DROPDOWN_DATA_SOURCE, payload: data.genres });
};

export const signOut = params => async (dispatch, getState) => {
  let state = getState();
  let { sessionId } = state.session;

  const response = await tmdbClient.delete(
    `/authentication/session?api_key=${apiKey}`,
    {
      data: {
        session_id: sessionId
      }
    }
  );

  dispatch({
    type: SIGN_OUT,
    payload: response
  });
};

export const clearAuthError = () => dispatch => {
  dispatch({ type: AUTH_ERROR, payload: null });
};

export const submitSpin = selection => async dispatch => {
  const {
    minimumRating,
    yearFrom,
    yearTo,
    languageInput,
    genreInput
  } = selection;

  const { dateFrom, dateTo } = generateDateString(yearFrom, yearTo);

  const paramsObject = {
    api_key: apiKey,
    include_adult: false,
    language: 'en-US',
    sort_by: 'popularity.desc',
    'vote_average.gte': minimumRating,
    page: 1,
    with_genres: genreInput,
    'primary_release_date.gte': dateFrom,
    'primary_release_date.lte': dateTo,
    with_original_language: languageInput
  };

  //! This object is only used for testing purposes, it purposely formats
  //! An incorrect response. Used for testing situations where no
  //! results are returned. It must replace individualMovieParams
  //! and paramsObject in the two get requests below
  // eslint-disable-next-line
  const testParamsObject = {
    ...paramsObject,
    'primary_release_date.gte': '2000',
    'primary_release_date.lte': '1955'
  };

  const pageResponse = await tmdbClient.get('/discover/movie', {
    params: paramsObject
  });

  const totalPages = pageResponse.data.total_pages;

  /** In order to increase the randomness of the movies selected, we want to select a random page
   * The issue that we run into is that if we get the first page of results (with the popularity sorted
   * in descending order) or an early page we will get a movie that has a very low popularity with a small chance
   * of wide availability. So we will be using results for the first 40% of pages instead.
   */

  const pageRange = totalPages * 0.4;

  const randomPage = Math.floor(Math.random() * pageRange) + 1;

  const individualMovieParams = { ...paramsObject, page: randomPage };

  const movieResponse = await tmdbClient.get('/discover/movie', {
    params: individualMovieParams
  });

  const { length } = movieResponse.data.results;

  if (length === 0) {
    let selectedMovie = 'NO_RESULTS';

    dispatch({ type: SUBMIT_SPIN, payload: selectedMovie });
    return;
  }

  const randomIndex = Math.floor(Math.random() * length);

  const selectedMovie = movieResponse.data.results[randomIndex];
  dispatch({ type: SUBMIT_SPIN, payload: selectedMovie });
};

export const addToWatchlist = selection => async (dispatch, getState) => {
  const { session, spin } = getState();
  const { accountDetails } = session;

  // Paramaters for adding to watchlist
  const { id } = accountDetails;
  const { sessionId } = session;
  const mediaType = 'movie';
  const mediaId = spin.selectedMovie.id;
  const watchlist = true;
  const pathParams = { api_key: apiKey, session_id: sessionId };

  const bodyParams = {
    media_type: mediaType,
    media_id: mediaId,
    watchlist
  };

  const url = `/account/${id}/watchlist`;

  const response = await tmdbClient.post(url, bodyParams, {
    params: pathParams
  });
  dispatch(getWatchList());

  dispatch(updatingWatchListCompleted());
  dispatch({ type: ADD_TO_WATCHLIST, payload: response });
};

export const resetWatchlistUpdateStatus = dispatch => {
  // This method is primarily used for updating the watchlist button
  return { type: WATCHLIST_UPDATED, payload: false };
};

export const updatingWatchListCompleted = dispatch => {
  // This method is primarily used for inactivating the watchlist button
  return { type: WATCHLIST_UPDATED, payload: true };
};

export const spinningStarted = () => {
  return { type: IS_SPINNING, payload: true };
};

export const spinningCompleted = () => {
  return { type: IS_SPINNING, payload: false };
};

export const fetchGenresStarted = () => {
  return { type: IS_FETCHING_GENRES, payload: true };
};

export const fetchGenresCompleted = () => {
  return { type: IS_FETCHING_GENRES, payload: false };
};
