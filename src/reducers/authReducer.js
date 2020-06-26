import {
  SIGN_IN,
  SIGN_OUT,
  GET_WATCHLIST,
  START_GUEST_SESSION,
  END_GUEST_SESSION
} from '../actions/types.js';

// This will most likey change as we learn more about the TMDB auth flow
const INITAL_STATE = {
  isLoggedIn: false,
  isGuestSession: false
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return { ...state, sessionId: null };
    case START_GUEST_SESSION:
      return { ...state, isGuestSession: action.payload };
    case END_GUEST_SESSION:
      return { ...state, isGuestSession: action.payload };
    case GET_WATCHLIST:
      return { ...state, watchList: action.payload };
    default:
      return state;
  }
};
