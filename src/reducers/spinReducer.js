import {
  SUBMIT_SPIN,
  GET_GENRE_CODES,
  ADD_TO_WATCHLIST,
  IS_SPINNING,
  IS_FETCHING_GENRES,
  GENRE_DROPDOWN_DATA_SOURCE,
  WATCHLIST_UPDATED
} from '../actions/types';

//* There is a possiblity here that we will need to have some sort of intial state that specifies default values since we are going to have to check for null when forming out url in the reducer.
const INITIAL_STATE = {
  watchListResponse: -1,
  isSpinning: false,
  isWatchListUpdated: false,
  isFetchingGenres: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUBMIT_SPIN:
      return { ...state, selectedMovie: action.payload };
    case IS_SPINNING:
      return { ...state, isSpinning: action.payload };
    case GET_GENRE_CODES:
      return { ...state, genreCodes: action.payload };
    case GENRE_DROPDOWN_DATA_SOURCE:
      return { ...state, genreDropdownDataSource: action.payload };
    case IS_FETCHING_GENRES:
      return { ...state, isFetchingGenres: action.payload };
    case ADD_TO_WATCHLIST:
      return { ...state, watchListResponse: action.payload };
    case WATCHLIST_UPDATED:
      return { ...state, isWatchListUpdated: action.payload };
    default:
      return state;
  }
};
