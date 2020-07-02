import {
  SIGN_IN,
  SIGN_OUT,
  GET_WATCHLIST,
  START_GUEST_SESSION,
  END_GUEST_SESSION
} from '../actions/types.js';

const INITAL_STATE = {
  isLoggedIn: false,
  isGuestSession: false
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      // here is what we need to nullify:
      // accountDetails: null
      // isGuestSession: false
      // isLoggedIn: false
      // sessionId: null (already there)
      // watchList: null
      return {
        ...state,
        sessionId: null,
        accountDetails: null,
        isGuestSession: false,
        isLoggedIn: false,
        watchList: null
      };
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
