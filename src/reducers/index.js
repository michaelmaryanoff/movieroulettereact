import { combineReducers } from 'redux';
import authReducer from './authReducer';
import spinReducer from './spinReducer';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  session: authReducer,
  spin: spinReducer,
  form: formReducer,
  loadingBar: loadingBarReducer
});
