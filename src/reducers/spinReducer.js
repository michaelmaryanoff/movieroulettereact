import {
  SELECT_YEAR_FROM,
  SELECT_YEAR_TO,
  SELECT_RATING,
  SUBMIT_SPIN,
  SELECT_GENRES
} from '../actions/types';

//* There is a possiblity here that we will need to have some sort of intial state that specifies default values since we are going to have to check for null when forming out url in the reducer.

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_YEAR_FROM:
      return { ...state, yearFrom: action.yearFrom };
    case SELECT_YEAR_TO:
      return { ...state, yearTo: action.yearTo };
    case SELECT_RATING:
      return { ...state, rating: action.rating };
    case SELECT_GENRES:
      return { ...state, genres: action.payload };
    // TODO: SUBMIT_SPIN may need to be modified since the resul of the spin will depend on the response. Delete this comment if this is not the case.
    case SUBMIT_SPIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
