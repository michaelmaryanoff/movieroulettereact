import {
  SIGN_IN,
  SIGN_OUT,
  GET_WATCHLIST,
  AUTH_ERROR,
  VALIDATE_REQUEST_TOKEN,
  NEW_TOKEN,
  GET_ACCOUNT_DETAILS
} from '../actions/types.js';

const INITAL_STATE = {
  authError: null
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case NEW_TOKEN:
      return { ...state, newToken: action.payload };
    case SIGN_IN:
      return { ...state, responseToken: action.payload, authError: null };
    case SIGN_OUT:
      return {
        ...state,
        sessionId: null,
        accountDetails: null,
        isLoggedIn: false,
        watchList: null,
        newToken: null,
        responseToken: null,
        serverResponse: action.payload
      };
    case VALIDATE_REQUEST_TOKEN:
      return { ...state, sessionId: action.payload };
    case GET_ACCOUNT_DETAILS:
      return { ...state, ...action.payload };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    case GET_WATCHLIST:
      return { ...state, watchList: action.payload };
    default:
      return state;
  }
};
