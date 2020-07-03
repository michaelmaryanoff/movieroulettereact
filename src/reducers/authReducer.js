import {
  SIGN_IN,
  SIGN_OUT,
  GET_WATCHLIST,
  START_GUEST_SESSION,
  END_GUEST_SESSION,
  AUTH_ERROR,
  VALIDATE_REQUEST_TOKEN
} from '../actions/types.js';

const INITAL_STATE = {
  isLoggedIn: false,
  isGuestSession: false,
  authError: null
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, responseToken: action.payload };
    case SIGN_OUT:
      return {
        ...state,
        sessionId: null,
        accountDetails: null,
        isGuestSession: false,
        isLoggedIn: false,
        watchList: null
      };
    case VALIDATE_REQUEST_TOKEN:
      return { ...state, requestToken: action.payload };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
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
