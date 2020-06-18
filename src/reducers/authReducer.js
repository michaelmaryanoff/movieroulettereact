import { SIGN_IN, SIGN_OUT } from '../acitons/types.js';

// This will most likey change as we learn more about the TMDB auth flow
export default (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, ...action.payload };
    case SIGN_OUT:
      return { ...state, sessionId: null };
    default:
      return state;
  }
};
