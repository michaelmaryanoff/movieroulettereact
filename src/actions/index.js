import {
  SIGN_IN,
  SIGN_OUT,
  SELECT_GENRES,
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING,
  GET_WATCHLIST,
  GET_GENRE_CODES,
  SUBMIT_SPIN,
  ADD_TO_WATCHLIST,
  AUTH_ERROR,
  VALIDATE_REQUEST_TOKEN,
  IS_SPINNING,
  NEW_TOKEN,
  GET_ACCOUNT_DETAILS
  // SUBMIT_SPIN,
  // SELECT_RANDOM_MOVIE
} from './types';
import tmdbClient, { apiKey, apiKeyParams } from '../api/tmdbClient';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

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

export const authorizeToken = (username, password, passedState) => async (dispatch, getState) => {
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
    .post('/authentication/session/new', { request_token: authenticatedToken }, apiKeyParams)
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

  const accountDetails = await tmdbClient
    .get('/account', {
      params: { api_key: apiKey, session_id: sessionId }
    })
    .then(response => {
      const sessionDetails = {
        sessionId,
        accountDetails: accountDetails.data,
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
    params: { api_key: apiKey, session_id: sessionId, sort_by: 'created_at.desc' }
  });

  dispatch({ type: GET_WATCHLIST, payload: data });
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
  const { genreCode, minimumRating, yearFrom, yearTo } = selection;

  let lowYear = yearFrom <= yearTo ? yearFrom : yearTo;
  let highYear = yearFrom >= yearTo ? yearFrom : yearTo;

  let dateFrom = `${lowYear}-01-01`;
  let dateTo = `${highYear}-12-31`;

  //! This is a purposely incorrect paramater that will give a blank response
  //! For testing placeholder card only
  const incorrectDateFrom = '2000';
  const incorrectDateTo = '1955';

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
  let { length } = movieResponse.data.results;

  if (length === 0) {
    let selectedMovie = 'NO_RESULTS';

    dispatch({ type: SUBMIT_SPIN, payload: selectedMovie });
    return;
  }

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

export const spinningStarted = () => {
  return { type: IS_SPINNING, payload: true };
};

export const spinningCompleted = () => {
  return { type: IS_SPINNING, payload: false };
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
