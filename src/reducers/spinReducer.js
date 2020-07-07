import {
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING,
  SUBMIT_SPIN,
  SELECT_GENRES,
  GET_GENRE_CODES,
  ADD_TO_WATCHLIST,
  IS_SPINNING
} from '../actions/types';

//* There is a possiblity here that we will need to have some sort of intial state that specifies default values since we are going to have to check for null when forming out url in the reducer.
const INITIAL_STATE = { watchListResponse: -1, isSpinning: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_YEAR_FROM:
      return { ...state, yearFrom: action.yearFrom };
    case SELECT_YEAR_TO:
      return { ...state, yearTo: action.yearTo };
    case SELECT_RATING:
      return { ...state, rating: action.rating };
    case SELECT_GENRES:
      return { ...state, genres: action.payload };
    case SUBMIT_SPIN:
      return { ...state, selectedMovie: action.payload };
    case IS_SPINNING:
      return { ...state, isSpinning: action.payload };
    case GET_GENRE_CODES:
      return { ...state, ...action.payload };
    case ADD_TO_WATCHLIST:
      return { ...state, watchListResponse: action.payload };
    default:
      return state;
  }
};
