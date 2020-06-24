import { SIGN_IN, SIGN_OUT, GET_WATCHLIST } from '../actions/types.js';

// This will most likey change as we learn more about the TMDB auth flow
export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return { ...state, sessionId: null };
    case GET_WATCHLIST:
      return { ...state, watchList: action.payload };
    default:
      return state;
  }
};
